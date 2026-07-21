import { spawnSync } from 'node:child_process';
import { cpSync, rmSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { syncStaticProjects } from './sync-static-projects.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const apps = ['gulbeneser', 'furkanyonat', 'kariyer', 'ai-content-detector'];

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    ...options
  });

  if (result.status !== 0) {
    throw new Error(`Command failed: ${command} ${args.join(' ')}`);
  }
}

for (const app of apps) {
  const appDir = path.join(rootDir, app);
  const distDir = path.join(appDir, 'dist');
  const targetDir = path.join(rootDir, 'public', app);
  const packageJsonPath = path.join(appDir, 'package.json');
  const packageLockPath = path.join(appDir, 'package-lock.json');

  console.log(`\n📦 Building ${app} profile...`);

  if (!existsSync(appDir)) {
    console.warn(`⚠️ ${app} source directory not found; keeping any existing public/${app} output.`);
    continue;
  }

  if (!existsSync(packageJsonPath)) {
    console.warn(`⚠️ ${app}/package.json not found; keeping existing public/${app} output and skipping rebuild.`);
    continue;
  }

  const installArgs = existsSync(packageLockPath) ? ['ci'] : ['install'];
  run('npm', [...installArgs, '--no-audit', '--no-fund'], { cwd: appDir });
  run('npm', ['run', 'build'], { cwd: appDir });

  if (!existsSync(distDir)) {
    throw new Error(`Build output not found for ${app} at ${distDir}`);
  }

  rmSync(targetDir, { recursive: true, force: true });
  mkdirSync(targetDir, { recursive: true });
  cpSync(distDir, targetDir, { recursive: true });

  console.log(`✅ Copied ${app} build to public/${app}`);
}

console.log('\nAll available profile builds completed.');
syncStaticProjects();
