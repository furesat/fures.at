import { useLanguage } from "../contexts/LanguageContext";
import { Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function About() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="about-section fures-section">
      {/* Ambient wash (theme-aware, see .fures-section-glow) */}
      <div className="about-bg-layer fures-section-glow" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-6"
        >
          <div className="liquid-icon flex h-16 w-16 items-center justify-center rounded-full">
            <Lightbulb className="h-7 w-7 text-white" />
          </div>
          <h2 className="about-hero-title text-3xl font-bold text-white sm:text-4xl lg:text-5xl" style={{ letterSpacing: "-0.02em" }}>
            {t('why_fures.title')}
          </h2>
          <p className="about-hero-description max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
            {t('why_fures.description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.8, 0.35, 1] }}
          className="fures-card relative mt-12 h-[60vh] w-full overflow-hidden rounded-[2.5rem]"
        >
          <iframe
            src="https://player.vimeo.com/video/1054772121?autoplay=1&loop=1&autopause=0&muted=1&playsinline=1&background=1&controls=0"
            className="absolute inset-0 h-full w-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="About Fures Tech"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/65 via-black/10 to-transparent"></div>
        </motion.div>
      </div>
    </section>
  );
}
