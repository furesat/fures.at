# AI Continuation State

## Last Completed Phase

Applied the new Furkan Yonat Marketing and Growth Specialist CV content across all supported `/furkanyonat` microsite languages: Turkish, English, German, and Spanish. Existing project cards and routes were preserved.

## Current Project Status

The repository is stable on the current branch. The latest change is scoped to Furkan Yonat CV translation data, rebuilt `public/furkanyonat/` output, and handoff documentation. No new public route, sitemap entry, RSS automation, campaign/blog content, or main-site project card was added.

## Next Phase

Optional next phase: add a root/public `robots.txt` with `Sitemap: https://fures.at/sitemap.xml` and safe crawl rules, because no robots file is currently present.

## Remaining Phases

1. Optional: add missing public-site `robots.txt` with a sitemap reference.
2. Optional: add root `.env.example` with safe placeholders for `VITE_SITE_URL`, Gemini, Maps, and optional image provider keys.
3. Optional: run visual screenshot verification in an environment with Playwright system dependencies installed.
4. Optional: review EN/DE/ES wording with a native speaker if legal/immigration-grade wording is required.

## Important Files

- `AGENTS.md`
- `furkanyonat/AGENTS.md`
- `.ai/CONTINUATION.md`
- `README.md`
- `package.json`
- `netlify.toml`
- `src/sitemap.xml.njk`
- `furkanyonat/index.html`
- `furkanyonat/components/Experience.tsx`
- `furkanyonat/data/translations.ts`
- `public/furkanyonat/index.html`

## Commands Verified

- `git status --short --branch && git log --oneline -5` — checked branch, working tree, and latest commits before editing.
- `cat AGENTS.md`, `cat .ai/CONTINUATION.md`, `cat furkanyonat/AGENTS.md`, and targeted source inspection — read required project and Furkan-specific guides before editing.
- `npm run build --prefix furkanyonat` — passed; verified the microsite Vite build.
- `npm run build:profiles` — passed; copied updated Furkan build to `public/furkanyonat/` and rebuilt profile/tool outputs. Output included existing npm audit notices and chunk-size warnings in unrelated subprojects.
- `npm run build` — passed; rebuilt travel, TypeScript/main Vite, Eleventy output, and profile/microsite public assets. Output included existing warnings about npm `http-proxy`, dependency audit notices, large chunks, outdated browsers data, and Vite CJS API deprecation.
- `find . -maxdepth 3 \( -iname '*robots*' -o -name 'sitemap.xml' \) -not -path './node_modules/*' -not -path './furkanyonat/node_modules/*' -print` — checked robots/sitemap status; generated sitemap exists and no robots file was found.
- `npx --yes playwright install chromium >/tmp/playwright-install-2.log 2>&1 && npm run preview -- --host 127.0.0.1 ... && npx --yes playwright screenshot --viewport-size=1440,1200 http://127.0.0.1:4173/furkanyonat/ furkanyonat-all-langs.png` — failed because Chromium cannot launch in this container without `libatk-1.0.so.0`; no screenshot was produced.

## Known Risks

- No root/public `robots.txt` file was found; this remains technical debt for a public website.
- The translations are faithful professional translations of the owner-provided Turkish CV content, but native-speaker review is still recommended if the CV will be used for formal HR or immigration processes.
- The full build runs dependency installation in subprojects and reports known npm audit vulnerabilities; these were not introduced by this scoped CV translation change.
- Visual screenshot verification is blocked by the container missing Chromium system dependency `libatk-1.0.so.0`.
- The main site `src/components/Projects.tsx` still marks `maria-alm-route-atlas` as under construction per project rule; do not change it without owner confirmation.

## Do Not Do

- Do not remove the project cards from `/furkanyonat`; the owner explicitly requested leaving projects and other things intact.
- Do not add Furkan CV CTA phrases such as “Mehr entdecken”, “Projenizi Anlatalım”, “Erzählen Sie uns von Ihrem Projekt”, or “Angetrieben von Fures”.
- Do not remove the print/PDF behavior or the profile image import from `fotofurkan.jpeg`.
- Do not create duplicate SEO, sitemap, RSS, form, or automation systems.
- Do not store real secrets, API keys, tokens, passwords, or sensitive data.
- Do not skip SEO/sitemap/robots checks on public-page tasks.

## Required First Step For Next Agent

The next agent must first read `AGENTS.md`, `.ai/CONTINUATION.md`, `furkanyonat/AGENTS.md`, latest commit history, and the relevant source files before planning or editing.
