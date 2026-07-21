# AI Continuation State

## Last Completed Phase

Fixed the existing `/furkanyonat` CV microsite light-mode readability issue by aligning the light palette with Apple-style neutral surfaces and system-blue accents. Project card tags now use theme variables instead of low-contrast fixed Tailwind blue text.

## Current Project Status

The repository is stable on the current branch. The change is scoped to Furkan Yonat CV microsite source styling plus the generated `public/furkanyonat/` build output. No routes, translations, business content, SEO metadata, sitemap entries, or automation logic were changed.

## Next Phase

Optional next phase: add a root/public `robots.txt` with `Sitemap: https://fures.at/sitemap.xml` and safe crawl rules, because no robots file is currently present.

## Remaining Phases

1. Optional: add missing public-site `robots.txt` with a sitemap reference.
2. Optional: add root `.env.example` with safe placeholders for `VITE_SITE_URL`, Gemini, Maps, and optional image provider keys.
3. Optional: add standalone `typecheck`, `lint`, or validation scripts if stronger CI checks are desired.
4. Optional: run visual screenshot verification in an environment with Playwright system dependencies installed.

## Important Files

- `AGENTS.md`
- `furkanyonat/AGENTS.md`
- `.ai/CONTINUATION.md`
- `README.md`
- `package.json`
- `netlify.toml`
- `src/sitemap.xml.njk`
- `furkanyonat/index.html`
- `furkanyonat/components/ui/ProjectCard.tsx`
- `public/furkanyonat/index.html`

## Commands Verified

- `pwd && rg --files -g 'AGENTS.md' -g '.ai/CONTINUATION.md' -g 'AI_STATE.md' -g 'README.md' -g 'package.json' -g 'vite.config.*' -g 'netlify.toml' -g 'robots.txt' -g 'sitemap.xml' -g 'src/sitemap.xml.njk'` — checked required guide/docs/config files without slow recursive listing.
- `git status --short --branch && git log --oneline -5` — checked branch, working tree, and latest commits before editing.
- `cat AGENTS.md`, `cat .ai/CONTINUATION.md`, `cat furkanyonat/AGENTS.md`, and targeted `sed`/`rg` commands — inspected root docs, Furkan-specific guide, package scripts, sitemap/Netlify routing, and relevant CV source files.
- `find . -maxdepth 3 \( -iname '*robots*' -o -name 'sitemap.xml' \) -not -path './node_modules/*' -print` — checked robots/sitemap status; dynamic sitemap exists and no robots file was found.
- `npm run build --prefix furkanyonat` — passed; verified the microsite Vite build.
- `npm run build:profiles` — passed; copied updated Furkan build to `public/furkanyonat/` and rebuilt profile/tool outputs.
- `npm run build` — passed; rebuilt travel, TypeScript/main Vite, Eleventy output, and profile/microsite public assets. Output included existing warnings about npm `http-proxy`, dependency audit notices, large chunks, outdated browsers data, and Vite CJS API deprecation.
- `npx --yes playwright install chromium >/tmp/playwright-install.log 2>&1 && npm run preview -- --host 127.0.0.1 ... && npx --yes playwright screenshot --viewport-size=1440,1200 http://127.0.0.1:4173/furkanyonat/ furkanyonat-light-apple.png` — failed because Chromium cannot launch in this container without `libatk-1.0.so.0`; no screenshot was produced.

## Known Risks

- No root/public `robots.txt` file was found; this remains technical debt for a public website.
- The full build runs dependency installation in subprojects and reports known npm audit vulnerabilities; these are not introduced by this scoped light-mode styling change.
- Visual screenshot verification is blocked by the container missing Chromium system dependency `libatk-1.0.so.0`.
- The main site `src/components/Projects.tsx` still marks `maria-alm-route-atlas` as under construction per project rule; do not change it without owner confirmation.

## Do Not Do

- Do not invent translations, routes, business rules, or metrics.
- Do not add Furkan CV CTA phrases such as “Mehr entdecken”, “Projenizi Anlatalım”, “Erzählen Sie uns von Ihrem Projekt”, or “Angetrieben von Fures”.
- Do not remove the print/PDF behavior or the profile image import from `fotofurkan.jpeg`.
- Do not create duplicate SEO, sitemap, RSS, form, or automation systems.
- Do not store real secrets, API keys, tokens, passwords, or sensitive data.
- Do not skip SEO/sitemap/robots checks on public-page tasks.

## Required First Step For Next Agent

The next agent must first read `AGENTS.md`, `.ai/CONTINUATION.md`, `furkanyonat/AGENTS.md`, latest commit history, and the relevant source files before planning or editing.
