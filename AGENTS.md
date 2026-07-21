# AGENTS.md

This file is the main operating guide for AI agents and developers working in this repository. Every AI agent must read this file before making changes.

The goal is not only to complete tasks, but to leave the project cleaner, safer, more scalable, more SEO-ready, better documented, and easier for the next AI agent or developer to continue.

---

## 1. Project Identity

### Project Name

fures.at

### Business Purpose

This repository powers the multilingual public website, AI-generated news/blog automation, campaign content, static project case studies, and related microsites for Fures Tech and connected projects.

### Target Users

- Potential clients looking for AI, automation, tourism-tech, web, SEO, and digital transformation services.
- Visitors reading multilingual AI/tourism automation blog posts.
- Zapier/social automation consumers that read RSS feeds from the site.
- Recruiters or stakeholders viewing profile/CV microsites such as `/furkanyonat`.
- Users of related tools/microsites such as the AI career coach, AI travel companion, and AI content detector.

### Main Value Proposition

fures.at presents Fures Tech's services, references, multilingual content, and AI-powered tools in one SEO-oriented static web platform while daily automation generates fresh multilingual blog and campaign assets for website and social distribution.

### Product Vision

Keep fures.at as a multilingual, SEO-strong, automation-friendly hub for tourism technology, AI workflows, hotel/destination digitalization, and public project showcases, with safe handoff documentation for both human developers and AI agents.

---

## 2. Current Technical Stack

Update this section whenever the stack changes.

### Framework

- Main site: Vite + React + React Router for the client application.
- Static generation/output: Eleventy generates RSS feeds, sitemap, and static output into `public/`.
- Microsites/tools: several subprojects use their own Vite + React builds (`travel/`, `kariyer/`, `furkanyonat/`, `gulbeneser/`, `ai-content-detector/`).

### Language

- TypeScript/TSX for React source.
- JavaScript for Eleventy data/config scripts.
- Python for automation scripts under `scripts/`.
- HTML/Nunjucks/Markdown for static pages, feeds, layouts, blog posts, and campaign posts.

### Package Manager

npm. Use commands from `package.json`; do not invent package-manager commands.

### Styling System

Tailwind CSS utilities plus global CSS in `src/styles/globals.css`. Radix UI primitives, `class-variance-authority`, `tailwind-merge`, `lucide-react`, `framer-motion`, and custom semantic classes are used in the main UI.

### Backend / Database

Static-site oriented repository. No database layer was found in the current project.

### Auth System

No repository-level auth system was found. Some tools depend on API keys for Gemini/Maps/OpenAI-style providers, but no user authentication layer was found in the main site.

### CMS / Content Source

- Markdown blog posts in `blog/<lang>/` and Eleventy content collections.
- Campaign Markdown in `kampanyalar/tr/`.
- Static case-study HTML in `projects/` and `projeler/`.
- React data/translation/config files in `src/`, `furkanyonat/`, and other subprojects.

### Deployment Platform

Netlify. `netlify.toml` builds with `npm run build` and publishes `public/`.

### Important Third-Party Services

- Google Gemini / `@google/genai` for content generation, image generation, and assistant/tool features.
- Google Maps / Gemini Live in the travel companion.
- Zapier RSS automations for Instagram and LinkedIn sharing.
- Netlify Forms for contact form submissions.
- Optional/fallback image providers referenced by automation: OpenAI DALL·E, Fal.ai Flux Schnell, Google Imagen, Replicate, Stability AI, Vertex AI.
- IP language detection uses `https://api.country.is/` with a timeout and localStorage cache.

---

## 3. Core Operating Principle

The AI agent must work like a senior product engineer, SEO architect, QA reviewer, documentation owner, and handoff manager. The agent must not behave like a blind code generator.

Every change should improve stability, clarity, maintainability, scalability, SEO quality when relevant, developer experience, and future AI continuation quality.

---

## 4. Before Every Task

Before editing code, inspect and understand the project.

Always check:

1. `AGENTS.md`
2. `.ai/CONTINUATION.md`, `AI_STATE.md`, or similar continuation file if it exists
3. `README.md` and project documentation
4. package files and available scripts
5. framework configuration
6. routing structure
7. sitemap and robots files
8. SEO and metadata setup
9. environment example files
10. database, schema, migration, or seed files when relevant
11. deployment configuration
12. latest commit history
13. relevant source files for the requested task

Before coding, identify framework, language, package manager, routing, styling, content/data source, build/test/lint/typecheck commands, deployment target, SEO setup, sitemap setup, unfinished phase if any, and important business logic that must not be broken.

Make a short implementation plan before editing.

---

## 5. Core Engineering Rules

- Reuse existing architecture, naming patterns, components, routing conventions, styling rules, data/content patterns, and deployment logic.
- Do not create duplicate systems or replace working architecture without strong reason.
- Prefer small, safe, production-ready changes.
- Keep the project stable after every completed phase.
- Never leave the project in a broken intermediate state.
- Do not invent data, translations, routes, business rules, metrics, or content without a clear source.
- Do not hardcode fragile values unless the project already uses that pattern.
- Add types, validation, error handling, loading states, empty states, and fallbacks where useful.
- Keep user experience simple and clear.
- Never put `try`/`catch` blocks around imports.

---

## 6. Security Rules

Never expose, commit, document, or log real secrets, API keys, passwords, tokens, private credentials, or sensitive user data. Do not weaken auth, bypass authorization, or bypass validation.

If environment variables are needed, add safe placeholder names to documentation or env example files and never include real values.

---

## 7. Accessibility Rules

For UI changes, check semantic HTML, heading structure, labels, meaningful image alt text, keyboard usability, focus states, readable contrast, practical ARIA usage, mobile usability, and clear empty/error states.

---

## 8. Performance Rules

Avoid unnecessary dependencies, oversized assets, blocking scripts, duplicate data fetching, heavy client-side rendering where not needed, huge bundles without reason, unoptimized images, unnecessary re-renders, and loading large datasets upfront when lazy loading is possible.

If build tools warn about large bundles, report it and suggest safe next steps.

---

## 9. Task Splitting Rule

If the requested task is too large, risky, broad, or complex to complete safely in one pass, split it into phases. Complete only the first safe and meaningful phase, leave the project stable and documented, then wait for the user to write `devam` before continuing.

When splitting, final reports must include the reason, completed items, remaining phases, and the `devam` instruction.

---

## 10. SEO Perfect Principle

Every public website or public page is SEO-important from day one.

For every new or changed public page, check where relevant: unique title, strong meta description, canonical URL, correct index/noindex decision, Open Graph metadata, Twitter/X card metadata, one clear H1, logical H2/H3 structure, readable slug, internal links, breadcrumbs, image alt/performance, structured data, hreflang for multilingual pages, robots compatibility, sitemap inclusion, duplicate metadata, broken internal links, orphan pages, mobile-first layout, and Core Web Vitals mindset.

If no public route or indexable page changed, clearly report that SEO changes were not needed.

---

## 11. Sitemap Rule

At the end of every task, inspect sitemap and robots setup. Check for sitemap templates/output, sitemap index, dynamic sitemap generation, robots.txt sitemap reference, framework SEO/sitemap config, and newly added pages/routes/posts/products/services/locations/language versions/landing pages.

If a new public route should be indexed, add it to the sitemap generator. If a page should not be indexed, exclude it and document why. If robots.txt references sitemap incorrectly, fix it. Always report sitemap status.

---

## 12. AI Continuity Rule

At the beginning of every task, read `.ai/CONTINUATION.md`, `AI_STATE.md`, or similar if it exists. At the end of every task, create or update `.ai/CONTINUATION.md`.

The continuation file must document last completed phase, current project status, next phase, remaining phases, important files, commands verified, known risks, do-not-do notes, and required first step for the next agent.

---

## 13. Main Prompt Preservation Rule

Preserve long operating prompts as clean operational summaries in this file, not as repeated full chat dumps. Do not store private secrets, temporary chat noise, repeated prompts, or irrelevant conversation history.

---

## 14. Project Structure

```text
/
├── AGENTS.md                 AI/developer operating guide
├── .ai/CONTINUATION.md       AI continuation state
├── README.md                 Automation overview and local preview notes
├── package.json              Root npm scripts and dependencies
├── vite.config.ts            Main Vite config and fotos copy/dev plugin
├── .eleventy.js              Eleventy config, filters, collections, output to public/
├── netlify.toml              Netlify build/publish and redirect rules
├── index.html                Main Vite shell and Netlify Forms static declaration
├── src/                      Main React/Eleventy source
├── src/components/           Main reusable UI components
├── src/pages/                React Router page components
├── src/contexts/             Language and theme contexts
├── src/hooks/useSEO.ts       Runtime SEO/head management hook
├── src/utils/seo.ts          SEO URL/schema helpers
├── src/utils/routes.ts       Language route map and geolocation language detection
├── src/_data/                Eleventy data loaders for blog/campaign posts
├── src/_includes/            Eleventy layouts
├── src/sitemap.xml.njk       Dynamic sitemap template
├── src/rss.xml.njk           Main RSS feed template
├── src/rss2.xml.njk          Campaign RSS feed template
├── blog/                     Generated multilingual blog Markdown
├── kampanyalar/tr/           Generated Turkish campaign Markdown
├── fotos/                    Generated media assets
├── public/                   Netlify publish output and static assets
├── scripts/                  Automation/build/sync scripts
├── projects/                 Static German/English project case-study pages
├── projeler/                 Turkish project case-study pages
├── travel/                   Fures Travel AI Companion source/build project
├── aboutcyprus/              Built travel planner production files
├── kariyer/                  Fures Kariyer Koçu source/build project
├── furkanyonat/              CV/profile microsite source/build project
├── gulbeneser/               Profile microsite source/build project
└── ai-content-detector/      AI content detector tool source/build project
```

---

## 15. Core Routes / Pages

| Route | Purpose | SEO Notes |
| --- | --- | --- |
| `/` | Geo/browser-language redirect to language homepage | Public entry point; redirects client-side. |
| `/tr`, `/en`, `/ru`, `/de` | Language homepages | Public indexable locale roots. |
| `/tr/hakkimizda`, `/en/about`, `/ru/about`, `/de/ueber-uns` | About pages | Managed by `AboutPage`; keep canonical/hreflang coherent. |
| `/tr/hizmetler`, `/en/services`, `/ru/services`, `/de/leistungen` | Services pages | Public SEO pages. |
| `/tr/projeler`, `/en/projects`, `/ru/projects`, `/de/referenzen` | Projects/references listings | Public SEO pages; external-only project links do not need sitemap entries. |
| `/tr/ekip`, `/en/team`, `/ru/team`, `/de/team` | Team pages | Public SEO pages. |
| `/tr/sss`, `/en/faq`, `/ru/faq`, `/de/faq` | FAQ pages | Should preserve FAQ structured data where used. |
| `/tr/iletisim`, `/en/contact`, `/ru/contact`, `/de/kontakt` | Contact pages | Netlify Forms flow; do not break static form registration. |
| `/<lang>/blog` and `/<lang>/blog/:slug` | Blog list/detail pages | Blog posts should be included by `src/sitemap.xml.njk`. |
| `/tr/kampanyalar` and `/tr/kampanyalar/:slug` | Turkish campaign pages | Campaign posts should be included by `src/sitemap.xml.njk`. |
| `/en/campaigns`, `/ru/campaigns` | Campaign list/detail routes | Content is Turkish-only; preserve empty-state behavior for other languages. |
| `/tr/gizlilik-politikasi`, `/en/privacy-policy`, `/ru/privacy-policy`, `/de/datenschutz` | Privacy pages | Low-priority legal SEO pages. |
| `/tr/cerez-politikasi`, `/en/cookie-policy`, `/ru/cookie-policy`, `/de/cookies` | Cookie policy pages | Low-priority legal SEO pages. |
| `/tr/kvkk-aydinlatma-metni`, `/en/gdpr-disclosure`, `/ru/gdpr-disclosure`, `/de/datenschutzhinweis` | KVKK/GDPR disclosure pages | Low-priority legal SEO pages. |
| `/furkanyonat`, `/gulbeneser`, `/kariyer` | Profile/tool microsite routes | Netlify redirects serve built microsites/profile viewer. |
| `/aboutcyprus`, `/travel`, `/ai-content-detector` | Tool/planner microsites | Public static tool routes. |
| `/projects/<slug>/`, `/projeler/<slug>/` | Static project case studies | Preserve SEO title/description/CTA consistency. |

---

## 16. SEO System

- Runtime page metadata is managed through `src/hooks/useSEO.ts`.
- SEO helpers and structured data factories live in `src/utils/seo.ts`.
- Language route mapping and canonical route references live in `src/utils/routes.ts`.
- Pages call `useSEO` with title, description, canonical path, alternates, Open Graph, Twitter card, and structured data where needed.
- `useSEO` inserts canonical links, hreflang alternates, `x-default`, robots, Open Graph, Twitter metadata, and JSON-LD managed by `data-managed="seo"`.
- Default base URL is `https://fures.at`, overridable with `VITE_SITE_URL`.
- Default OG image is `/images/fures.png`.
- Eleventy/Nunjucks templates under `src/_includes/` support blog/post output.
- Static HTML project pages under `projects/` and `projeler/` carry their own metadata and must be edited carefully.

---

## 17. Sitemap System

- Dynamic sitemap template: `src/sitemap.xml.njk`.
- Production output path: `public/sitemap.xml` after Eleventy runs.
- The sitemap includes static language routes, legal pages, selected microsite/profile/tool pages, static project pages, all blog posts from `blogPosts.all`, and all campaign posts from `campaignPosts.all`.
- Eleventy config adds a `sitemapDate` filter in `.eleventy.js`.
- No `robots.txt` file was found in the current project. This is technical debt for a public website; add one when scope allows, and include a `Sitemap: https://fures.at/sitemap.xml` reference.
- New internal public routes must be added to `src/sitemap.xml.njk` or to the appropriate data source consumed by it. External-only links, such as a project card pointing to an outside domain, do not need sitemap entries.

---

## 18. Build, Test, and Dev Commands

Commands verified from root `package.json`:

```bash
npm run dev
npm run dev:eleventy
npm run build:travel
npm run build
npm run build:profiles
npm run build:eleventy
npm run preview
```

There is currently no root `lint`, `test`, or `typecheck` npm script. Root `npm run build` includes `tsc`, so it performs TypeScript checking as part of the production build.

Automation check mentioned by project docs:

```bash
python scripts/gemini_daily.py --help
```

Only claim commands passed if actually run in the current task.

---

## 19. Environment Variables

Never commit real values. Known variable names from code/docs:

```env
VITE_SITE_URL="https://fures.at"
GEMINI_API_KEY="..."
API_KEY="..."
apikey="..."
MAPS_API_KEY="..."
OPENAI_API_KEY="..."
FAL_KEY="..."
REPLICATE_API_TOKEN="..."
STABILITY_API_KEY="..."
```

Notes:

- Main Vite config resolves Gemini key from `apikey`, `API_KEY`, or `GEMINI_API_KEY` and exposes only the configured value through `process.env.API_KEY` / `process.env.GEMINI_API_KEY` define replacement.
- Travel uses `GEMINI_API_KEY` and `MAPS_API_KEY` according to its docs/source.
- Automation may use Gemini plus fallback image providers. Check script code before adding new provider env names.
- No root `.env.example` file was found in the current project.

---

## 20. Data / Database Notes

This project currently has no database layer.

Important data/content files:

- `blog/<lang>/*.md`: generated blog posts.
- `kampanyalar/tr/*.md`: generated Turkish campaign posts.
- `src/_data/blogPosts.js`: Eleventy blog data loader; do not reintroduce artificial sitemap truncation.
- `src/_data/campaignPosts.js`: Eleventy campaign data loader.
- `src/utils/blog.ts`: main app blog utilities.
- `src/utils/campaigns.ts`: main app campaign utilities.
- `src/contexts/LanguageContext.tsx`: language metadata/translations for main app.
- `src/components/Projects.tsx`: project/reference card collection.

---

## 21. Design System / UI Rules

- Main site uses dark-first premium visuals with light-mode overrides in `src/styles/globals.css`.
- Preserve semantic class refactors such as `premium-card`, `page-hero-glow`, and `whyus-*`; avoid returning to brittle long utility selector chains.
- Light-mode fixes should generally live under `html.theme-light` / `[data-theme="light"]` selectors and should not unintentionally change dark-mode tokens.
- Header/nav uses liquid glass visual treatment; avoid duplicate active-pill layers that create rectangular artifacts.
- WhyUs/Mission/About hero light surfaces are intentionally aligned with the references design language.
- Use existing components and UI primitives before creating new ones.
- If a perceptible web-app visual change is made, take a screenshot when possible.

---

## 22. Coding Conventions

- React components use PascalCase `.tsx` files.
- Shared helpers live under `src/utils/`; contexts under `src/contexts/`; hooks under `src/hooks/`.
- Route declarations live in `src/App.tsx`; language path constants live in `src/utils/routes.ts`.
- SEO work should use `useSEO` and helpers from `src/utils/seo.ts` rather than ad hoc direct DOM logic.
- Preserve existing multilingual route structure and route redirects.
- Do not invent translations; keep `LANGS`, `LANG_NAMES`, `SUPPORTED_LANGUAGES`, and related translation data synchronized when adding languages.
- External requests in scripts must have timeouts and fallback behavior.
- Keep automation logs helpful for missing API keys or provider failures.

---

## 23. Business Logic That Must Not Be Broken

### Daily Blog Automation

- `scripts/gemini_daily.py` fetches RSS/news, generates multilingual blog posts, and generates images.
- Image provider order is Gemini 2.5 Flash Image, OpenAI DALL·E if available, Fal.ai Flux Schnell, then Google Imagen 4.0, Replicate, Stability AI, and Vertex AI fallbacks.
- If image generation fails across providers, generated news files must not be published.
- Blog `description` front matter is Instagram-compatible and must stay within `INSTAGRAM_CAPTION_LIMIT` (2,200 chars as documented). Captions should not include URLs or hashtags.
- Topic labels are language-specific; German blog topic headings must stay German.
- Robot research focus is Austria/Germany/global tourism, AI in tourism, and tourism automation.

### Social/RSS Automations

- Blog RSS output is `public/feed.xml`.
- Campaign RSS output is `public/rss2.xml` from `src/rss2.xml.njk`.
- Zapier listens to RSS feeds for Instagram and LinkedIn sharing.
- Instagram captions are title plus short feed summary in a two-line structure; verify character limits during Zapier changes.
- LinkedIn comment uses feed raw encoded description and automatically adds link; do not add duplicate URLs in RSS descriptions.
- Instagram campaign/blog images should be square or 4:5 vertical; generated campaign images live under `/fotos/campaigns/`.

### Campaign Automation

- `scripts/gemini_daily.py` also generates Turkish campaign kits each run.
- Campaign generation flow is `generate_campaign_payload` → `build_campaign_markdown` → `save_campaign`.
- If campaign JSON schema changes, update `src/utils/campaigns.ts`, `CampaignListPage`, `CampaignPostPage`, and `src/_data/campaignPosts.js` together.
- Campaign content is Turkish-only; other languages show empty-list messaging.

### Netlify Contact Form

- Static Netlify form declaration is in `index.html`.
- Visible form component is `src/components/NetlifyContactForm.tsx`.
- Preserve form name `fures-contact` and fields `name`, `email`, `company`, `start-date`, `message`, `language`, and `recipient`.
- Preserve `recipient` value unless explicitly requested by the project owner.

### Project Case Studies

- `projects/` pages are already optimized static HTML. Preserve heading hierarchy, dates, metrics, story flow, CTA targets, and noindex requirements where present.
- Put added project images under `public/images/projects/<slug>/` and use relative URLs.
- For new internal project pages, update the sitemap generator.

### Important Project-Specific Rules

- `maria-alm-route-atlas` in `src/components/Projects.tsx` must remain marked as under construction in all languages until the project is genuinely live.
- Furkan Yonat CV/profile content has a local `furkanyonat/AGENTS.md`; obey it for files under `furkanyonat/`.
- Furkan profile title, experience order, contact block, PDF behavior, profile image import, and German tone rules documented in older project notes must be preserved.
- `aboutcyprus/` is a built output from `travel/`; update `travel/` source and rebuild/copy rather than hand-editing built assets unless explicitly necessary.

---

## 24. AI Working Protocol

Every AI agent must:

1. Read `AGENTS.md`.
2. Read `.ai/CONTINUATION.md` or `AI_STATE.md` if it exists.
3. Inspect the project before editing.
4. Understand existing architecture.
5. Make a short plan.
6. Split large tasks into phases when needed.
7. Complete only the first safe phase when splitting.
8. Wait for `devam` before continuing to the next phase.
9. Keep the repo stable.
10. Update `AGENTS.md` when important project knowledge changes.
11. Update `.ai/CONTINUATION.md`.
12. Check SEO impact.
13. Check sitemap and robots impact.
14. Run relevant tests/build/lint/typecheck if available.
15. Report clearly what changed and what remains.

---

## 25. Do Not Do

Do not make blind edits, create duplicate systems, ignore existing architecture, ignore `AGENTS.md`, ignore the continuation file, skip SEO/sitemap checks, invent translations/content/business rules/routes, auto-split prose into vocabulary without review, bypass auth/validation, expose secrets, store sensitive data, leave the repo broken, silently continue after a split phase, hide failed commands, pretend tests passed if they did not run, make broad rewrites without need, introduce unnecessary dependencies, remove useful documentation, or overwrite unrelated user work.

---

## 26. Git, Commit, and PR Rules

Before making changes, check the current branch, latest commits, and uncommitted changes. Do not overwrite unrelated user changes.

For this environment, commit coherent completed changes on the current branch and create a PR record with the make_pr tool after committing. If no changes were made, do not call the PR tool.

PR/final summaries should mention changed files, tests run, SEO impact, sitemap/robots status, and known risks.

---

## 27. Testing and Verification

Run relevant commands when available: build, Eleventy build, TypeScript check through build, automation `--help`, content audits, sitemap generation, and link checks where appropriate.

Only claim a command passed if it actually ran and passed. If a command cannot run or fails, report the command, failure summary, likely cause, relation to current task, and safe next step.

---

## 28. Known Issues / Technical Debt

- No root `robots.txt` file was found; add one with a sitemap reference when scope allows.
- `.eleventy.js` intentionally ignores `AGENTS.md` and `.ai/**` so AI handoff/protocol files are not rendered into `public/`.
- No root `.env.example` file was found; consider adding safe placeholders for required integrations.
- Root `package.json` has no `lint`, `test`, or standalone `typecheck` script.
- `node_modules/` exists in the repository workspace and subprojects; avoid scanning it unless necessary.
- Some older AGENTS update notes claimed no sitemap existed before June 2026; current repo now has `src/sitemap.xml.njk` dynamic generation.

---

## 29. Recent Changes

### 2026-06-27: Shared AI Working Protocol

#### Summary

Merged the common AI working protocol into this project guide, preserved current project-specific automation/SEO/business rules, and documented the actual stack, routes, sitemap, and continuation workflow.

#### Files Changed

- `AGENTS.md`
- `.ai/CONTINUATION.md`
- `.eleventy.js`

#### SEO Status

No public route or page content changed; SEO metadata did not need changes. Eleventy now ignores AI handoff/protocol Markdown so these internal docs are not published as public pages.

#### Sitemap Status

No new intended public route was added. Current sitemap generation is `src/sitemap.xml.njk`; no sitemap changes were required. `robots.txt` was not found and remains technical debt. `.eleventy.js` excludes AI docs from future public output.

#### AGENTS.md Status

Updated as the canonical shared protocol plus project-specific guide.

#### Continuation File Status

Created/updated `.ai/CONTINUATION.md` with current status and next phase.

#### Commands Run

Record exact commands in `.ai/CONTINUATION.md` and final response for the current task.

#### Last Completed Phase

Added the shared AI working protocol and project-specific handoff summary.

#### Next Phase

Consider adding `robots.txt` and `.env.example` in a separate scoped task.

#### Known Risks / Notes

Documentation-only change; build should still be run to confirm no tooling regressions from existing repository state.

---

## 30. Final Response Format

At the end of every task, respond with:

1. What changed
2. Files changed
3. SEO status
4. Sitemap status
5. AGENTS.md status
6. Continuation file status
7. Tests/build status
8. Last completed phase
9. Next phase
10. Important notes or next steps

If the task was split, also include completed/remaining phases and the instruction to write `devam`.

Never finish without checking and reporting `AGENTS.md`, continuation file, sitemap, robots.txt if relevant, SEO impact, build/test/lint/typecheck possibility, project stability, and next phase.

### 2026-07-21: Furkan CV Design, Language, and SEO Polish

#### Summary

Improved the existing `/furkanyonat` CV microsite source and generated public output with clearer hero presentation, accessible navigation/focus states, project-card CTA affordance, static/dynamic SEO metadata, and targeted TR/EN/DE/ES language consistency fixes.

#### Files Changed

- `AGENTS.md`
- `.ai/CONTINUATION.md`
- `furkanyonat/AGENTS.md`
- `furkanyonat/index.html`
- `furkanyonat/App.tsx`
- `furkanyonat/components/Sidebar.tsx`
- `furkanyonat/components/ui/ProjectCard.tsx`
- `furkanyonat/data/translations.ts`
- `public/furkanyonat/index.html`
- `public/furkanyonat/assets/*`

#### SEO Status

Existing `/furkanyonat/` route received stronger static metadata in the microsite shell and runtime language-aware title/description synchronization. No new public route was added.

#### Sitemap Status

The existing `src/sitemap.xml.njk` and generated `public/sitemap.xml` already include `https://fures.at/furkanyonat/`; no sitemap entry change was required. No root/public `robots.txt` file was found, so robots remains technical debt.

#### Commands Run

- `npm run build --prefix furkanyonat`
- `npm run build`
- `npx --yes playwright --version`
- `npx --yes playwright install chromium && npx --yes playwright screenshot --viewport-size=1440,1200 http://127.0.0.1:4174/furkanyonat/ furkanyonat-screenshot.png` (failed because the container lacks `libatk-1.0.so.0`)

### 2026-07-21: Furkan CV Apple-Style Light Mode Contrast

#### Summary

Adjusted the existing `/furkanyonat` CV microsite light-mode palette to Apple-style neutral surfaces and system-blue accents, and replaced low-contrast project tag utility colors with theme variables so project badges remain readable in light and dark modes.

#### Files Changed

- `AGENTS.md`
- `.ai/CONTINUATION.md`
- `furkanyonat/AGENTS.md`
- `furkanyonat/index.html`
- `furkanyonat/components/ui/ProjectCard.tsx`
- `public/furkanyonat/index.html`
- `public/furkanyonat/assets/*`

#### SEO Status

Existing `/furkanyonat/` visual styling changed only; no title, description, canonical, Open Graph, route, or index/noindex behavior changed.

#### Sitemap Status

No new public route was added. `src/sitemap.xml.njk` already includes `https://fures.at/furkanyonat/`; no sitemap change was required. No root/public `robots.txt` file was found, so robots remains technical debt.

#### Commands Run

- `npm run build --prefix furkanyonat`
- `npm run build:profiles`
- `npm run build`
- `npx --yes playwright install chromium >/tmp/playwright-install.log 2>&1 && npm run preview -- --host 127.0.0.1 ... && npx --yes playwright screenshot --viewport-size=1440,1200 http://127.0.0.1:4173/furkanyonat/ furkanyonat-light-apple.png` (failed because the container lacks `libatk-1.0.so.0`)
