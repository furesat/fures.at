import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { LegalDocument, type LegalDocumentContent } from "../components/LegalDocument";
import { useLanguage, type Language } from "../contexts/LanguageContext";
import {
  useSEO,
  buildLanguageAlternates,
  canonicalPathForLanguage,
  createBreadcrumbSchema,
  createOrganizationSchema
} from "../hooks/useSEO";

/**
 * Impressum / legal notice. Operator name and e-mail were supplied by the owner;
 * phone and location are the ones already published in the site footer.
 * A full postal address is still missing (to verify) — never invent one.
 */
const OPERATOR = {
  name: "Furkan Yonat",
  email: "office@fures.tech",
  phone: "+43 664 99735268",
};

const IMPRESSUM_DOCUMENT: Record<Language, LegalDocumentContent> = {
  de: {
    title: "Impressum",
    updatedOn: "Stand: Oktober 2026",
    intro: ["Angaben zum Betreiber dieser Website (fures.tech / fures.at)."],
    sections: [
      {
        id: "operator",
        heading: "Medieninhaber und verantwortlich für den Inhalt",
        body: [OPERATOR.name, "Maria Alm, Salzburgerland, Österreich"],
      },
      {
        id: "contact",
        heading: "Kontakt",
        body: [`E-Mail: ${OPERATOR.email}`, `Telefon: ${OPERATOR.phone}`],
      },
      {
        id: "project",
        heading: "Projekt",
        body: ["Fures Tech ist ein Projekt von Tourismus Förder Verband (https://tourismusverband.net/)."],
      },
      {
        id: "links",
        heading: "Haftung für Links",
        body: ["Für die Inhalte verlinkter externer Seiten sind ausschließlich deren Betreiber verantwortlich."],
      },
    ],
  },
  tr: {
    title: "Künye (Impressum)",
    updatedOn: "Güncelleme: Ekim 2026",
    intro: ["Bu web sitesinin (fures.tech / fures.at) işletmecisine ait bilgiler."],
    sections: [
      { id: "operator", heading: "Site sahibi ve içerikten sorumlu", body: [OPERATOR.name, "Maria Alm, Salzburgerland, Avusturya"] },
      { id: "contact", heading: "İletişim", body: [`E-posta: ${OPERATOR.email}`, `Telefon: ${OPERATOR.phone}`] },
      { id: "project", heading: "Proje", body: ["Fures Tech, Tourismus Förder Verband'ın bir projesidir (https://tourismusverband.net/)."] },
      { id: "links", heading: "Bağlantılar", body: ["Bağlantı verilen dış sitelerin içeriğinden yalnızca o sitelerin sahipleri sorumludur."] },
    ],
  },
  en: {
    title: "Legal notice (Impressum)",
    updatedOn: "Last updated: October 2026",
    intro: ["Information about the operator of this website (fures.tech / fures.at)."],
    sections: [
      { id: "operator", heading: "Owner and responsible for the content", body: [OPERATOR.name, "Maria Alm, Salzburgerland, Austria"] },
      { id: "contact", heading: "Contact", body: [`Email: ${OPERATOR.email}`, `Phone: ${OPERATOR.phone}`] },
      { id: "project", heading: "Project", body: ["Fures Tech is a project of Tourismus Förder Verband (https://tourismusverband.net/)."] },
      { id: "links", heading: "External links", body: ["The operators of linked external sites are solely responsible for their content."] },
    ],
  },
  ru: {
    title: "Выходные данные (Impressum)",
    updatedOn: "Обновлено: октябрь 2026",
    intro: ["Сведения о владельце этого сайта (fures.tech / fures.at)."],
    sections: [
      { id: "operator", heading: "Владелец и ответственный за содержание", body: [OPERATOR.name, "Maria Alm, Salzburgerland, Австрия"] },
      { id: "contact", heading: "Контакты", body: [`E-mail: ${OPERATOR.email}`, `Телефон: ${OPERATOR.phone}`] },
      { id: "project", heading: "Проект", body: ["Fures Tech — проект Tourismus Förder Verband (https://tourismusverband.net/)."] },
      { id: "links", heading: "Внешние ссылки", body: ["За содержание внешних сайтов отвечают исключительно их владельцы."] },
    ],
  },
};

export function ImpressumPage() {
  const { language, t } = useLanguage();
  const location = useLocation();
  const content = IMPRESSUM_DOCUMENT[language];

  const canonicalPath = useMemo(
    () => canonicalPathForLanguage(location.pathname, language),
    [location.pathname, language]
  );
  const alternates = useMemo(() => buildLanguageAlternates(location.pathname), [location.pathname]);

  const title = `${content.title} | Fures Tech`;
  const description = content.intro[0];

  const structuredData = useMemo(
    () => [
      createOrganizationSchema(t("seo.organization.description")),
      createBreadcrumbSchema([
        { name: t("nav.home"), path: canonicalPathForLanguage("/", language) },
        { name: content.title, path: canonicalPath }
      ])
    ],
    [language, t, canonicalPath, content.title]
  );

  useSEO({
    title,
    description,
    canonicalPath,
    alternates,
    language,
    openGraph: { title, description, siteName: t("seo.site_name") },
    twitter: { title, description },
    structuredData
  });

  return <LegalDocument content={content} />;
}
