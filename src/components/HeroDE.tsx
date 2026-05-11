import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { MapPin, TrendingUp, Hotel, ArrowRight } from "lucide-react";
import { ClothCanvas } from "./ClothCanvas";

const ROTATING_WORDS = [
  "Direktbuchungen",
  "Sichtbarkeit",
  "Gästeerlebnisse",
  "Umsatz",
];

const FADE_IN = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const STATS = [
  {
    icon: Hotel,
    value: "50+",
    label: "DACH Hotels betreut",
  },
  {
    icon: TrendingUp,
    value: "Ø +34 %",
    label: "mehr Direktbuchungen",
  },
  {
    icon: MapPin,
    value: "8+",
    label: "Jahre Erfahrung",
  },
];

export function HeroDE() {
  const { t } = useLanguage();
  const theme = useTheme();
  const isLight = theme === "light";
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        setVisible(true);
      }, 320);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
      style={{ background: isLight ? "#f5f5f7" : "#000" }}
    >
      {/* Three.js silk cloth background */}
      <ClothCanvas />

      {/* Advanced liquid glass atmosphere — ClothCanvas background stays untouched below this layer. */}
      <div
        className="liquid-ambient-layer absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: isLight
            ? "linear-gradient(90deg, rgba(245,245,247,0.76) 0%, rgba(245,245,247,0.48) 30%, rgba(245,245,247,0.10) 62%, rgba(245,245,247,0) 78%), linear-gradient(180deg, rgba(245,245,247,0.44) 0%, rgba(245,245,247,0) 30%, rgba(245,245,247,0) 70%, rgba(245,245,247,0.56) 100%)"
            : "linear-gradient(90deg, rgba(3,7,18,0.86) 0%, rgba(5,10,24,0.58) 30%, rgba(8,16,34,0.14) 62%, rgba(5,5,5,0) 78%), linear-gradient(180deg, rgba(5,10,24,0.44) 0%, rgba(5,10,24,0) 30%, rgba(5,10,24,0) 70%, rgba(3,7,18,0.58) 100%)",
        }}
      >
        <span className="liquid-wave liquid-wave-one" />
        <span className="liquid-wave liquid-wave-two" />
        <span className="liquid-prism liquid-prism-one" />
        <span className="liquid-prism liquid-prism-two" />
      </div>

      <div className="liquid-hero-shell relative z-[5] max-w-5xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <div className="liquid-hero-orb liquid-hero-orb-left" aria-hidden="true" />
        <div className="liquid-hero-orb liquid-hero-orb-right" aria-hidden="true" />
        {/* Trust badge */}
        <motion.div
          variants={FADE_IN}
          initial="hidden"
          animate="visible"
          custom={0}
          className="liquid-glass-badge inline-flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 mb-8 rounded-full text-orange-300 text-sm font-medium"
        >
          <span className="flex items-center gap-1.5"><span>🏨</span> Hotel-Website</span>
          <span className="text-white/20">·</span>
          <span className="flex items-center gap-1.5"><span>📍</span> Local SEO</span>
          <span className="text-white/20">·</span>
          <span className="flex items-center gap-1.5"><span>🤖</span> Gäste-Automatisierung</span>
          <span className="text-white/20">·</span>
          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Österreich · Deutschland · Schweiz</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={FADE_IN}
          initial="hidden"
          animate="visible"
          custom={0.08}
          className="liquid-hero-title text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
          style={{ letterSpacing: "-0.03em" }}
        >
          Mehr{" "}
          <span
            className="inline-block transition-all duration-300 text-orange-400"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(6px)",
            }}
          >
            {ROTATING_WORDS[wordIndex]}
          </span>{" "}
          <br className="hidden sm:block" />
          für Ihr Hotel
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={FADE_IN}
          initial="hidden"
          animate="visible"
          custom={0.16}
          className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-10 liquid-hero-copy"
        >
          Professionelle Digitalstrategien für Hotels im DACH-Raum — von der
          Website über SEO bis zur Social-Media-Betreuung. Alles aus einer Hand.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={FADE_IN}
          initial="hidden"
          animate="visible"
          custom={0.22}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            to="/de/leistungen"
            className="liquid-cta-shell inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full transition-all duration-200 hover:-translate-y-px active:translate-y-0"
            style={{
              background: "linear-gradient(90deg, #6ee7e0 0%, #c4e870 50%, #f4d35e 100%)",
              color: "#0a0a0a",
              boxShadow: "0 8px 32px rgba(110,231,224,0.15)",
            }}
          >
            Leistungen entdecken
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/de/kontakt"
            className="liquid-cta-shell inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full transition-all duration-200 hover:-translate-y-px active:translate-y-0"
            style={{
              background: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)",
              border: isLight ? "1px solid rgba(0,0,0,0.10)" : "1px solid rgba(255,255,255,0.12)",
              color: isLight ? "#1d1d1f" : "#ffffff",
            }}
          >
            Jetzt Beratung anfragen
          </Link>
        </motion.div>

        {/* Trust stats */}
        <motion.div
          variants={FADE_IN}
          initial="hidden"
          animate="visible"
          custom={0.32}
          className="mt-20 w-full grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.38 + i * 0.08 }}
                className="liquid-depth-card fures-nav-glass flex flex-col items-center gap-3 p-6 rounded-3xl"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-orange-500/20 border border-orange-400/20">
                  <Icon className="w-5 h-5 text-orange-400" />
                </div>
                <p className="text-2xl font-bold text-white" style={{ letterSpacing: "-0.02em" }}>
                  {stat.value}
                </p>
                <p className="text-sm text-white/55 text-center">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
