# AI Continuation State

## Last Completed Phase

Improved the existing `/furkanyonat` CV microsite for design polish, accessibility, SEO metadata, and language consistency. Rebuilt the full project so the generated `public/furkanyonat/` output matches the updated source.

## Current Project Status

The repository is stable on the current branch. The main site remains a Netlify-deployed Vite + React application with Eleventy-generated RSS/sitemap/static output. The current change is scoped to the existing Furkan Yonat CV microsite source plus its generated public build output.

## Next Phase

Optional next phase: add a root/public `robots.txt` with `Sitemap: https://fures.at/sitemap.xml` and safe crawl rules, because no robots file is currently present.

## Remaining Phases

1. Optional: add missing public-site `robots.txt` with a sitemap reference.
2. Optional: add root `.env.example` with safe placeholders for `VITE_SITE_URL`, Gemini, Maps, and optional image provider keys.
3. Optional: add standalone `typecheck`, `lint`, or validation scripts if stronger CI checks are desired.
4. Optional: do a deeper copy-edit pass with the profile owner if more biographical wording changes are required.

## Important Files

- `AGENTS.md`
- `furkanyonat/AGENTS.md`
- `.ai/CONTINUATION.md`
- `README.md`
- `package.json`
- `netlify.toml`
- `src/sitemap.xml.njk`
- `furkanyonat/index.html`
- `furkanyonat/App.tsx`
- `furkanyonat/components/Sidebar.tsx`
- `furkanyonat/components/ui/ProjectCard.tsx`
- `furkanyonat/data/translations.ts`
- `public/furkanyonat/index.html`

## Commands Verified

- `pwd && rg --files -g 'AGENTS.md' -g '.ai/CONTINUATION.md' -g 'AI_STATE.md' -g 'README.md' -g 'package.json' -g 'vite.config.*' -g 'netlify.toml' -g 'robots.txt' -g 'sitemap*' -g '.eleventy.js'` — checked required guide/docs/config files without slow recursive listing.
- `git status --short && git branch --show-current && git log --oneline -5` — checked branch, working tree, and latest commits before editing.
- `sed -n ...` and `rg -n ...` — inspected root docs, Furkan-specific guide, package scripts, sitemap/Netlify routing, and relevant CV source files.
- `find . -maxdepth 3 \( -iname '*robots*' -o -name 'sitemap.xml' \) -print` — checked robots/sitemap status; dynamic sitemap exists and no robots file was found.
- `npm run build --prefix furkanyonat` — passed; verified the microsite Vite build.
- `npm run build` — passed; rebuilt main site, Eleventy output, and profile/microsite public assets. Output included existing warnings about npm `http-proxy`, dependency audit notices, large chunks, outdated browsers data, and Vite CJS API deprecation.
- `npx --yes playwright --version` — passed; Playwright CLI was available through npx.
- `npx --yes playwright install chromium && npx --yes playwright screenshot --viewport-size=1440,1200 http://127.0.0.1:4174/furkanyonat/ furkanyonat-screenshot.png` — failed due missing system library `libatk-1.0.so.0`; no screenshot was produced.

## Known Risks

- No root/public `robots.txt` file was found; this remains technical debt for a public website.
- The full build runs dependency installation in subprojects and reports known npm audit vulnerabilities; these are not introduced by this scoped UI/content change.
- Playwright browser installation succeeded, but screenshot capture could not run in this container because a system GUI dependency is missing.
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
