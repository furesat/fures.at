# AI Continuation State

## Last Completed Phase

Fixed the deploy-blocking build failure in the profile build step and added a production robots file with a sitemap reference.

## Current Project Status

The repository builds successfully on the current branch. The first `npm run build` reproduced the failure: `scripts/build-profiles.mjs` always ran `npm ci` for every profile app, but the current `furkanyonat/` directory no longer contains `package.json` or a lockfile. The build script now skips missing/non-buildable profile sources and keeps existing `public/<app>` output. The build also uses `--no-audit --no-fund` for subproject installs to reduce noisy audit output and small avoidable install overhead.

## Next Phase

Optional next phase: restore the full `furkanyonat/` source project if future CV content/design edits are needed, or intentionally document that `/furkanyonat` is currently maintained from committed `public/furkanyonat/` output until source is restored.

## Remaining Phases

1. Optional: restore or reconstruct the full `furkanyonat/` Vite source app so the profile can be rebuilt from source again.
2. Optional: add root `.env.example` with safe placeholders for `VITE_SITE_URL`, Gemini, Maps, and optional image provider keys.
3. Optional: reduce deploy duration further by consolidating microsite dependency installation or caching strategy.
4. Optional: address known bundle-size warnings with dynamic imports/manual chunks.

## Important Files

- `AGENTS.md`
- `.ai/CONTINUATION.md`
- `README.md`
- `package.json`
- `netlify.toml`
- `scripts/build-profiles.mjs`
- `scripts/build-travel.mjs`
- `src/sitemap.xml.njk`
- `public/robots.txt`
- `public/furkanyonat/index.html`

## Commands Verified

- `git status --short --branch && git log --oneline -5` — checked current branch, working tree, and latest commits before editing.
- `sed -n '1,260p' AGENTS.md` and `sed -n '1,240p' .ai/CONTINUATION.md` — read required project guide and continuation state before editing.
- `find . -maxdepth 3 ... -name package.json ...` — inspected root and subproject package scripts without scanning node_modules.
- `sed -n '1,220p' src/sitemap.xml.njk` and `find ... -iname 'robots.txt'` — checked sitemap/robots setup.
- `npm run build` — first run failed after about 1m49s at `furkanyonat` because `npm ci` requires a package lock / package metadata that no longer exists there.
- `npm run build` — passed after the script fix in about 2m04s; output still includes known warnings for npm `http-proxy`, Vite CJS API deprecation, outdated Browserslist/baseline data, some large chunks, and missing optional `/index.css` in some microsites.

## Known Risks

- `furkanyonat/` currently lacks its full source app (`package.json`, components, translations, Vite config). The deploy now keeps existing committed `public/furkanyonat/` output, but future Furkan CV edits should restore/reconstruct source before changing that microsite.
- Build time is improved for noisy audit/fund output and local repeated builds no longer forcibly delete `travel/node_modules`, but the overall deploy remains relatively long because the root build compiles travel, the main app, Eleventy content, and multiple profile/tool apps.
- The first failed build modified generated `public/furkanyonat/index.html` through Eleventy before the final successful build; verify git diff before future source changes.
- Known dependency audit warnings were not fixed in this scoped deploy-stability pass.

## Do Not Do

- Do not run `ls -R` or `grep -R`; use `find`/`rg` with node_modules pruned.
- Do not hand-edit built `aboutcyprus/` output; update `travel/` source and rebuild/copy instead.
- Do not remove existing `public/furkanyonat/` output unless the full `furkanyonat/` source app is restored and rebuilt.
- Do not store real secrets, API keys, tokens, passwords, or sensitive data.
- Do not create duplicate SEO, sitemap, RSS, form, or automation systems.

## Required First Step For Next Agent

Read `AGENTS.md`, `.ai/CONTINUATION.md`, latest commit history, `scripts/build-profiles.mjs`, `scripts/build-travel.mjs`, `package.json`, `netlify.toml`, and relevant source files before planning or editing.
