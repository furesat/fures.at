import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { Phone, MapPin } from "lucide-react";
import { MEINHOTEL_APP, MEINHOTEL_PATHS, getMeinHotelContent } from "../data/meinhotel";

export function FooterDE() {
  const { t } = useLanguage();
  const meinHotel = getMeinHotelContent("de");

  const navLinks = [
    { label: t("nav.services"), href: "/de/leistungen" },
    { label: "MeinHotel PMS", href: MEINHOTEL_PATHS.de },
    { label: t("nav.contact"), href: "/de/kontakt" },
    { label: t("footer.privacy"), href: "/de/datenschutz" },
    { label: "Cookie-Richtlinie", href: "/de/cookies" },
  ];

  return (
    <footer className="bg-[#0f0f0f] text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
          {/* Brand column */}
          <div className="flex flex-col gap-4 max-w-xs">
            <Link to="/de" aria-label="Fures Tech — Startseite">
              <img
                src="/images/fures.png"
                alt="Fures Tech"
                className="h-9 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-200"
              />
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Digitalagentur für Hotels im DACH-Raum. Webdesign, SEO und Social
              Media aus Salzburgerland.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-2 mt-2">
              <a
                href="tel:+4366499735268"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-orange-400 transition-colors duration-200"
              >
                <Phone className="w-4 h-4 shrink-0 text-orange-500/70" />
                +43 664 99735268
              </a>
              <span className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4 shrink-0 text-orange-500/70" />
                Maria Alm, Salzburgerland, Österreich
              </span>
            </div>
          </div>

          {/* Navigation links */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-1">
              Navigation
            </p>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-gray-500 hover:text-orange-400 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={MEINHOTEL_APP.loginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 transition-colors duration-200 hover:text-orange-400"
            >
              {meinHotel.ctaLogin} ↗
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>
            © {new Date().getFullYear()} Fures Tech — Maria Alm, Salzburgerland
            &nbsp;|&nbsp;
            <a
              href="https://fures.tech"
              className="hover:text-orange-400 transition-colors duration-200"
            >
              fures.tech
            </a>
          </p>
          <p
            className="text-center sm:text-left leading-relaxed"
            style={{ color: "#DC0000", fontFamily: '"Inter", system-ui, sans-serif', fontSize: "13.5px" }}
          >
            Fures Tech ist ein Projekt von&nbsp;
            <a
              href="https://tourismusverband.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline-offset-2 hover:underline"
              style={{ color: "inherit" }}
            >
              Tourismus Förder Verband
            </a>.
          </p>
          <div className="flex gap-5">
            <Link
              to="/de/datenschutz"
              className="hover:text-orange-400 transition-colors duration-200"
            >
              Datenschutz
            </Link>
            <Link
              to="/de/cookies"
              className="hover:text-orange-400 transition-colors duration-200"
            >
              Cookie-Richtlinie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
