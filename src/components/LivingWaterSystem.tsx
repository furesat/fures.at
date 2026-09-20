import { useEffect } from "react";

const SURFACE_SELECTOR = ".fures-card, .fures-nav-glass, .fures-dropdown-content";

type Droplet = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wobble: number;
  phase: number;
  trail: number;
  alpha: number;
};

type Ripple = {
  x: number;
  y: number;
  age: number;
  life: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const random = (min: number, max: number) =>
  min + Math.random() * (max - min);

class LivingWaterSurface {
  readonly host: HTMLElement;
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;
  readonly resizeObserver: ResizeObserver;

  visible = true;
  width = 0;
  height = 0;
  dpr = 1;
  seed = Math.random() * 7;
  pointer = { x: 0.5, y: 0.5, active: false };
  droplets: Droplet[] = [];
  ripples: Ripple[] = [];

  constructor(host: HTMLElement) {
    this.host = host;
    this.canvas = document.createElement("canvas");
    this.canvas.className = "fures-water-layer";
    this.canvas.setAttribute("aria-hidden", "true");

    const context = this.canvas.getContext("2d", { alpha: true });
    if (!context) {
      throw new Error("2D canvas is unavailable");
    }
    this.ctx = context;

    this.host.classList.add("fures-live-water-host");
    this.host.prepend(this.canvas);

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.host);

    this.host.addEventListener("pointerenter", this.onPointerMove, { passive: true });
    this.host.addEventListener("pointermove", this.onPointerMove, { passive: true });
    this.host.addEventListener("pointerleave", this.onPointerLeave, { passive: true });
    this.host.addEventListener("pointerdown", this.onPointerDown, { passive: true });

    this.resize();
  }

  onPointerMove = (event: PointerEvent) => {
    const rect = this.host.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    this.pointer.x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    this.pointer.y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
    this.pointer.active = true;
  };

  onPointerLeave = () => {
    this.pointer.active = false;
  };

  onPointerDown = (event: PointerEvent) => {
    const rect = this.host.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    this.ripples.push({
      x: clamp((event.clientX - rect.left) / rect.width, 0, 1),
      y: clamp((event.clientY - rect.top) / rect.height, 0, 1),
      age: 0,
      life: 1.35,
    });
    if (this.ripples.length > 5) this.ripples.shift();
  };

  setVisible(visible: boolean) {
    this.visible = visible;
  }

  resize() {
    const rect = this.host.getBoundingClientRect();
    this.width = Math.max(1, rect.width);
    this.height = Math.max(1, rect.height);
    this.dpr = Math.min(window.devicePixelRatio || 1, this.width < 680 ? 1.35 : 1.65);

    const pixelWidth = Math.max(1, Math.round(this.width * this.dpr));
    const pixelHeight = Math.max(1, Math.round(this.height * this.dpr));

    if (this.canvas.width !== pixelWidth || this.canvas.height !== pixelHeight) {
      this.canvas.width = pixelWidth;
      this.canvas.height = pixelHeight;
      this.canvas.style.width = `${this.width}px`;
      this.canvas.style.height = `${this.height}px`;
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      this.createDroplets();
    }
  }

  createDroplets() {
    const count = clamp(Math.round(this.width / 190), 2, 6);
    this.droplets = Array.from({ length: count }, () => ({
      x: random(0.08, 0.92),
      y: random(-0.65, 1),
      radius: random(1.9, 4.2),
      speed: random(0.012, 0.032),
      wobble: random(0.002, 0.008),
      phase: random(0, Math.PI * 2),
      trail: random(0.035, 0.105),
      alpha: random(0.28, 0.55),
    }));
  }

  drawFlow(now: number) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.save();
    ctx.globalCompositeOperation = "source-over";

    for (let row = 0.18; row < 0.96; row += 0.19) {
      const amplitude = h * (0.006 + 0.0025 * Math.sin(this.seed + row * 9));
      ctx.beginPath();

      for (let step = 0; step <= 40; step += 1) {
        const x = (step / 40) * w;
        const nx = step / 40;
        const y =
          row * h +
          Math.sin(nx * 10 + now * 0.00055 + this.seed * 2.8) * amplitude +
          Math.sin(nx * 23 - now * 0.00031 + row * 7) * amplitude * 0.34;

        if (step === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.strokeStyle = "rgba(255,255,255,0.11)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    const glowX = (0.2 + (Math.sin(now * 0.00032 + this.seed) + 1) * 0.3) * w;
    const glowY = (0.18 + (Math.cos(now * 0.00027 + this.seed) + 1) * 0.2) * h;
    const radius = Math.max(50, Math.min(w, h) * 0.52);
    const glow = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, radius);
    glow.addColorStop(0, "rgba(255,255,255,0.12)");
    glow.addColorStop(0.42, "rgba(93,220,235,0.055)");
    glow.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    ctx.restore();
  }

  drawPointerLens(now: number, reducedMotion: boolean) {
    if (!this.pointer.active || reducedMotion) return;

    const ctx = this.ctx;
    const x = this.pointer.x * this.width;
    const y = this.pointer.y * this.height;
    const radius = Math.max(34, Math.min(this.width, this.height) * 0.16);
    const gradient = ctx.createRadialGradient(
      x - radius * 0.24,
      y - radius * 0.28,
      0,
      x,
      y,
      radius,
    );

    gradient.addColorStop(0, "rgba(255,255,255,0.14)");
    gradient.addColorStop(0.52, "rgba(126,231,240,0.055)");
    gradient.addColorStop(0.8, "rgba(255,255,255,0.095)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(
      x,
      y,
      radius * (1 + Math.sin(now * 0.0016) * 0.018),
      radius * 0.72 * (1 + Math.cos(now * 0.0013) * 0.016),
      Math.sin(now * 0.0005) * 0.045,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }

  drawRipples(deltaMs: number, reducedMotion: boolean) {
    if (reducedMotion) {
      this.ripples.length = 0;
      return;
    }

    const ctx = this.ctx;
    const span = Math.min(this.width, this.height);

    for (let index = this.ripples.length - 1; index >= 0; index -= 1) {
      const ripple = this.ripples[index];
      ripple.age += deltaMs / 1000;
      const progress = ripple.age / ripple.life;

      if (progress >= 1) {
        this.ripples.splice(index, 1);
        continue;
      }

      const x = ripple.x * this.width;
      const y = ripple.y * this.height;
      const radius = 10 + progress * span * 0.32;
      const fade = (1 - progress) ** 2;

      for (let ring = 0; ring < 2; ring += 1) {
        ctx.beginPath();
        ctx.arc(x, y, Math.max(1, radius - ring * 4), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${0.18 * fade * (1 - ring * 0.28)})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }
    }
  }

  drawDroplets(now: number, deltaMs: number, reducedMotion: boolean) {
    const ctx = this.ctx;

    for (const drop of this.droplets) {
      if (!reducedMotion) {
        drop.y += (drop.speed * deltaMs) / 1000;
        drop.x += Math.sin(now * 0.001 + drop.phase) * drop.wobble * (deltaMs / 1000);
      }

      if (drop.y > 1.14) {
        drop.y = random(-0.2, -0.05);
        drop.x = random(0.08, 0.92);
      }

      const x = drop.x * this.width;
      const y = drop.y * this.height;
      const radius = drop.radius;

      if (drop.trail > 0.04) {
        const trailHeight = this.height * drop.trail;
        const trail = ctx.createLinearGradient(x, y - trailHeight, x, y);
        trail.addColorStop(0, "rgba(255,255,255,0)");
        trail.addColorStop(0.7, `rgba(117,211,230,${drop.alpha * 0.08})`);
        trail.addColorStop(1, `rgba(255,255,255,${drop.alpha * 0.24})`);

        ctx.strokeStyle = trail;
        ctx.lineWidth = Math.max(0.5, radius * 0.27);
        ctx.beginPath();
        ctx.moveTo(x, y - trailHeight);
        ctx.quadraticCurveTo(
          x - radius * 0.3,
          y - trailHeight * 0.48,
          x,
          y - radius * 0.65,
        );
        ctx.stroke();
      }

      const bead = ctx.createRadialGradient(
        x - radius * 0.3,
        y - radius * 0.38,
        radius * 0.06,
        x,
        y,
        radius * 1.35,
      );
      bead.addColorStop(0, `rgba(255,255,255,${drop.alpha * 0.92})`);
      bead.addColorStop(0.3, `rgba(229,249,252,${drop.alpha * 0.4})`);
      bead.addColorStop(0.7, `rgba(59,163,199,${drop.alpha * 0.15})`);
      bead.addColorStop(1, "rgba(35,112,151,0)");

      ctx.fillStyle = bead;
      ctx.beginPath();
      ctx.ellipse(x, y, radius * 0.82, radius * 1.16, 0.04, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = `rgba(255,255,255,${drop.alpha * 0.34})`;
      ctx.lineWidth = 0.55;
      ctx.beginPath();
      ctx.arc(x - radius * 0.08, y - radius * 0.15, radius * 0.72, Math.PI * 0.9, Math.PI * 1.72);
      ctx.stroke();
    }
  }

  drawMeniscus(now: number) {
    const ctx = this.ctx;
    const x = (0.18 + (Math.sin(now * 0.00028 + this.seed) + 1) * 0.27) * this.width;
    const span = Math.min(this.width * 0.2, 150);
    const gradient = ctx.createLinearGradient(x - span, 0, x + span, 0);
    gradient.addColorStop(0, "rgba(255,255,255,0)");
    gradient.addColorStop(0.5, "rgba(255,255,255,0.36)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 0.75;
    ctx.beginPath();
    ctx.moveTo(Math.max(0, x - span), 1.4);
    ctx.quadraticCurveTo(x, 4.5, Math.min(this.width, x + span), 1.4);
    ctx.stroke();
  }

  draw(now: number, deltaMs: number, reducedMotion: boolean) {
    if (!this.visible || !this.host.isConnected || this.width < 2 || this.height < 2) return;

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    const wash = ctx.createLinearGradient(0, 0, this.width, this.height);
    wash.addColorStop(0, "rgba(255,255,255,0.025)");
    wash.addColorStop(0.48, "rgba(76,209,226,0.025)");
    wash.addColorStop(1, "rgba(255,171,92,0.018)");
    ctx.fillStyle = wash;
    ctx.fillRect(0, 0, this.width, this.height);

    this.drawFlow(now);
    this.drawPointerLens(now, reducedMotion);
    this.drawRipples(deltaMs, reducedMotion);
    this.drawDroplets(now, deltaMs, reducedMotion);
    this.drawMeniscus(now);
  }

  destroy() {
    this.resizeObserver.disconnect();
    this.host.removeEventListener("pointerenter", this.onPointerMove);
    this.host.removeEventListener("pointermove", this.onPointerMove);
    this.host.removeEventListener("pointerleave", this.onPointerLeave);
    this.host.removeEventListener("pointerdown", this.onPointerDown);
    this.canvas.remove();
    this.host.classList.remove("fures-live-water-host");
  }
}

export function LivingWaterSystem() {
  useEffect(() => {
    const surfaces = new Set<LivingWaterSurface>();
    const byElement = new WeakMap<HTMLElement, LivingWaterSurface>();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const surface = byElement.get(entry.target as HTMLElement);
          surface?.setVisible(entry.isIntersecting);
        });
      },
      { rootMargin: "180px" },
    );

    const enhance = (element: HTMLElement) => {
      if (byElement.has(element) || element.closest("[data-no-living-water]")) return;
      const surface = new LivingWaterSurface(element);
      byElement.set(element, surface);
      surfaces.add(surface);
      intersectionObserver.observe(element);
    };

    const scan = (root: ParentNode = document) => {
      root.querySelectorAll<HTMLElement>(SURFACE_SELECTOR).forEach(enhance);
    };

    scan();

    const mutationObserver = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.matches(SURFACE_SELECTOR)) enhance(node);
          scan(node);
        }
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    let animationFrame = 0;
    let previous = performance.now();

    const animate = (now: number) => {
      const delta = Math.min(34, now - previous);
      previous = now;

      if (!document.hidden) {
        for (const surface of Array.from(surfaces)) {
          if (!surface.host.isConnected) {
            surfaces.delete(surface);
            surface.destroy();
            continue;
          }
          surface.draw(now, delta, reducedMotion.matches);
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      mutationObserver.disconnect();
      intersectionObserver.disconnect();
      surfaces.forEach((surface) => surface.destroy());
      surfaces.clear();
    };
  }, []);

  return null;
}
