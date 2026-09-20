# AI Continuation State

## 2026-09-20 MeinHotel PMS case study + light-mode colour pass

- New public case study for the in-house PMS at `/tr/projeler/meinhotel-pms`, `/en/projects/meinhotel-pms`, `/ru/projects/meinhotel-pms`, `/de/referenzen/meinhotel-pms`. Copy lives in `src/data/meinhotel.ts` (four languages), rendering in `src/pages/MeinHotelPage.tsx`, routes in `src/App.tsx`, sitemap entries in `src/sitemap.xml.njk`.
- The page links into the live PMS: `https://app.fures.tech/demo` (demo user `demo@fures.tech`, shared password `Test123!`, sample hotel "Alpin Panorama Grand Resort | DEMO") and `https://app.fures.tech/login`. Those constants live in `MEINHOTEL_APP`; change them in one place if the owner rotates the demo password or moves the host.
- MeinHotel is now the first card in the projects grid, an entry in both header "More" menus and in both footers; the footers additionally carry a direct PMS login link.
- German-focused defect pass: duplicated language code in the header pills, the dead `/de/kampagnen` menu entry, hardcoded Turkish links in shared components (DE/EN/RU visitors were thrown into the Turkish site), off-brand mint gradient on the DE hero CTA, unreadable orange accents / placeholders / gradient button in light mode, frame-rate-dependent hero cloth fade-in, and raw translation keys in the services JSON-LD.
- Verified with `npx tsc --noEmit`, `npm run build`, and Playwright screenshots (light + dark, desktop + phone). Live hosts could not be fetched from the session (network policy blocks outbound HTTPS); `app.fures.tech` was confirmed through the Netlify API as the primary URL of project `fureshotel` with a ready deploy.

## 2026-09-19 Netlify account migration / removed public chat

- Newly connected Netlify team `furkanyonat`, project `furestech` (site ID `757270a8-162c-4094-b479-d73141f1b14f`) publishes the main Fures site from `furesat/fures.at` with `npm run build` and `public`.
- On new Netlify account, `furestech` has no environment variables. Former public Fures AI chat imported `geminiService.ts`, which threw at module import when the Gemini key was missing. This broke React startup and can explain the blank homepage even when Netlify reports the deploy as ready.
- Removed AssistantWidget and ChatWindow from every language layout in `src/App.tsx`; the site no longer loads the client-side Gemini chatbot.
- Removed main Vite config's inline API key substitution to avoid embedding a privileged Gemini key in public site JavaScript. Other independent microsite packages were not modified.
- After merge verify a new Netlify `furestech` production deploy uses the merged commit, and smoke-test root `/`, `/de`, `/tr`, `/furkanyonat` over HTTPS. Keep the apex and `www` domain on the `furestech` project, not on the MeinHotel project.
- Independent new Netlify project `fureshotel` (site ID `9852112d-505b-4d54-b4c7-b180c83dbe4c`) holds the MeinHotel application, using `furesat/meinhotel`; the missing six non-secret/publishable Supabase and demo config variables have been restored. The `app.fures.tech` custom domain and its HTTPS still need checking on this new Netlify site. Do not merge the two apps, and do not claim domain cutover is complete until tested.
- Existing sitemap and robots configuration is unchanged; the main marketing site's route set did not change.


## Last Completed Phase

Published the MeinHotel PMS case study in four languages with direct demo/login access to the live system, and fixed the German-facing design, colour and navigation defects found during the review.

## Current Project Status

`npx tsc --noEmit` and `npm run build` both pass on the current branch. The generated `public/sitemap.xml` contains the four new case-study URLs. Screenshots of `/de`, `/de/leistungen`, `/de/referenzen`, `/de/kontakt`, `/de/blog`, `/tr`, `/tr/projeler` and the new page were reviewed in light and dark mode at 1440×900 and 390×844.

## Next Phase

Optional: add real screenshots of the PMS (room rack, reception timeline) to `public/images/projects/meinhotel-pms/` and embed them in the case study — the page is currently text-and-icon only. Blur or replace any guest-looking data before publishing images.

## Remaining Phases

1. Optional: PMS screenshots / short screen recording on the case-study page.
2. Optional: a German-language blog post about the PMS launch that links to the case study (the DE blog is generated automation content today).
3. Optional: restore or reconstruct the full `furkanyonat/` Vite source app so the profile can be rebuilt from source again.
4. Optional: add root `.env.example` with safe placeholders.
5. Optional: address known bundle-size warnings with dynamic imports/manual chunks.

## Important Files

- `AGENTS.md`
- `.ai/CONTINUATION.md`
- `src/data/meinhotel.ts` — case-study copy + demo/login URLs and credentials
- `src/pages/MeinHotelPage.tsx`
- `src/App.tsx`, `src/sitemap.xml.njk`
- `src/components/Projects.tsx`, `src/components/Header.tsx`, `src/components/HeaderDE.tsx`, `src/components/Footer.tsx`, `src/components/FooterDE.tsx`
- `src/styles/globals.css` (light-mode accent block at the end of the file)
- `src/utils/routes.ts` (`getPath`)

## Commands Verified

- `npm install --no-audit --no-fund`
- `npx tsc --noEmit` — passed, no output
- `npm run build` — passed end to end (travel, main app, Eleventy, profile builds); the usual warnings remain (Vite CJS API deprecation, outdated Browserslist data, large chunks, missing optional `/index.css` in some microsites)
- Playwright screenshots against the local dev server on 127.0.0.1:5175, light and dark theme, desktop and phone viewports

## Known Risks

- The demo password is published on a public page by the owner's explicit instruction. It only unlocks the dedicated demo Supabase user, which has exactly one membership in the fictional sample hotel; the `enterRealDemo` server action in `furesat/meinhotel` refuses any account with a different or additional membership. Rotating it means updating `MEINHOTEL_APP` and the portfolio note.
- Live URLs (`fures.at`, `app.fures.tech`) could not be requested from this environment, so link targets were verified from repository configuration plus the Netlify API, not by fetching the pages.
- The light-mode colour overrides are global: they change every `text-orange-*` accent on light backgrounds site-wide, which is the intent, but a future component that deliberately wants the pale orange on a dark surface inside light mode must opt out explicitly.
- `public/furkanyonat/index.html` is committed generated output; it was edited together with its `furkanyonat/index.html` source so the two stay in sync.

## Do Not Do

- Do not run `ls -R` or `grep -R`; use `find`/`rg` with node_modules pruned.
- Do not hand-edit built `aboutcyprus/` output; update `travel/` source and rebuild/copy instead.
- Do not remove existing `public/furkanyonat/` output unless the full `furkanyonat/` source app is restored and rebuilt.
- Do not store real secrets, API keys, tokens, passwords, or sensitive data.
- Do not create duplicate SEO, sitemap, RSS, form, or automation systems.

## Required First Step For Next Agent

Read `AGENTS.md`, `.ai/CONTINUATION.md`, latest commit history, `scripts/build-profiles.mjs`, `scripts/build-travel.mjs`, `package.json`, `netlify.toml`, and relevant source files before planning or editing.
