import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Services } from "../components/Services";
import { ServicePackages } from "../components/ServicePackages";
import { useLanguage } from "../contexts/LanguageContext";
import {
  useSEO,
  buildLanguageAlternates,
  canonicalPathForLanguage,
  createBreadcrumbSchema,
  createOrganizationSchema,
  createServiceItemList
} from "../hooks/useSEO";

export function ServicesPage() {
  const { language, t } = useLanguage();
  const location = useLocation();

  const canonicalPath = useMemo(
    () => canonicalPathForLanguage(location.pathname, language),
    [location.pathname, language]
  );

  const alternates = useMemo(
    () => buildLanguageAlternates(location.pathname),
    [location.pathname]
  );

  const keywords = useMemo(
    () =>
      `${t("seo.common.keywords")}, ${t("seo.services.keywords")}`
        .split(",")
        .map((keyword) => keyword.trim())
        .filter((keyword) => keyword.length > 0),
    [language, t]
  );

  const serviceItems = useMemo(
    // Mirrors the six services rendered by <Services />. Older keys
    // (web_design, ai_automation, data_analytics, …) no longer exist in the
    // translation catalog and leaked raw key names into the JSON-LD output.
    () => [
      { name: t("services.seo"), description: t("services.seo_desc") },
      { name: t("services.local_seo"), description: t("services.local_seo_desc") },
      { name: t("services.social_media"), description: t("services.social_media_desc") },
      { name: t("services.hotel_web"), description: t("services.hotel_web_desc") },
      { name: t("services.hotel_pms"), description: t("services.hotel_pms_desc") },
      { name: t("services.guest_automation"), description: t("services.guest_automation_desc") }
    ],
    [language, t]
  );

  const structuredData = useMemo(
    () => [
      createOrganizationSchema(t("seo.organization.description")),
      createServiceItemList(t("seo.services.title"), t("seo.services.description"), serviceItems),
      createBreadcrumbSchema([
        { name: t("nav.home"), path: canonicalPathForLanguage("/", language) },
        { name: t("nav.services"), path: canonicalPath }
      ])
    ],
    [language, t, canonicalPath, serviceItems]
  );

  useSEO({
    title: t("seo.services.title"),
    description: t("seo.services.description"),
    keywords,
    canonicalPath,
    alternates,
    language,
    openGraph: {
      title: t("seo.services.title"),
      description: t("seo.services.description"),
      siteName: t("seo.site_name")
    },
    twitter: {
      title: t("seo.services.title"),
      description: t("seo.services.description")
    },
    structuredData
  });

  return (
    <div className="pt-16">
      <Services />
      <ServicePackages />
    </div>
  );
}
