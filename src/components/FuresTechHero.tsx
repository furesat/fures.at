import React, { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";

type IconType = "zap" | "wind" | "arrow" | "grid";

function Icon({ type, className = "h-5 w-5" }: { type: IconType; className?: string }) {
  const common = { width: "1em", height: "1em", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className };
  const paths = {
    zap: <path d="M13 2L3 14h8l-1 8 11-14h-8l1-6z" />,
    wind: <><path d="M3 8h11a3 3 0 1 0-3-3" /><path d="M3 12h15a3 3 0 1 1-3 3" /><path d="M3 16h8" /></>,
    arrow: <><path d="M5 12h14" /><path d="M13 5l7 7-7 7" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>,
  };
  return <svg {...common}>{paths[type]}</svg>;
}

function getContext(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D canvas context unavailable");
  return ctx;
}

function makeFuresTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = getContext(canvas);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createLinearGradient(350, 250, 1690, 760);
  gradient.addColorStop(0, "#a995d2");
  gradient.addColorStop(0.45, "#d7a5c3");
  gradient.addColorStop(1, "#f2a0a7");
  ctx.save();
  ctx.globalAlpha = 0.94;
  ctx.fillStyle = gradient;
  ctx.font = "310px Georgia, 'Times New Roman', serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(255,160,170,.28)";
  ctx.shadowBlur = 36;
  ctx.fillText("fures", canvas.width / 2, canvas.height / 2 + 6);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function makeClothTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = getContext(canvas);

  const base = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  base.addColorStop(0, "#071718");
  base.addColorStop(0.45, "#0c1519");
  base.addColorStop(1, "#140b0d");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 900; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const a = Math.random() * 0.08;
    ctx.fillStyle = `rgba(255,255,255,${a})`;
    ctx.fillRect(x, y, Math.random() * 2.2, Math.random() * 2.2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 1);
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function KineticFuresCloth({ pulseKey }: { pulseKey: number }) {
  const cloth = useRef<THREE.Mesh>(null);
  const logo = useRef<THREE.Mesh>(null);
  const clothMat = useRef<THREE.MeshStandardMaterial>(null);
  const pulse = useRef(0);
  const logoTexture = useMemo(() => makeFuresTexture(), []);
  const clothTexture = useMemo(() => makeClothTexture(), []);
  const clothGeometry = useMemo(() => new THREE.PlaneGeometry(8.9, 4.0, 240, 112).rotateX(-Math.PI * 0.18), []);
  const logoGeometry = useMemo(() => new THREE.PlaneGeometry(6.2, 2.45, 180, 70).rotateX(-Math.PI * 0.18), []);

  const deform = (geometry: THREE.PlaneGeometry, time: number, strength = 1, logoLayer = false) => {
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const span = logoLayer ? 6.2 : 8.9;
      const anchor = Math.max(0.12, Math.min(1, (x + span / 2) / span));
      const main = Math.sin(x * 1.72 + time * 1.72) * 0.42;
      const fold = Math.sin((x * 3.8 + y * 1.25) + time * 2.28) * 0.17;
      const fine = Math.sin(x * 9.8 - y * 5.5 + time * 4.1) * 0.045;
      const gust = Math.sin((x + span / 2) * 2.95 - time * 7.4) * pulse.current * 0.5;
      const edge = Math.sin(y * 3.2 + time * 1.1) * 0.05;
      pos.setZ(i, (main + fold + fine + gust + edge) * anchor * strength);
    }
    pos.needsUpdate = true;
    geometry.computeVertexNormals();
  };

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    pulse.current *= 0.94;
    deform(clothGeometry, t, 1, false);
    deform(logoGeometry, t, 1.02, true);
    if (cloth.current) {
      cloth.current.rotation.z = Math.sin(t * 0.22) * 0.03;
      cloth.current.position.y = Math.sin(t * 0.42) * 0.055;
    }
    if (logo.current) {
      logo.current.rotation.z = Math.sin(t * 0.22) * 0.03;
      logo.current.position.y = Math.sin(t * 0.42) * 0.055;
    }
    if (clothMat.current) clothMat.current.roughness = 0.19 + Math.sin(t * 0.38) * 0.035;
  });

  React.useEffect(() => { pulse.current = 1.12; }, [pulseKey]);

  return <group position={[2.95, -0.1, 0.05]} rotation={[0.05, -0.37, -0.015]}>
    <mesh ref={cloth} geometry={clothGeometry} castShadow receiveShadow>
      <meshStandardMaterial ref={clothMat} map={clothTexture} color="#13282b" roughness={0.18} metalness={0.42} side={THREE.DoubleSide} envMapIntensity={3.9} />
    </mesh>
    <mesh ref={logo} geometry={logoGeometry} position={[0.34, -0.12, 0.075]} renderOrder={3}>
      <meshBasicMaterial map={logoTexture} transparent opacity={0.88} depthWrite={false} blending={THREE.NormalBlending} toneMapped={false} side={THREE.DoubleSide} />
    </mesh>
  </group>;
}

function HeroCanvas({ pulseKey }: { pulseKey: number }) {
  return <Canvas shadows camera={{ position: [0.05, 2.6, 7.0], fov: 39 }} dpr={[1, 2]}>
    <color attach="background" args={["#020506"]} /><fog attach="fog" args={["#020506", 8, 17]} />
    <ambientLight intensity={1.18} /><directionalLight position={[3, 5.5, 4]} intensity={3.8} castShadow />
    <pointLight position={[-3.8, 1.7, 2.8]} intensity={9.5} color="#46e8ff" />
    <pointLight position={[4.8, 2.4, -1.3]} intensity={7.4} color="#ff8c6a" />
    <spotLight position={[1.6, 5.5, 5.2]} angle={0.58} penumbra={0.75} intensity={5.4} color="#ffffff" />
    <Environment preset="city" />
    <KineticFuresCloth pulseKey={pulseKey} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow><planeGeometry args={[22, 22]} /><meshStandardMaterial color="#020909" roughness={0.86} metalness={0.18} /></mesh>
    <mesh position={[2.05, -1.24, -1.9]} rotation={[0.1, 0, 0]}><torusGeometry args={[4.9, 0.008, 8, 180]} /><meshStandardMaterial color="#34e7ff" emissive="#34e7ff" emissiveIntensity={1.25} /></mesh>
    <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.12} maxPolarAngle={Math.PI / 2.05} />
  </Canvas>;
}

function ServiceCard({ title, text, icon }: { title: string; text: string; icon: IconType }) {
  return <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.07]"><div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-100"><Icon type={icon} /></div><h3 className="text-base font-black text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-white/56">{text}</p></div>;
}

export function FuresTechHero() {
  const [pulseKey, setPulseKey] = useState(0);
  return <div className="min-h-screen overflow-hidden bg-[#020506] text-white selection:bg-cyan-300/30">
    <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(45,232,255,.18),transparent_28%),radial-gradient(circle_at_87%_21%,rgba(255,140,106,.19),transparent_32%),radial-gradient(circle_at_62%_82%,rgba(169,149,210,.12),transparent_34%)]" />
    <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/10 bg-[#020506]/45 backdrop-blur-2xl"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8"><div className="rounded-[1.65rem] border border-white/12 bg-white/[0.035] px-10 py-4"><span className="bg-gradient-to-r from-[#a995d2] via-[#d7a5c3] to-[#f2a0a7] bg-clip-text font-serif text-3xl tracking-[0.04em] text-transparent">fures</span></div></div></header>
    <main className="relative"><section className="relative min-h-screen overflow-hidden pt-20"><div className="absolute inset-0 z-0 opacity-100"><HeroCanvas pulseKey={pulseKey} /></div><div className="absolute inset-0 z-10 bg-gradient-to-r from-[#020506] via-[#020506]/38 to-transparent" />
      <div className="relative z-20 mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center px-5 py-20 lg:grid-cols-[1fr_.78fr] lg:px-8"><motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85 }} className="max-w-3xl"><h1 className="max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.065em] text-white sm:text-7xl lg:text-8xl">Websites that move, think and sell.</h1><div className="mt-9 flex flex-col gap-3 sm:flex-row"><button className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-cyan-300 to-amber-300 px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-black">Start a Project<Icon type="arrow" className="h-4 w-4" /></button><button onClick={() => setPulseKey((n) => n + 1)} className="inline-flex items-center justify-center gap-3 rounded-full border border-white/14 bg-white/[0.06] px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-white"><Icon type="zap" className="h-4 w-4" />Trigger Demo</button></div></motion.div></div></section>
      <section className="relative z-20 mx-auto max-w-7xl px-5 pb-20 lg:px-8"><div className="grid gap-4 md:grid-cols-3"><ServiceCard icon="grid" title="Premium Websites" text="Fast, modern and conversion-focused websites with a strong visual identity." /><ServiceCard icon="zap" title="AI Automation" text="Smart workflows, content systems and operational tools powered by AI." /><ServiceCard icon="wind" title="Interactive Experiences" text="3D product showcases, campaign microsites and motion-rich brand demos." /></div></section>
    </main></div>;
}
