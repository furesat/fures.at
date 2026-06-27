# AI Continuation State

## Last Completed Phase

Added the shared AI working protocol to the existing root `AGENTS.md`, consolidated useful project-specific guidance into a structured guide, and created this continuation file.

## Current Project Status

The repository remains a Netlify-deployed public static/multilingual site using Vite + React for the main client application and Eleventy for RSS/sitemap/static output. No public route, UI behavior, SEO metadata, sitemap template, or automation logic was changed in this phase. Eleventy was adjusted to keep `AGENTS.md` and `.ai/**` from being rendered as public pages.

## Next Phase

Recommended next phase: add missing public-site operations files in a separate scoped task if approved, especially `robots.txt` with a sitemap reference and a safe root `.env.example` containing placeholder-only integration keys.

## Remaining Phases

1. Optional: add `robots.txt` with `Sitemap: https://fures.at/sitemap.xml` and appropriate allow/disallow rules.
2. Optional: add root `.env.example` with safe placeholders for `VITE_SITE_URL`, Gemini, Maps, and optional image provider keys.
3. Optional: consider adding standalone `typecheck`, `lint`, or validation scripts if the project owner wants stronger CI checks.

## Important Files

- `AGENTS.md`
- `.ai/CONTINUATION.md`
- `README.md`
- `package.json`
- `vite.config.ts`
- `.eleventy.js`
- `netlify.toml`
- `src/App.tsx`
- `src/utils/routes.ts`
- `src/hooks/useSEO.ts`
- `src/utils/seo.ts`
- `src/sitemap.xml.njk`
- `src/rss.xml.njk`
- `src/rss2.xml.njk`
- `src/_data/blogPosts.js`
- `src/_data/campaignPosts.js`
- `scripts/gemini_daily.py`

## Commands Verified

- `find .. -name AGENTS.md -print` — checked agent guides; found root `AGENTS.md` and nested `furkanyonat/AGENTS.md`.
- `find . -maxdepth 3 \( -name 'CONTINUATION.md' -o -name 'AI_STATE.md' -o -iname '*continuation*' \) -print` — checked continuation files; none existed before this phase.
- `git status --short --branch` — checked current branch and working tree before editing.
- `git log -5 --oneline` — inspected latest commits.
- `find . -maxdepth 3 -type f ...` — inspected docs/config/SEO/deployment files.
- `npm run build` — passed; emitted existing warnings about npm `http-proxy`, large Vite chunks, outdated Browserslist/baseline data, Vite CJS deprecation, and missing `/index.css` in subproject builds.
- `npm run build:eleventy` — passed after excluding AI handoff files from Eleventy rendering; confirmed sitemap/RSS generation still runs.
- `python scripts/gemini_daily.py --help` — failed before showing help because `GEMINI_API_KEY` is not set and the script raises `ValueError("HATA: GEMINI_API_KEY yok!")` at import/startup; unrelated to documentation changes.

## Known Risks

- No root `robots.txt` file was found; this is technical debt for a public website.
- AI protocol and continuation files are intentionally ignored by Eleventy and should not become public routes.
- No root `.env.example` file was found; safe placeholder documentation is currently in `AGENTS.md` only.
- Root `package.json` has no `lint`, `test`, or standalone `typecheck` script.
- `npm run build` may take longer because it builds travel, runs TypeScript, builds Vite, runs Eleventy, and builds profiles.
- Do not rely on old notes saying no sitemap exists; current sitemap template is `src/sitemap.xml.njk` and generates `public/sitemap.xml` during Eleventy build.

## Do Not Do

- Do not invent translations, routes, business rules, or metrics.
- Do not create duplicate SEO, sitemap, RSS, form, or automation systems.
- Do not bypass existing `useSEO`, route mapping, Eleventy data, or Netlify Forms patterns.
- Do not skip SEO/sitemap/robots checks on public-page tasks.
- Do not silently continue to the next phase after splitting; wait for `devam`.
- Do not store real secrets, API keys, tokens, passwords, or sensitive user data.
- Do not hand-edit built `aboutcyprus/` assets when the source change belongs in `travel/` unless explicitly necessary.
- Do not ignore nested `AGENTS.md` files, especially under `furkanyonat/`.

## Required First Step For Next Agent

The next agent must first read:

1. `AGENTS.md`
2. `.ai/CONTINUATION.md` or `AI_STATE.md`
3. latest commit history
4. relevant source files for the next phase

Only after reading these should the next agent plan or modify code.
