import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Headphones,
  Languages,
  ListChecks,
  Mic,
  Music,
  NotebookPen,
  RefreshCw,
  Rocket,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { LANGUAGE_META, useLanguage } from "../contexts/LanguageContext";
import { getPath } from "../utils/routes";
import {
  DEUTSCHDA_APP,
  DEUTSCHDA_PATHS,
  FEATURE_ORDER,
  SCREEN_ORDER,
  deutschDaLanguage,
  getDeutschDaContent,
  screenUrl,
  type DeutschDaLanguage,
  type FeatureId,
} from "../data/deutschda";
import {
  useSEO,
  canonicalPathForLanguage,
  createBreadcrumbSchema,
  createOrganizationSchema,
  createSoftwareApplicationSchema,
} from "../hooks/useSEO";

const FEATURE_ICONS: Record<FeatureId, LucideIcon> = {
  course: BookOpen,
  speaking: Mic,
  review: RefreshCw,
  articles: Languages,
  mistakes: NotebookPen,
  exam: ListChecks,
  listen: Headphones,
  music: Music,
};

const FADE_IN = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const CONTENT_LANGUAGES = Object.keys(DEUTSCHDA_PATHS) as DeutschDaLanguage[];

function SectionHeading({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-bold text-white sm:text-4xl" style={{ letterSpacing: "-0.02em" }}>
        {title}
      </h2>
      {description && <p className="mx-auto mt-4 max-w-2xl text-base text-white/60">{description}</p>}
    </div>
  );
}

export function DeutschDaPage() {
  const { language, t } = useLanguage();
  const contentLanguage = deutschDaLanguage(language);
  const content = getDeutschDaContent(language);
  const canonicalPath = DEUTSCHDA_PATHS[contentLanguage];

  // Only the three real content languages form the hreflang cluster.
  const alternates = useMemo(
    () =>
      CONTENT_LANGUAGES.map((lang) => ({
        hrefLang: LANGUAGE_META[lang].hrefLang,
        path: DEUTSCHDA_PATHS[lang],
      })),
    []
  );

  const structuredData = useMemo(
    () => [
      createOrganizationSchema(t("seo.organization.description")),
      createSoftwareApplicationSchema({
        name: "Deutsch da!",
        description: content.seo.description,
        url: canonicalPath,
        applicationCategory: "EducationalApplication",
        sameAs: DEUTSCHDA_APP.url,
      }),
      createBreadcrumbSchema([
        { name: t("nav.home"), path: canonicalPathForLanguage("/", language) },
        { name: t("nav.projects"), path: getPath(language, "projects") },
        { name: content.title, path: canonicalPath },
      ]),
    ],
    [language, t, content, canonicalPath]
  );

  useSEO({
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords.split(",").map((k) => k.trim()).filter(Boolean),
    canonicalPath,
    alternates,
    language,
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      siteName: t("seo.site_name"),
    },
    twitter: {
      title: content.seo.title,
      description: content.seo.description,
    },
    structuredData,
  });

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="page-hero-glow relative overflow-hidden py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={FADE_IN} initial="hidden" animate="visible" custom={0} className="mx-auto max-w-3xl text-center">
            <span className="fures-nav-glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
              <GraduationCap className="h-3.5 w-3.5" />
              {content.badge}
            </span>
            <h1
              lang="de"
              className="fures-gradient-text is-centered mx-auto mb-5 text-4xl font-bold sm:text-5xl lg:text-6xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              {content.title}
            </h1>
            <p className="mb-5 text-xl text-white">{content.tagline}</p>
            <p className="text-base leading-relaxed text-white/60">{content.intro}</p>

            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg" variant="gradient" className="text-sm">
                <a href={DEUTSCHDA_APP.url} target="_blank" rel="noopener noreferrer">
                  {content.ctaOpen}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-sm">
                <Link to={getPath(language, "contact")}>{content.ctaContact}</Link>
              </Button>
            </div>
            <p className="mt-5 text-sm text-white/55">
              {content.addressLabel}:{" "}
              <a
                href={DEUTSCHDA_APP.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-orange-400 underline underline-offset-4 hover:text-orange-300"
              >
                www.deutschda.org
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </p>
          </motion.div>

          {/* Highlights */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.highlights.map((item, index) => (
              <motion.div
                key={item.value}
                variants={FADE_IN}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                custom={index * 0.06}
                className="fures-nav-glass rounded-3xl p-6 text-center"
              >
                <p className="text-2xl font-bold text-white" style={{ letterSpacing: "-0.02em" }}>
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-white/55">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screens */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={content.screensHeading} description={content.screensIntro} />
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-5 lg:grid-cols-4">
            {SCREEN_ORDER.map((id, index) => (
              <motion.figure
                key={id}
                variants={FADE_IN}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={index * 0.06}
                className="text-center"
              >
                <div className="mx-auto max-w-[220px] rounded-[2rem] border border-white/15 bg-black/40 p-1.5 shadow-2xl">
                  <img
                    src={screenUrl(id, contentLanguage)}
                    alt={content.screens[id].alt}
                    width={540}
                    height={1170}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[540/1170] w-full rounded-[1.6rem] object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-white/60">{content.screens[id].caption}</figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={content.featuresHeading} description={content.featuresIntro} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {FEATURE_ORDER.map((featureId, index) => {
              const Icon = FEATURE_ICONS[featureId];
              const item = content.features[featureId];
              return (
                <motion.article
                  key={featureId}
                  variants={FADE_IN}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  custom={(index % 4) * 0.05}
                  className="fures-nav-glass rounded-[2rem] p-7 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span className="liquid-icon mb-5 flex h-11 w-11 items-center justify-center rounded-2xl">
                    <Icon className="h-5 w-5 text-white" />
                  </span>
                  <h3 className="mb-2.5 text-base font-semibold text-white" style={{ letterSpacing: "-0.02em" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/55">{item.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Levels */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={content.levelsHeading} description={content.levelsIntro} />
          <ol className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2 lg:grid-cols-4">
            {content.levels.map((item, index) => (
              <motion.li
                key={item.level}
                variants={FADE_IN}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={index * 0.05}
                className="fures-nav-glass rounded-3xl p-6"
              >
                <p className="text-3xl font-bold text-orange-400" style={{ letterSpacing: "-0.02em" }}>
                  {item.level}
                </p>
                <h3 className="mb-2 mt-1 text-base font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{item.description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Technical architecture */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={content.techHeading} description={content.techIntro} />
          <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {content.tech.map((group, index) => (
              <motion.div
                key={group.title}
                variants={FADE_IN}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={index * 0.05}
                className="fures-nav-glass rounded-3xl p-6"
              >
                <h3 className="mb-4 text-base font-semibold text-white">{group.title}</h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={content.audienceHeading} />
          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
            {content.audiences.map((audience, index) => (
              <motion.div
                key={audience.title}
                variants={FADE_IN}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={index * 0.06}
                className="fures-nav-glass rounded-[2rem] p-8"
              >
                <h3 className="mb-3 text-xl font-bold text-white" style={{ letterSpacing: "-0.02em" }}>
                  {audience.title}
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-white/60">{audience.body}</p>
                <ul className="space-y-3">
                  {audience.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-sm text-white/70">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={content.principlesHeading} />
          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
            {content.principles.map((item, index) => (
              <motion.div
                key={item.title}
                variants={FADE_IN}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={index * 0.05}
                className="fures-nav-glass rounded-3xl p-6"
              >
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-orange-400">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product status */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={content.statusHeading} />
          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
            <div className="fures-nav-glass rounded-[2rem] p-8">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-300">
                <CheckCircle2 className="h-4 w-4" />
                {content.statusLiveLabel}
              </h3>
              <ul className="space-y-2.5">
                {content.statusLive.map((item) => (
                  <li key={item} className="text-sm text-white/65">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="fures-nav-glass rounded-[2rem] p-8">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-orange-400">
                <Rocket className="h-4 w-4" />
                {content.statusNextLabel}
              </h3>
              <ul className="space-y-2.5">
                {content.statusNext.map((item) => (
                  <li key={item} className="text-sm text-white/65">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-5xl text-sm leading-relaxed text-white/45">{content.statusNote}</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pb-24 pt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="liquid-glass relative mx-auto max-w-4xl rounded-[2.5rem] border border-white/15 p-10 text-center sm:p-12">
            <h2
              className="mx-auto mb-5 block w-fit bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-3xl font-bold text-transparent lg:text-4xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              {content.finalHeading}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-base text-white/60">{content.finalBody}</p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg" variant="gradient" className="text-sm">
                <Link to={getPath(language, "contact")}>{content.ctaContact}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-sm">
                <a href={DEUTSCHDA_APP.url} target="_blank" rel="noopener noreferrer">
                  {content.ctaOpen}
                </a>
              </Button>
            </div>
            <Link
              to={getPath(language, "projects")}
              className="mt-8 inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-orange-400"
            >
              <ArrowLeft className="h-4 w-4" />
              {content.backToProjects}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
