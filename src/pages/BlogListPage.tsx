import { useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { DateTime } from "luxon";
import { LANGUAGE_META, useLanguage } from "../contexts/LanguageContext";
import { getPostsByLanguage } from "../utils/blog";
import { renderMarkdown } from "../utils/markdown";
import { getPath } from "../utils/routes";
import { buildLanguageAlternates, useSEO } from "../hooks/useSEO";

function formatDate(dateIso: string, language: keyof typeof LANGUAGE_META) {
  const locale = LANGUAGE_META[language].locale.replace("_", "-");
  const parsed = DateTime.fromISO(dateIso, { zone: "utc" });

  if (!parsed.isValid) {
    return dateIso;
  }

  return parsed.setLocale(locale).toLocaleString(DateTime.DATE_FULL);
}

export function BlogListPage() {
  const { language, t } = useLanguage();
  const posts = getPostsByLanguage(language);
  const renderedPosts = useMemo(
    () => posts.map((post) => ({ ...post, html: renderMarkdown(post.content) })),
    [posts],
  );
  const handleImageError = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    const fallbackSrc = "/blog_images/default.png";

    if (event.currentTarget.src.endsWith(fallbackSrc)) {
      return;
    }

    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackSrc;
  }, []);

  // Without this the blog inherited the static shell metadata from index.html,
  // so every locale's blog list canonicalised to the German homepage.
  const canonicalPath = getPath(language, "blog");

  useSEO({
    title: `${t("blog.title")} | ${t("seo.site_name")}`,
    description: t("blog.subtitle"),
    canonicalPath,
    alternates: buildLanguageAlternates(canonicalPath),
    language,
    openGraph: {
      title: t("blog.title"),
      description: t("blog.subtitle"),
      siteName: t("seo.site_name"),
    },
    twitter: {
      title: t("blog.title"),
      description: t("blog.subtitle"),
    },
  });

  return (
    <section className="fures-section min-h-screen text-white">
      <div className="page-hero-glow absolute inset-0 -z-10" />
      <div className="container relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="mb-14 text-center">
          <span className="fures-card inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
            {t("nav.blog")}
          </span>
          <h1
            className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            {t("blog.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/60">
            {t("blog.subtitle")}
          </p>
        </header>

        {renderedPosts.length === 0 ? (
          <div className="fures-card rounded-[2rem] p-12 text-center text-white/60">
            {t("blog.no_posts")}
          </div>
        ) : (
          <div className="space-y-10">
            {renderedPosts.map((post) => (
              <article
                key={post.slug}
                className="fures-card group overflow-hidden rounded-[2rem] p-8 hover:-translate-y-0.5 sm:p-10"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
                  <span>{formatDate(post.date, language)}</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.7rem] tracking-[0.2em] text-white/60">
                    {post.lang.toUpperCase()}
                  </span>
                </div>

                <div className="mt-6 flex flex-col gap-6">
                  <h2 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-orange-400 sm:text-3xl" style={{ letterSpacing: "-0.02em" }}>
                    <Link to={`${canonicalPath}/${post.slug}`}>{post.title}</Link>
                  </h2>

                  {post.image && (
                    <Link to={`${canonicalPath}/${post.slug}`} className="block overflow-hidden rounded-3xl">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-auto w-full rounded-[1.5rem] border border-white/10 object-cover object-center transition-transform duration-500 group-hover:scale-[1.01]"
                        loading="lazy"
                        onError={handleImageError}
                      />
                    </Link>
                  )}

                  <div className="space-y-5">
                    {post.excerpt && (
                      <p className="text-base leading-7 text-white/65">{post.excerpt}</p>
                    )}

                    <div
                      className="blog-content"
                      dangerouslySetInnerHTML={{ __html: post.html }}
                    />
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                  <Link
                    to={`${canonicalPath}/${post.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-white transition-colors duration-300 hover:border-orange-400/60 hover:text-orange-400"
                  >
                    {t("blog.read_more")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <span className="text-xs uppercase tracking-[0.2em] text-white/35">
                    {canonicalPath}/{post.slug}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
