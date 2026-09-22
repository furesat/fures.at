## 2026-09-22 TFV cross-link and attribution correction (preview branch)

- Replaced the incorrect German footer claim that Fures Tech is a project of the Tourismus Förder Verband. TFV is an independent organization and Fures Tech supports its technical/digital implementation; neither website should claim the other owns it.
- Added a clearly labeled outbound TFV partner link in both Fures footers and a dedicated TFV project card with TR/EN/DE/RU copy in `src/components/Projects.tsx`. It links to `https://tourismusverband.net/` in a new tab.
- Existing projects routes, SEO/sitemap and Netlify configuration were left unchanged. No new public Fures route was created, so no sitemap entry was needed.
- Changes are on `feature/tfv-partner-showcase-20260922`. Do not merge or deploy to production until the owner explicitly approves. Connector-only review does not replace local `npx tsc --noEmit` and `npm run build` verification.
- First step on continuation: confirm the links and relationship copy match the owner's expectations; run the build and preview at phone/desktop widths before any merge.

## 2026-09-20 Cosmic homepage animation removed

- At the owner's request, PR #138 (cosmic V3 homepage background) was reverted in commit `49d66fd990ff457f3d71f348add4ebc3bff204ba`. The homepage Hero, sections, existing design, and animation-free styles are back to their pre-PR #138 state.
- Do not re-add the cosmic background to the Fures homepage. The original V3 prototype is preserved as a conversation artifact for possible use in another project.

# AI Continuation State

## 2026-09-20 Appointment modal stacking fix

- The appointment dialog was rendered inside the contact page's clipped/stacked layout, so its fixed backdrop could end at the page section and the footer/header could visually sit above it.
- `AppointmentForm` now renders through `createPortal(..., document.body)`, uses a viewport-level z-index, and has viewport-safe internal scrolling.
- Reduced backdrop blur slightly to keep the modal cheaper on Safari while preserving the dimmed background.
- This fixes both the German contact page and every other place that reuses `AppointmentForm`.
- Still preview-only on PR #137.

## 2026-09-20 Header active-state hotfix + extra performance pass

- Removed the floating absolute header spotlight logic entirely. Active navigation now renders its own Aqua surface directly on the route-matching item, so the highlight cannot drift onto the wrong menu entry after navigation.
- The `Mehr` trigger receives the same route-bound active class only when one of its submenu routes is active.
- Header dropdowns remain non-modal to avoid scrollbar-lock page/header jumps.
- Living-water canvases are now capped at 1x DPR and 20fps. Off-screen pausing remains enabled.
- This is still preview-only on PR #137; do not merge until the new Netlify preview is visually approved.

## 2026-09-20 Aqua Lens interaction/performance polish

- Removed the passive mouse-following lens entirely. Water only reacts on click/tap via ripple; idle surfaces keep only subtle autonomous motion and droplets.
- Removed the decorative background FURES word.
- Softened the fixed cyan/amber/sky background fields with much larger radial fades and slower motion so sections no longer feel separated by hard color boundaries.
- Reduced canvas cost: lower DPR cap, fewer droplets, fewer optical pools and 30fps throttling while still pausing off-screen surfaces.
- Updated dark-mode dropdowns and language/theme/header pills to the same new Aqua material instead of the older glass treatment.
- Header dropdowns use Radix `modal={false}` to avoid scrollbar-lock horizontal jumps. Nav-item transform/bounce is suppressed inside the main nav and the active spotlight no longer animates transform, which keeps the header geometry stable.
- Still preview-only on PR #137. No merge.

## 2026-09-20 Aqua Lens preview refinement

- Removed the visible horizontal water-line bands from the canvas. The living layer now uses only soft moving optical pools, tiny droplets, trails, pointer response and ripples.
- Added a full-page organic Aqua backdrop scene behind the site: cyan, sky and amber liquid fields plus a faint oversized FURES word. Light mode intentionally shows this scene more clearly; dark mode keeps the same geometry at lower intensity.
- Added thicker left/right/bottom refractive edge layers to cards, nav and dropdown surfaces so the ends/corners read as curved liquid volume instead of a flat translucent panel.
- Where SVG backdrop displacement is supported, canonical cards, nav and dropdowns now use the existing `#aquaWater` filter too; form inputs use the smaller displacement filter.
- Safari/iPhone still cannot use SVG displacement inside backdrop-filter, so they retain the animated canvas + separate edge backdrop blur/saturation fallback.
- No merge. Continue using PR #137 and its Netlify deploy preview as the visual approval gate.

## 2026-09-20 Aqua Lens living-water preview

- Added `src/components/LivingWaterSystem.tsx`, a reusable canvas enhancement for the existing shared surface classes rather than a second card design system.
- It automatically enhances `.fures-card`, `.fures-nav-glass`, and `.fures-dropdown-content`, including route-mounted content via a MutationObserver.
- The water layer has continuous low-amplitude flow, tiny downward droplets with faint wet trails, a moving meniscus highlight, pointer-local optical response, and tap/click ripples.
- IntersectionObserver pauses off-screen surfaces and device pixel ratio is capped to protect mobile/Safari performance.
- `prefers-reduced-motion` disables droplet/ripple motion while preserving a restrained static water surface.
- Light-mode canonical cards are made slightly more transparent so the living layer reads without sacrificing text contrast; dark mode receives an equivalent controlled surface.
- No routes, SEO metadata, sitemap entries, form semantics, or content were changed.
- This work is intentionally on preview branch `preview/aqua-lens-living-water-20260920`; do not merge until the visual preview is approved.
- Local build was not run from the connector-only editing environment. Validate Netlify/GitHub preview checks before merge.

## 2026-09-20 Contact phone field + blog audit

- Added an optional `phone` field to the main `fures-contact` React form and its matching static Netlify declaration in `index.html`. The appointment form already had the same `phone` field, so both public lead forms now capture phone numbers.
- Reused the existing localized `appointment.phone` label (TR/EN/RU/DE) instead of creating duplicate translation keys.
- Audited blog discovery: the React app uses `import.meta.glob("../../blog/**/*.md")` and Eleventy recursively discovers the same `blog/` tree, so Markdown posts already present on `main` are automatically included. No orphan/generated-but-unregistered blog post files were found to add manually.
- Sitemap routing did not need changes because blog entries are already sourced from the automatic blog data loader.

## 2026-09-20 Shared design system + dark-mode form fix

- The MeinHotel case-study design is now the site-wide system: `src/components/ui/section.tsx` (`Section`, `SectionHeading`, `GradientTitle`, `CardIcon`) plus `.fures-card`, `.fures-section`, `.fures-section-glow` and `.fures-input` in `src/styles/globals.css`. Build new sections from these.
- Applied across Services, WhyUs, Team, FAQ, Pricing, ServicePackages, CTA, Mission, Quote, Projects, About, blog/campaign list and article pages, LegalDocument and the contact form.
- Dark-mode defects fixed: content cards no longer use the nav pill's `saturate(200%)` glass (that is why neighbouring cards looked brown vs violet), and the contact inputs no longer rely on `bg-white/8` — an opacity Tailwind never generated, which left the fields as solid white boxes with white placeholders on a dark card. Other invalid opacities (`border-white/12`, `bg-orange-500/8`, `bg-purple-600/8`) were corrected too.
- Blog and campaign list items linked to `/blog/<slug>` and `/kampanyalar/<slug>` without the locale prefix; they now use the current locale's path.
- Reminder for future work: Tailwind generates opacity modifiers in steps of 5 only.

## 2026-09-20 Light default theme + dark palette pass

- Light is now the default theme for everyone: `DEFAULT_THEME = 'light'` in `src/contexts/ThemeContext.tsx`, an explicit toggle still persists through the `fures-theme` localStorage key, and `prefers-color-scheme` is ignored on purpose. An inline script in `index.html` applies the theme before first paint (no dark flash); `<body>` no longer carries `bg-black`.
- Dark mode was rebuilt around a `#0b0e14` base: `bg-black` sections are transparent so the body gradient shows, cards are `#141822` with a visible edge, dim body text is lifted to a cool grey, warm section washes were rebalanced towards violet, and the hero silk (`ClothCanvas`) uses a cool charcoal base with lifted ambient light.
- Layout bugs fixed in passing: centred hero icon badges (Mission/FAQ/Pricing) were flush left; gradient-clipped headings needed `mx-auto block w-fit` to show the whole orange→purple range; campaign pages now reuse `page-hero-glow`.
- Both theme override blocks live at the end of `src/styles/globals.css` — extend those instead of hardcoding colours in components.
- PR #132 (MeinHotel case study + SEO pass) is merged into `main`; this branch was restarted from `origin/main` for the theme work.

## 2026-09-20 MeinHotel PMS case study + light-mode colour pass

- New public case study for the in-house PMS at `/tr/projeler/meinhotel-pms`, `/en/projects/meinhotel-pms`, `/ru/projects/meinhotel-pms`, `/de/referenzen/meinhotel-pms`. Copy lives in `src/data/meinhotel.ts` (four languages), rendering in `src/pages/MeinHotelPage.tsx`, routes in `src/App.tsx`, sitemap entries in `src/sitemap.xml.njk`.
- The page links into the live PMS: `https://app.fures.tech/demo` (demo user `demo@fures.tech`, shared password `Test123!`, sample hotel "Alpin Panorama Grand Resort | DEMO") and `https://app.fures.tech/login`. Those constants live in `MEINHOTEL_APP`; change them in one place if the owner rotates the demo password or moves the host.
- MeinHotel is now the first card in the projects grid, an entry in both header "More" menus and in both footers; the footers additionally carry a direct PMS login link.
- German-focused defect pass: duplicated language code in the header pills, the dead `/de/kampagnen` menu entry, hardcoded Turkish links in shared components (DE/EN/RU visitors were thrown into the Turkish site), off-brand mint gradient on the DE hero CTA, unreadable orange accents / placeholders / gradient button in light mode, frame-rate-dependent hero cloth fade-in, and raw translation keys in the services JSON-LD.
- Canonical/hreflang pass: `?lang=xx` canonicals removed, alternates now mapped through `LANGUAGE_ROUTES` (unmappable slugs get a self-reference), `/de/kampagnen` excluded via `UNAVAILABLE_ROUTES`, the static `index.html` alternates are runtime-managed, exactly one `x-default` per cluster (English), and the blog list/post pages publish their own metadata instead of inheriting the German homepage canonical.
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

Unified the site on the MeinHotel design language and fixed the remaining dark-mode colour and form defects.

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
