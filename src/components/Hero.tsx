import { Link } from "react-router-dom";
import { useState, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const FALLBACK_ROTATING_TEXTS = [
  "Dijital Ajans",
  "Akıllı Sistem",
  "Yaratıcı Otomasyon",
  "Fures Tech",
];

export function Hero() {
  const { t, language } = useLanguage();
  const [textIndex, setTextIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    const geometry = new THREE.PlaneGeometry(16, 10, 140, 90);
    const material = new THREE.MeshStandardMaterial({ color: "#1b0f13", roughness: 0.35, metalness: 0.08 });
    const cloth = new THREE.Mesh(geometry, material);
    scene.add(cloth);
    const l1 = new THREE.DirectionalLight("#6e9fff", 2.3); l1.position.set(-2, 2, 3);
    const l2 = new THREE.DirectionalLight("#ff7a4d", 2.1); l2.position.set(2, -1, 2);
    scene.add(l1, l2);
    scene.add(new THREE.AmbientLight("#120d12", 0.65));

    const clock = new THREE.Clock();
    const mouse = new THREE.Vector2(0, 0);
    let mx = 0, my = 0, intro = 0;

    const onMove = (e: MouseEvent) => { mx = (e.clientX / window.innerWidth) * 2 - 1; my = -((e.clientY / window.innerHeight) * 2 - 1); };
    window.addEventListener("mousemove", onMove);

    const pos = geometry.attributes.position;
    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      const vh = 2 * Math.tan((camera.fov * Math.PI / 180) / 2) * camera.position.z;
      const vw = vh * camera.aspect;
      const s = Math.max((vw * 1.05) / 16, (vh * 1.1) / 10);
      cloth.scale.set(s, s, 1);
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      const t = clock.getElapsedTime();
      mouse.x += (mx - mouse.x) * 0.05;
      mouse.y += (my - mouse.y) * 0.05;
      intro += (1 - intro) * 0.011;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i); const y = pos.getY(i); const u = (x + 8) / 16; const v = (y + 5) / 10;
        const edge = Math.min(Math.max((u - 0.0) / 0.85, 0), 1);
        const disp = (Math.sin(u * 2.4 - t * 0.55) * 0.55 + Math.sin(u * 3.6 + v * 1.7 + t * 0.75) * 0.32 + Math.cos(v * 2.3 + u * 1.4 + t * 0.4) * 0.22) * edge;
        const d = Math.hypot(u - (mouse.x * 0.5 + 0.5), v - (-mouse.y * 0.5 + 0.5));
        const pull = Math.exp(-d * d * 5.0) * edge * 0.55;
        pos.setZ(i, (disp + pull) * intro);
      }
      pos.needsUpdate = true; geometry.computeVertexNormals();
      renderer.render(scene, camera); requestAnimationFrame(tick);
    };
    tick();

    return () => { window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMove); geometry.dispose(); material.dispose(); renderer.dispose(); };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-16">
      <canvas ref={canvasRef} id="cloth-canvas" className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-black/60 [background:linear-gradient(90deg,rgba(5,5,5,0.92)_0%,rgba(5,5,5,0.7)_25%,rgba(5,5,5,0.2)_50%,rgba(5,5,5,0)_65%),linear-gradient(180deg,rgba(5,5,5,0.5)_0%,rgba(5,5,5,0)_30%,rgba(5,5,5,0)_70%,rgba(5,5,5,0.6)_100%)]" />

      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-orange-500/12 rounded-full animate-glow-pulse blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-600/12 rounded-full animate-glow-pulse blur-3xl" style={{ animationDelay: '2s' }}></div>

        {/* Floating particles - smaller range, gentler */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-orange-400/40 rounded-full"
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
          className="absolute top-1/3 right-1/3 w-2 h-2 bg-purple-400/35 rounded-full"
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
          className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-orange-300/30 rounded-full"
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
            <span className="block mt-2 bg-gradient-to-r from-orange-400 via-rose-400 to-purple-500 bg-clip-text text-transparent font-bold" style={{ letterSpacing: '-0.03em' }}>
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
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
