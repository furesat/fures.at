import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ClothCanvas } from "./ClothCanvas";

const FALLBACK_ROTATING_TEXTS = [
  "Dijital Ajans",
  "Akıllı Sistem",
  "Yaratıcı Otomasyon",
  "Fures Tech",
];

export function Hero() {
  const { t, language } = useLanguage();
  const theme = useTheme();
  const isLight = theme === "light";
  const [textIndex, setTextIndex] = useState(0);

  const rotatingTexts = useMemo(() => {
    const raw = t("hero.rotating");
    const items = raw
      .split("|")
      .map((item) => item.trim())
      .filter(Boolean);

    if (raw === "hero.rotating" || items.length === 0) {
      return FALLBACK_ROTATING_TEXTS;
    }

    return items;
  }, [t, language]);

  useEffect(() => {
    if (rotatingTexts.length <= 1) {
      setTextIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [rotatingTexts]);

  useEffect(() => {
    setTextIndex(0);
  }, [rotatingTexts]);

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-x-hidden overflow-y-visible pt-16"
      style={{ background: isLight ? "#f5f5f7" : "#000" }}
    >
      {/* Three.js silk cloth background — preserved untouched */}
      <ClothCanvas />

      {/* Liquid atmosphere — slow drifting light waves over the curtain */}
      <div className="liquid-atmosphere" style={{ zIndex: 1.5 as unknown as number, mixBlendMode: "screen" }}>
        <div className="liquid-wave liquid-wave-a" />
        <div className="liquid-wave liquid-wave-b" />
        <div className="liquid-wave liquid-wave-c" />
      </div>

      {/* Gradient overlay — readable text area, edges softened */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: isLight
            ? "linear-gradient(90deg, rgba(245,245,247,0.82) 0%, rgba(245,245,247,0.55) 25%, rgba(245,245,247,0.15) 50%, rgba(245,245,247,0) 65%), linear-gradient(180deg, rgba(245,245,247,0.5) 0%, rgba(245,245,247,0) 30%, rgba(245,245,247,0) 70%, rgba(245,245,247,0.6) 100%)"
            : "linear-gradient(90deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.7) 25%, rgba(5,5,5,0.2) 50%, rgba(5,5,5,0) 65%), linear-gradient(180deg, rgba(5,5,5,0.5) 0%, rgba(5,5,5,0) 30%, rgba(5,5,5,0) 70%, rgba(5,5,5,0.6) 100%)",
        }}
      />

      {/* Soft glowing liquid glass orb — cinematic centerpiece behind text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[3] pointer-events-none"
        style={{ filter: "saturate(1.1)" }}
      >
        <div className="liquid-orb w-[460px] h-[460px] sm:w-[560px] sm:h-[560px] lg:w-[720px] lg:h-[720px]" />
      </motion.div>

      {/* Ambient glow orbs - subtle, Apple-like */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        <div
          className="absolute top-20 left-10 w-[500px] h-[500px] rounded-full animate-glow-pulse blur-3xl"
          style={{ background: isLight ? "rgba(255, 170, 110, 0.18)" : "rgba(249, 115, 22, 0.12)" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full animate-glow-pulse blur-3xl"
          style={{
            animationDelay: "2s",
            background: isLight ? "rgba(170, 150, 255, 0.18)" : "rgba(147, 51, 234, 0.12)",
          }}
        ></div>

        {/* Floating particles - smaller range, gentler */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full"
          style={{ background: isLight ? "rgba(255, 140, 70, 0.55)" : "rgba(251, 146, 60, 0.4)" }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full"
          style={{ background: isLight ? "rgba(150, 130, 240, 0.5)" : "rgba(192, 132, 252, 0.35)" }}
          animate={{
            y: [0, 16, 0],
            opacity: [0.25, 0.6, 0.25]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 rounded-full"
          style={{ background: isLight ? "rgba(255, 165, 100, 0.45)" : "rgba(253, 186, 116, 0.3)" }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.65, 0.3]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="relative z-[5] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge - fades in softly */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/12 mb-8 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-400/90" />
            <span className="text-xs font-medium tracking-wide text-white/70">{t('hero.badge')}</span>
          </motion.div>

          {/* Rotating Title */}
          <motion.h1
            key={textIndex}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl lg:text-8xl mb-6 tracking-tight"
          >
            <span className="block text-white font-bold" style={{ letterSpacing: '-0.03em' }}>
              {rotatingTexts[textIndex]}
            </span>
            <span className="block mt-2 text-orange-400 font-bold" style={{ letterSpacing: '-0.03em' }}>
              {t('hero.subtitle')}
            </span>
          </motion.h1>

          {/* AI Powered */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl sm:text-2xl lg:text-3xl text-white/75 mb-8 font-light tracking-tight"
          >
            {t('hero.ai_powered')}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-white/55 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          {/* CTAs - Apple-style subtle spring */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <Link to="/hizmetler">
              <motion.div
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <Button
                  size="lg"
                  variant="gradient"
                  className="group"
                >
                  {t('hero.cta_discover')}
                  <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </Button>
              </motion.div>
            </Link>

            <Link to="/iletisim">
              <motion.div
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <Button
                  size="lg"
                  variant="outline"
                >
                  {t('hero.secondary_cta')}
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - refined */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-[5]"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border border-white/15 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-0.5 h-1.5 bg-white/40 rounded-full"></div>
        </motion.div>
      </motion.div>
    </section>
  );
}
