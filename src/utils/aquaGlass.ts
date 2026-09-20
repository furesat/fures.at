/**
 * Aqua Glass — sıvı cam malzemesinin çalışma zamanı.
 *
 * Camın arkasındaki içeriği gerçekten bükmek için SVG yer değiştirme
 * filtresini `backdrop-filter` içinde kullanıyoruz. İki şeyi bilmek gerekiyor:
 *
 * 1. WebKit (Safari, iPhone'daki her tarayıcı) `backdrop-filter` içinde SVG
 *    filtresini kabul etmiyor — üstelik sessizce yok saymıyor, bildirimin
 *    tamamını düşürüyor. Yani kırılmayı bulanıklıkla aynı satıra yazarsak
 *    orada cam büsbütün kayboluyor. Bu yüzden kırılma yalnızca destekleyen
 *    motorda, ayrı bir kural olarak açılıyor (`data-aqua-lens="on"`).
 * 2. Dalganın akması için gürültü haritasının kendisi değil, okunduğu nokta
 *    kaydırılıyor (`feOffset`). Gürültüyü her karede yeniden üretmek pahalı;
 *    kaydırmak ucuz.
 */

const DEFS_ID = "aqua-glass-defs";
const OFFSET_ID = "aqua-wave-offset";

/** Geliştirici ayarları — arayüzde kontrol yok, değerler burada sabit. */
export const AQUA_SETTINGS = {
  /** Yüzey davranışı: "water" akar, "ice" sabit kalır. */
  surface: "water" as "water" | "ice",
  /** Yer değiştirme gücü (piksel). Yatayda bu kadar, dikeyde %30'u. */
  displace: 15,
  /** Dalga genliği (piksel) ve saniyedeki güncelleme sayısı. */
  waveAmplitude: 5,
  waveFps: 20,
} as const;

const SVG_NS = "http://www.w3.org/2000/svg";

function el(name: string, attrs: Record<string, string>): SVGElement {
  const node = document.createElementNS(SVG_NS, name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

/**
 * Filtre tanımlarını bir kez sayfaya ekler.
 *
 * Yeşil kanal 0.5'e (nötr) doğru bastırılıyor: başlık çubuğu yüksek değil,
 * dikey öteleme kendi dışına taşıp boş piksel çekiyor.
 */
function injectDefs(): SVGElement | null {
  if (document.getElementById(DEFS_ID)) {
    return document.getElementById(OFFSET_ID) as SVGElement | null;
  }

  const svg = el("svg", { id: DEFS_ID, "aria-hidden": "true", focusable: "false" });
  svg.setAttribute(
    "style",
    "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none",
  );
  const defs = el("defs", {});

  const flatten = "1 0 0 0 0  0 0.30 0 0 0.35  0 0 1 0 0  0 0 0 0 1";
  const region = {
    x: "0%",
    y: "0%",
    width: "100%",
    height: "100%",
    "color-interpolation-filters": "sRGB",
    filterUnits: "objectBoundingBox",
  };

  // Su — gürültü sabit, okunduğu nokta kayıyor (dx JS'ten güncelleniyor).
  const water = el("filter", { id: "aquaWater", ...region });
  water.appendChild(
    el("feTurbulence", {
      type: "fractalNoise",
      baseFrequency: "0.010 0.015",
      numOctaves: "1",
      seed: "4",
      result: "n",
    }),
  );
  water.appendChild(el("feOffset", { id: OFFSET_ID, in: "n", dx: "0", dy: "0", result: "no" }));
  water.appendChild(el("feColorMatrix", { in: "no", type: "matrix", values: flatten, result: "map" }));
  water.appendChild(
    el("feDisplacementMap", {
      in: "SourceGraphic",
      in2: "map",
      scale: String(AQUA_SETTINGS.displace),
      xChannelSelector: "R",
      yChannelSelector: "G",
    }),
  );
  defs.appendChild(water);

  // Buz — sabit duruyor, o yüzden üç kanalı ayrı ayrı kırabiliyor.
  // Camın renk kenarı buradan geliyor; hareketli olsaydı pahalı olurdu.
  const ice = el("filter", { id: "aquaIce", ...region });
  ice.appendChild(
    el("feTurbulence", {
      type: "fractalNoise",
      baseFrequency: "0.014 0.019",
      numOctaves: "1",
      seed: "17",
      result: "raw",
    }),
  );
  ice.appendChild(el("feGaussianBlur", { in: "raw", stdDeviation: "1", result: "w" }));
  ice.appendChild(el("feColorMatrix", { in: "w", type: "matrix", values: flatten, result: "map" }));
  const scales = [AQUA_SETTINGS.displace + 2, AQUA_SETTINGS.displace + 5, AQUA_SETTINGS.displace + 8];
  const channels = [
    ["dR", "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0", "cR"],
    ["dG", "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0", "cG"],
    ["dB", "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0", "cB"],
  ];
  channels.forEach(([res, matrix, out], i) => {
    ice.appendChild(
      el("feDisplacementMap", {
        in: "SourceGraphic",
        in2: "map",
        scale: String(scales[i]),
        xChannelSelector: "R",
        yChannelSelector: "G",
        result: res,
      }),
    );
    ice.appendChild(el("feColorMatrix", { in: res, type: "matrix", values: matrix, result: out }));
  });
  ice.appendChild(el("feBlend", { in: "cR", in2: "cG", mode: "screen", result: "cRG" }));
  ice.appendChild(el("feBlend", { in: "cRG", in2: "cB", mode: "screen" }));
  defs.appendChild(ice);

  svg.appendChild(defs);
  document.body.appendChild(svg);
  return document.getElementById(OFFSET_ID) as SVGElement | null;
}

/**
 * WebKit `backdrop-filter` içinde SVG filtresini render etmiyor ve
 * bildirimin tamamını düşürüyor. Orada hiç denemiyoruz — buzlu cam kalıyor.
 */
function canRefractBackdrop(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const appleWebKit =
    /iPad|iPhone|iPod/.test(ua) ||
    (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) ||
    (/Safari/.test(ua) && !/Chrome|Chromium|CriOS|Edg|OPR|FxiOS|Firefox/.test(ua));
  if (appleWebKit) return false;
  if (!window.CSS || !CSS.supports) return false;
  return (
    CSS.supports("backdrop-filter", "url(#aquaWater)") ||
    CSS.supports("-webkit-backdrop-filter", "url(#aquaWater)")
  );
}

export function initAquaGlass(): () => void {
  if (typeof window === "undefined" || typeof document === "undefined") return () => {};

  const root = document.documentElement;
  const offset = injectDefs();
  const supported = canRefractBackdrop();

  root.dataset.aquaSurface = AQUA_SETTINGS.surface;
  if (supported) root.dataset.aquaLens = "on";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const frameGap = 1000 / AQUA_SETTINGS.waveFps;
  let raf = 0;
  let lastTick = 0;
  let running = false;

  const tick = (now: number) => {
    if (!running) {
      raf = 0;
      return;
    }
    raf = requestAnimationFrame(tick);
    if (now - lastTick < frameGap) return;
    lastTick = now;
    // İki farklı periyot üst üste binince hareket kendini tekrar ediyormuş
    // gibi görünmüyor.
    const t = now / 1000;
    const a = AQUA_SETTINGS.waveAmplitude;
    const dx = Math.sin(t * 0.34) * a + Math.sin(t * 0.15 + 2) * a * 0.4;
    offset?.setAttribute("dx", dx.toFixed(2));
  };

  const sync = () => {
    const should =
      supported &&
      AQUA_SETTINGS.surface === "water" &&
      !reduce.matches &&
      !document.hidden;
    if (should === running) return;
    running = should;
    if (running && !raf) raf = requestAnimationFrame(tick);
  };

  document.addEventListener("visibilitychange", sync);
  if (reduce.addEventListener) reduce.addEventListener("change", sync);
  sync();

  return () => {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    document.removeEventListener("visibilitychange", sync);
    if (reduce.removeEventListener) reduce.removeEventListener("change", sync);
  };
}
