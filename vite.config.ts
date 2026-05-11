import fs from "node:fs";
import path from "node:path";

import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

const SUPPORTED_IMAGE_MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

function getMimeType(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();
  return SUPPORTED_IMAGE_MIME_TYPES[extension] ?? "application/octet-stream";
}

function fotosDevServerPlugin(): Plugin {
  const fotosDir = path.resolve(__dirname, "fotos");

  return {
    name: "fotos-dev-server",
    apply: "serve",
    configureServer(server) {
      if (!fs.existsSync(fotosDir)) {
        server.config.logger.warn(
          `[fotos] Dizini bulunamadı: ${fotosDir}. Blog görselleri yerel geliştirmede servis edilemeyecek.`,
        );
        return;
      }

      server.middlewares.use(async (req, res, next) => {
        const url = req.url ? decodeURIComponent(req.url.split("?")[0]) : "";

        if (!url.startsWith("/fotos/")) {
          return next();
        }

        const relativePath = url.replace(/^\/fotos\//, "");
        const absolutePath = path.join(fotosDir, relativePath);

        if (!absolutePath.startsWith(fotosDir)) {
          return next();
        }

        try {
          const stats = await fs.promises.stat(absolutePath);
          if (!stats.isFile()) {
            return next();
          }

          res.statusCode = 200;
          res.setHeader("Content-Type", getMimeType(absolutePath));
          res.setHeader("Cache-Control", "public, max-age=86400");

          if (req.method === "HEAD") {
            res.end();
            return;
          }

          fs.createReadStream(absolutePath)
            .on("error", (streamError) => {
              next(streamError as Error);
            })
            .pipe(res);
        } catch (error) {
          if ((error as NodeJS.ErrnoException).code === "ENOENT") {
            return next();
          }
          next(error as Error);
        }
      });
    },
  };
}

const FOTO_REFERENCE_SOURCE_DIRS = ["blog", "kampanyalar", "content", "src"] as const;
const FOTO_REFERENCE_FILE_EXTENSIONS = new Set([".md", ".mdx", ".njk", ".html", ".js", ".jsx", ".ts", ".tsx", ".json", ".xml"]);
const FOTO_REFERENCE_PATTERN = /\/fotos\/([^\s"'`)<>]+)/g;

async function collectReferencedFotos() {
  const referencedFotos = new Set<string>();

  async function scanDirectory(directory: string) {
    if (!fs.existsSync(directory)) {
      return;
    }

    const entries = await fs.promises.readdir(directory, { withFileTypes: true });

    await Promise.all(
      entries.map(async (entry) => {
        const absolutePath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
          await scanDirectory(absolutePath);
          return;
        }

        if (!entry.isFile() || !FOTO_REFERENCE_FILE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
          return;
        }

        const fileContent = await fs.promises.readFile(absolutePath, "utf8");

        for (const match of fileContent.matchAll(FOTO_REFERENCE_PATTERN)) {
          const referencedPath = match[1].split(/[?#]/)[0];
          referencedFotos.add(path.normalize(referencedPath));
        }
      }),
    );
  }

  await Promise.all(FOTO_REFERENCE_SOURCE_DIRS.map((directory) => scanDirectory(path.resolve(__dirname, directory))));

  return referencedFotos;
}

function fotosBuildCopyPlugin(): Plugin {
  const fotosDir = path.resolve(__dirname, "fotos");

  return {
    name: "fotos-build-copy",
    apply: "build",
    async generateBundle() {
      if (!fs.existsSync(fotosDir)) {
        this.warn(`[fotos] Dizini bulunamadı: ${fotosDir}. Blog görselleri çıktı klasörüne kopyalanmayacak.`);
        return;
      }

      const referencedFotos = await collectReferencedFotos();

      await Promise.all(
        [...referencedFotos].map(async (relativePath) => {
          const filePath = path.resolve(fotosDir, relativePath);

          if (!filePath.startsWith(fotosDir + path.sep)) {
            this.warn(`[fotos] Güvenlik nedeniyle atlandı: ${relativePath}`);
            return;
          }

          try {
            const stats = await fs.promises.stat(filePath);

            if (!stats.isFile()) {
              return;
            }

            const fileBuffer = await fs.promises.readFile(filePath);

            this.emitFile({
              type: "asset",
              fileName: `fotos/${relativePath.split(path.sep).join("/")}`,
              source: fileBuffer,
            });
          } catch (error) {
            if ((error as NodeJS.ErrnoException).code === "ENOENT") {
              this.warn(`[fotos] Referans verilen görsel bulunamadı: ${relativePath}`);
              return;
            }

            throw error;
          }
        }),
      );

      this.info(`[fotos] ${referencedFotos.size} referanslı görsel üretim çıktısına eklendi.`);
    },
  };
}

export default defineConfig(({ mode }) => {
  const fileEnv = loadEnv(mode, process.cwd(), "");
  const geminiKey =
    fileEnv.apikey ??
    fileEnv.API_KEY ??
    fileEnv.GEMINI_API_KEY ??
    process.env.apikey ??
    process.env.API_KEY ??
    process.env.GEMINI_API_KEY ??
    "";

  return {
    plugins: [react(), fotosDevServerPlugin(), fotosBuildCopyPlugin()],
    define: {
      'process.env.API_KEY': JSON.stringify(geminiKey),
      'process.env.GEMINI_API_KEY': JSON.stringify(geminiKey),
    },
    build: {
      outDir: "dist",
      sourcemap: false
    }
  };
});
