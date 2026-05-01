import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
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
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden pt-16">
      {/* Three.js silk cloth background */}
      <ClothCanvas />

      {/* Gradient overlay — left readable, edges darkened */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(90deg, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.6) 30%, rgba(5,5,5,0.15) 60%, rgba(5,5,5,0) 75%), linear-gradient(180deg, rgba(5,5,5,0.45) 0%, rgba(5,5,5,0) 30%, rgba(5,5,5,0) 70%, rgba(5,5,5,0.55) 100%)",
        }}
      />

      <div className="relative z-[5] max-w-5xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        {/* Trust badge */}
        <motion.div
          variants={FADE_IN}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 mb-8 rounded-full bg-white/5 border border-white/12 text-orange-300 text-sm font-medium backdrop-blur-sm"
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
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
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
          className="text-lg sm:text-xl text-white/65 max-w-2xl mx-auto leading-relaxed mb-10"
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
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full transition-all duration-200 hover:-translate-y-px active:translate-y-0"
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
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all duration-200 hover:-translate-y-px active:translate-y-0"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
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
                className="fures-nav-glass flex flex-col items-center gap-3 p-6 rounded-3xl"
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
