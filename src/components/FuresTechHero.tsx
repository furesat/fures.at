import React, { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Text, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";

function Icon({ type, className = "h-5 w-5" }: { type: "zap" | "wind" | "arrow" | "grid"; className?: string }) {
  const common = {
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };

  const paths = {
    zap: <path d="M13 2L3 14h8l-1 8 11-14h-8l1-6z" />,
    wind: <><path d="M3 8h11a3 3 0 1 0-3-3" /><path d="M3 12h15a3 3 0 1 1-3 3" /><path d="M3 16h8" /></>,
    arrow: <><path d="M5 12h14" /><path d="M13 5l7 7-7 7" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>,
  };

  return <svg {...common}>{paths[type]}</svg>;
}

function KineticHeroSurface({ pulseKey }: { pulseKey: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const pulse = useRef(0);

  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(11, 4.8, 220, 96);
    g.rotateX(-Math.PI * 0.34);
    return g;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (pulse.current > 0.002) pulse.current *= 0.94;
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const anchor = Math.max(0.16, Math.min(1, (x + 5.5) / 11));
      const wind = Math.sin(x * 1.55 + t * 1.65) * 0.34;
      const ribbon = Math.sin((x + y * 0.72) * 4.6 + t * 2.55) * 0.13;
      const micro = Math.sin(x * 9.2 - y * 4.2 + t * 3.8) * 0.035;
      const pressure = Math.sin((x + 5.5) * 2.7 - t * 7.5) * pulse.current * 0.55;
      pos.setZ(i, (wind + ribbon + micro + pressure) * anchor);
    }
    pos.needsUpdate = true;
    geometry.computeVertexNormals();
    if (mesh.current) {
      mesh.current.rotation.z = Math.sin(t * 0.25) * 0.035;
      mesh.current.position.y = Math.sin(t * 0.45) * 0.055;
    }
    if (mat.current) mat.current.roughness = 0.21 + Math.sin(t * 0.25) * 0.03;
  });

  React.useEffect(() => {
    pulse.current = 1.2;
  }, [pulseKey]);

  return (
    <group position={[1.15, -0.62, -0.15]} rotation={[0, -0.18, -0.035]}>
      <mesh ref={mesh} geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial ref={mat} color="#061011" roughness={0.22} metalness={0.32} side={THREE.DoubleSide} envMapIntensity={2.1} />
      </mesh>
      <Float speed={1.2} rotationIntensity={0.04} floatIntensity={0.05}>
        <Text position={[-1.45, -0.02, 0.83]} rotation={[-Math.PI * 0.34, 0, -0.028]} fontSize={0.68} letterSpacing={-0.055} anchorX="center" anchorY="middle" color="#effffb">FURES</Text>
      </Float>
    </group>
  );
}

function HeroCanvas({ pulseKey }: { pulseKey: number }) {
  return <Canvas shadows camera={{ position: [0.1, 2.9, 7.2], fov: 41 }} dpr={[1, 2]}>
    <color attach="background" args={["#020506"]} /><fog attach="fog" args={["#020506", 7, 15]} />
    <ambientLight intensity={0.7} /><directionalLight position={[3, 5, 4]} intensity={2.3} castShadow />
    <pointLight position={[-3.7, 1.2, 2.4]} intensity={4.9} color="#2df7d0" />
    <pointLight position={[4.5, 2.2, -1.5]} intensity={3.4} color="#ffd15a" />
    <Environment preset="city" />
    <KineticHeroSurface pulseKey={pulseKey} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.45, 0]} receiveShadow>
      <planeGeometry args={[22, 22]} /><meshStandardMaterial color="#020909" roughness={0.9} metalness={0.08} />
    </mesh>
    <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.18} maxPolarAngle={Math.PI / 2.08} />
  </Canvas>;
}

function ServiceCard({ title, text, icon }: { title: string; text: string; icon: "zap" | "wind" | "grid" }) {
  return <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl">
    <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-100"><Icon type={icon} /></div>
    <h3 className="text-base font-black text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-white/56">{text}</p>
  </div>;
}

export function FuresTechHero() {
  const [pulseKey, setPulseKey] = useState(0);
  return <div className="min-h-screen overflow-hidden bg-[#020506] text-white selection:bg-cyan-300/30">
    <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/10 bg-[#020506]/45 backdrop-blur-2xl"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8"><p className="text-sm font-black tracking-tight">Fures Tech</p></div></header>
    <main className="relative">
      <section className="relative min-h-screen overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 opacity-90"><HeroCanvas pulseKey={pulseKey} /></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#020506] via-[#020506]/76 to-[#020506]/20" />
        <div className="relative z-20 mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center px-5 py-20 lg:px-8"><motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85 }} className="max-w-3xl">
          <h1 className="text-5xl font-black leading-[0.92] tracking-[-0.065em] text-white sm:text-7xl lg:text-8xl">Websites that move, think and sell.</h1>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-cyan-300 to-amber-300 px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-black">Start a Project <Icon type="arrow" className="h-4 w-4" /></button>
            <button onClick={() => setPulseKey((n) => n + 1)} className="inline-flex items-center justify-center gap-3 rounded-full border border-white/14 bg-white/[0.06] px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-white backdrop-blur-xl animate-pulse"><Icon type="zap" className="h-4 w-4" />Trigger Demo</button>
          </div></motion.div></div>
      </section>
      <section className="relative z-20 mx-auto max-w-7xl px-5 pb-20 lg:px-8"><div className="grid gap-4 md:grid-cols-3">
        <ServiceCard icon="grid" title="Premium Websites" text="Fast, modern and conversion-focused websites with a strong visual identity." />
        <ServiceCard icon="zap" title="AI Automation" text="Smart workflows, content systems and operational tools powered by AI." />
        <ServiceCard icon="wind" title="Interactive Experiences" text="3D product showcases, campaign microsites and motion-rich brand demos." />
      </div></section>
    </main>
  </div>;
}
