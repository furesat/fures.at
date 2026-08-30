/**
 * GlassFilters — invisible SVG <filter> definitions used by the Apple
 * Liquid Glass surfaces (referenced from CSS via `backdrop-filter: url(...)`).
 *
 * The `feTurbulence` + `feDisplacementMap` pair refracts the content sitting
 * behind a glass panel, reproducing the subtle "lensing" you see through real
 * frosted glass on iOS 26 / macOS Tahoe. Chromium & Firefox apply it through
 * the unprefixed `backdrop-filter`; Safari (which doesn't support url() there)
 * gracefully falls back to the plain blur via `-webkit-backdrop-filter`.
 *
 * Rendered once at the application root so every glass surface can reference
 * the shared filter id.
 */
export function GlassFilters() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <defs>
        {/* Soft, large-scale lensing for big panels (nav bar, dropdowns) */}
        <filter
          id="fures-liquid-glass"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.011 0.016"
            numOctaves={2}
            seed={7}
            stitchTiles="stitch"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="0.6" result="softNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softNoise"
            scale={7}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Tighter lensing for small pills (logo, language, buttons) */}
        <filter
          id="fures-liquid-glass-sm"
          x="-25%"
          y="-25%"
          width="150%"
          height="150%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.028"
            numOctaves={2}
            seed={4}
            stitchTiles="stitch"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="0.5" result="softNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softNoise"
            scale={4}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
