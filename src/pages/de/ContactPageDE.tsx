import { useMemo } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useSEO } from "../../hooks/useSEO";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";

const CARD_FADE = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

export function ContactPageDE() {
  const { t, language } = useLanguage();

  const structuredData = useMemo(
    () => [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": "https://fures.at/de/kontakt#webpage",
        name: t("seo.contact.title"),
        description: t("seo.contact.description"),
        url: "https://fures.at/de/kontakt",
        inLanguage: "de-AT",
      },
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://fures.at/de#localbusiness",
        name: "Fures Tech",
        description: t("seo.organization.description"),
        url: "https://fures.at/de",
        telephone: "+4366499735268",
        email: "info@fures.at",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Maria Alm",
          addressLocality: "Maria Alm",
          addressRegion: "Salzburg",
          postalCode: "5761",
          addressCountry: "AT",
        },
        areaServed: ["AT", "DE", "CH"],
      },
    ],
    [language, t]
  );

  useSEO({
    title: t("seo.contact.title"),
    description: t("seo.contact.description"),
    canonicalPath: "/de/kontakt",
    language: "de",
    alternates: [
      { hrefLang: "de-AT", path: "/de/kontakt" },
      { hrefLang: "tr", path: "/tr/iletisim" },
      { hrefLang: "x-default", path: "/de/kontakt" },
    ],
    openGraph: {
      title: t("seo.contact.title"),
      description: t("seo.contact.description"),
      siteName: t("seo.site_name"),
    },
    structuredData,
  });

  const contactItems = [
    {
      href: "mailto:info@fures.at",
      icon: Mail,
      label: t("contact.email"),
      value: "info@fures.at",
      color: "orange",
    },
    {
      href: "tel:+4366499735268",
      icon: Phone,
      label: t("contact.phone"),
      value: "+43 664 99735268",
      color: "orange",
    },
    {
      href: null,
      icon: MapPin,
      label: t("contact.headquarters"),
      value: t("contact.headquarters_location"),
      sub: "Maria Alm, Salzburgerland, Österreich",
      color: "purple",
    },
    {
      href: "https://calendly.com/fures",
      icon: Calendar,
      label: t("contact.schedule_meeting"),
      value: "Termin buchen",
      color: "orange",
      external: true,
    },
  ];

  return (
    <div className="pt-24 min-h-screen bg-black relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-orange-500/8 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-600/8 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            {t("contact.title")}
          </span>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            {t("contact.subtitle")}
          </h1>
          <p className="text-lg text-white/55 max-w-2xl mx-auto">
            {t("contact.description")}
          </p>
        </motion.div>

        {/* Contact cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {contactItems.map((item, i) => {
            const Icon = item.icon;
            const iconBg =
              item.color === "purple"
                ? "bg-purple-500/15 border-purple-400/20"
                : "bg-orange-500/15 border-orange-400/20";
            const iconColor =
              item.color === "purple" ? "text-purple-400" : "text-orange-400";

            const inner = (
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${iconBg}`}
                >
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white/35 uppercase tracking-wider mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-white font-medium">{item.value}</p>
                  {item.sub && (
                    <p className="text-sm text-white/45 mt-0.5">{item.sub}</p>
                  )}
                </div>
              </div>
            );

            const cardClass =
              "fures-nav-glass group block rounded-3xl p-7 transition-all duration-300 hover:-translate-y-0.5";

            return item.href ? (
              <motion.a
                key={i}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                variants={CARD_FADE}
                initial="hidden"
                animate="visible"
                custom={i * 0.07}
                className={cardClass}
              >
                {inner}
              </motion.a>
            ) : (
              <motion.div
                key={i}
                variants={CARD_FADE}
                initial="hidden"
                animate="visible"
                custom={i * 0.07}
                className={cardClass}
              >
                {inner}
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.34 }}
          className="text-center"
        >
          <a href="mailto:info@fures.at">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="fures-cta-pill inline-flex items-center gap-2 px-8 py-4 text-base"
            >
              <Mail className="w-5 h-5" />
              {t("contact.send_message")}
            </motion.button>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
