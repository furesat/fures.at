import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "../contexts/ThemeContext";

export function ClothCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const currentCanvas = canvas;

    const isLight = theme === "light";

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    function makeClothTexture() {
      const c = document.createElement("canvas");
      c.width = 2048;
      c.height = 1024;
      const ctx = c.getContext("2d")!;

      if (isLight) {
        ctx.fillStyle = "#f4ede8";
        ctx.fillRect(0, 0, 2048, 1024);

        const drift = ctx.createLinearGradient(0, 0, 2048, 0);
        drift.addColorStop(0,   "rgba(230, 218, 252, 0.60)");
        drift.addColorStop(0.35,"rgba(255, 238, 225, 0.50)");
        drift.addColorStop(0.7, "rgba(255, 218, 195, 0.55)");
        drift.addColorStop(1,   "rgba(248, 208, 172, 0.62)");
        ctx.fillStyle = drift;
        ctx.fillRect(0, 0, 2048, 1024);

        const shimmer = ctx.createRadialGradient(1024, 200, 0, 1024, 200, 900);
        shimmer.addColorStop(0,   "rgba(255, 255, 255, 0.30)");
        shimmer.addColorStop(0.5, "rgba(255, 250, 245, 0.10)");
        shimmer.addColorStop(1,   "rgba(240, 235, 230, 0.00)");
        ctx.fillStyle = shimmer;
        ctx.fillRect(0, 0, 2048, 1024);
      } else {
        ctx.fillStyle = "#08040a";
        ctx.fillRect(0, 0, 2048, 1024);

        const drift = ctx.createLinearGradient(0, 0, 2048, 0);
        drift.addColorStop(0,   "rgba(6, 8, 20, 0.75)");
        drift.addColorStop(0.35,"rgba(14, 6, 10, 0.55)");
        drift.addColorStop(0.7, "rgba(26, 10, 7, 0.65)");
        drift.addColorStop(1,   "rgba(34, 14, 8, 0.72)");
        ctx.fillStyle = drift;
        ctx.fillRect(0, 0, 2048, 1024);

        const shimmer = ctx.createRadialGradient(1024, 200, 0, 1024, 200, 900);
        shimmer.addColorStop(0,   "rgba(60, 40, 80, 0.18)");
        shimmer.addColorStop(0.5, "rgba(20, 10, 30, 0.08)");
        shimmer.addColorStop(1,   "rgba(0, 0, 0, 0.00)");
        ctx.fillStyle = shimmer;
        ctx.fillRect(0, 0, 2048, 1024);
      }

      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = true;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return tex;
    }

    const clothTex = makeClothTexture();

    // -------------------------------------------------------------------
    // Vertex shader — multi-octave cloth simulation with gravity sag
    // -------------------------------------------------------------------
    const vertexShader = /* glsl */ `
      uniform float uTime;
      uniform vec2  uMouse;
      uniform float uMouseInfluence;
      uniform float uIntro;

      varying vec2  vUv;
      varying vec3  vNormal;
      varying vec3  vViewDir;
      varying float vDisplacement;
      varying float vEdge;

      // --- Noise helpers ---
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      float noise(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i), hash(i + vec2(1,0)), u.x),
          mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
          u.y
        );
      }
      // 4-octave fBm
      float fbm(vec2 p) {
        float v = 0.0; float a = 0.5;
        for (int i = 0; i < 4; i++) {
          v += a * noise(p);
          p  = p * 2.1 + vec2(1.7, 9.2);
          a *= 0.48;
        }
        return v;
      }

      // --- Core cloth displacement ---
      float displaceAt(vec2 uv, float t) {
        // Hang edge: left is pinned, falls right
        float pinX  = smoothstep(0.0, 0.9, uv.x);
        float edgeY = mix(0.72, 1.0,
                         smoothstep(0.0, 0.28, uv.y) * smoothstep(1.0, 0.72, uv.y));

        // Wind — a travelling gust envelope that swells fold amplitude as it
        // passes across the curtain (cheap: single evolving noise lookup)
        float gust    = noise(vec2(uv.x * 0.9 - t * 0.18, t * 0.12));
        float gustAmp = 0.75 + gust * 0.9;   // 0.75 .. 1.65 amplitude swell

        // Primary drape folds — slow, wide; amplitude driven by wind
        float f1 = sin(uv.x * 2.2  - t * 0.48) * 0.60 * gustAmp;
        float f2 = sin(uv.x * 3.8  + uv.y * 1.6 + t * 0.68) * 0.34 * gustAmp;
        float f3 = cos(uv.y * 2.6  + uv.x * 1.3 + t * 0.38) * 0.24;

        // Mid-frequency ripples — phase nudged by the gust for organic drift
        float r1 = sin(uv.x * 7.2  + uv.y * 3.1  + t * 1.15 + gust * 2.0) * 0.10;
        float r2 = cos(uv.x * 11.4 + uv.y * 5.8  + t * 0.85) * 0.055;

        // High-frequency micro-wrinkle via fBm
        float wrinkle = (fbm(uv * 10.0 + vec2(t * 0.12, t * 0.07)) - 0.5) * 0.12;

        // Gravity sag — bottom-right hangs lower
        float sag = uv.x * (1.0 - uv.y) * 0.45 + uv.x * 0.12;

        return (f1 + f2 + f3 + r1 + r2 + wrinkle - sag) * pinX * edgeY;
      }

      float mouseAt(vec2 uv, vec2 mUv) {
        float d = distance(uv, mUv);
        return exp(-d * d * 4.5) * uMouseInfluence;
      }

      void main() {
        vUv = uv;
        vec3 pos = position;
        float t = uTime;

        float pinX = smoothstep(0.0, 0.9, uv.x);
        vEdge = pinX;

        float disp = displaceAt(uv, t);

        // Intro unfurl animation
        float intro    = clamp(uIntro, 0.0, 1.0);
        float introInv = 1.0 - intro;
        pos.z -= introInv * (sin(uv.x * 5.0 + uv.y * 2.0) * 0.7 + (1.0 - uv.y) * 1.6) * 1.5;
        pos.y -= introInv * 1.6 * uv.x;
        pos.x -= introInv * 0.45 * (1.0 - uv.x);

        pos.z += disp * intro;

        // Mouse push
        vec2 mouseUv = uMouse * 0.5 + 0.5;
        float pull    = mouseAt(uv, mouseUv);
        pos.z  += pull * 0.62 * pinX;
        pos.xy += (mouseUv - uv) * pull * 0.32 * pinX;

        vDisplacement = disp + pull * 0.62 * pinX;

        // Analytic normal via central differences
        float eps = 0.004;
        float hR = displaceAt(uv + vec2(eps,  0.0), t) + mouseAt(uv + vec2(eps,  0.0), mouseUv) * 0.62 * smoothstep(0.0, 0.9, uv.x + eps);
        float hL = displaceAt(uv - vec2(eps,  0.0), t) + mouseAt(uv - vec2(eps,  0.0), mouseUv) * 0.62 * smoothstep(0.0, 0.9, uv.x - eps);
        float hU = displaceAt(uv + vec2(0.0,  eps), t) + mouseAt(uv + vec2(0.0,  eps), mouseUv) * 0.62 * pinX;
        float hD = displaceAt(uv - vec2(0.0,  eps), t) + mouseAt(uv - vec2(0.0,  eps), mouseUv) * 0.62 * pinX;

        vec3 dx = vec3(eps * 18.0, 0.0, hR - hL);
        vec3 dy = vec3(0.0, eps * 12.0, hU - hD);
        vNormal  = normalize(cross(dx, dy));

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        vViewDir = normalize(-mvPosition.xyz);

        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    // -------------------------------------------------------------------
    // Fragment shader — anisotropic silk BRDF + iridescence + sub-surface
    // -------------------------------------------------------------------
    const fragmentShader = /* glsl */ `
      uniform sampler2D uTex;
      uniform float uTime;
      uniform float uIntro;
      uniform vec3  uLight1Color;
      uniform vec3  uLight2Color;
      uniform float uAmbient;
      uniform float uDiffuse1;
      uniform float uDiffuse2;
      uniform float uSpecular1;
      uniform float uSpecular2;
      uniform float uRimStrength;
      uniform float uAoFloor;
      uniform float uVignetteFloor;
      uniform float uExposure;
      uniform int   uIsLight;

      varying vec2  vUv;
      varying vec3  vNormal;
      varying vec3  vViewDir;
      varying float vDisplacement;
      varying float vEdge;

      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i+vec2(1,0)), u.x),
                   mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
      }

      // Anisotropic highlight (Ashikhmin-Shirley style, simplified)
      float anisoSpec(vec3 N, vec3 L, vec3 V, float nu, float nv) {
        vec3 H = normalize(L + V);
        float NdotH = max(dot(N, H), 0.0);
        float LdotH = max(dot(L, H), 0.001);
        // Tangent in screen space approximation
        vec3 T = normalize(cross(N, vec3(0.0, 1.0, 0.0)));
        vec3 B = cross(N, T);
        float TdotH = dot(T, H);
        float BdotH = dot(B, H);
        float exponent = (nu * TdotH * TdotH + nv * BdotH * BdotH) / (1.0 - NdotH * NdotH + 0.001);
        float norm = sqrt((nu + 1.0) * (nv + 1.0)) / (8.0 * 3.14159);
        float NdotL = max(dot(N, L), 0.0);
        float NdotV = max(dot(N, V), 0.0);
        return norm * pow(NdotH, exponent) / (LdotH * max(NdotL, NdotV));
      }

      // Thin-film iridescence (soap-bubble style)
      vec3 iridescence(float cosTheta, float thickness) {
        float t = thickness * (1.0 - cosTheta * cosTheta);
        float phi = 2.0 * 3.14159 * t;
        float r = 0.5 + 0.5 * cos(phi);
        float g = 0.5 + 0.5 * cos(phi + 2.094);
        float b = 0.5 + 0.5 * cos(phi + 4.189);
        return vec3(r, g, b);
      }

      void main() {
        vec3  N = normalize(vNormal);
        vec3  V = normalize(vViewDir);

        vec3 light1Dir = normalize(vec3(-0.50, 0.50, 0.80));
        vec3 light2Dir = normalize(vec3( 0.80, -0.30, 0.60));

        float NdotL1 = max(dot(N, light1Dir), 0.0);
        float NdotL2 = max(dot(N, light2Dir), 0.0);
        float NdotV  = max(dot(N, V), 0.0);

        // Fresnel (Schlick)
        float fresnel = pow(1.0 - NdotV, 2.5);

        // Anisotropic specular — silk tangent along warp threads
        float spec1 = anisoSpec(N, light1Dir, V, 320.0, 12.0) * NdotL1;
        float spec2 = anisoSpec(N, light2Dir, V, 280.0, 10.0) * NdotL2;

        // Iridescent sheen layer (thin-film, subtle)
        float iridThickness = 0.28 + 0.12 * sin(vUv.x * 18.0 + vUv.y * 9.0 + uTime * 0.22);
        vec3  iriColor = iridescence(NdotV, iridThickness);
        float iriMask  = fresnel * 0.55 * vEdge;

        // Travelling satin sheen — a bright soft band that sweeps across the
        // silk on a slow loop, the signature glint of real satin curtains
        float sweepPos  = fract(uTime * 0.05) * 1.5 - 0.25;   // -0.25 .. 1.25
        float sheenBand = smoothstep(0.11, 0.0, abs(vUv.x - sweepPos));
        sheenBand      *= 0.6 + 0.4 * NdotL1;                 // brighter where lit
        iriMask        *= 1.0 + sheenBand * 1.6;              // iridescence flares in the band

        // Micro-weave texture (warp + weft directions at different scales)
        float warp   = (noise(vUv * vec2(1600.0, 80.0)) - 0.5) * 0.18;
        float weft   = (noise(vUv * vec2(80.0, 1600.0)) - 0.5) * 0.15;
        float coarse = (noise(vUv * 38.0) - 0.5) * 0.07;
        float weave  = warp + weft + coarse;

        vec3 albedo = texture2D(uTex, vUv).rgb;

        // Ambient occlusion from displacement
        float ao = smoothstep(-0.7, 0.5, vDisplacement);
        ao = mix(uAoFloor, 1.0, ao);

        vec3 ambient  = albedo * uAmbient;
        vec3 diffuse  = albedo * (NdotL1 * uDiffuse1 * uLight1Color
                                + NdotL2 * uDiffuse2 * uLight2Color);
        vec3 specular = uLight1Color * spec1 * uSpecular1
                      + uLight2Color * spec2 * uSpecular2;
        vec3 rim      = mix(uLight2Color, uLight1Color, 0.4) * fresnel * uRimStrength;
        vec3 iri      = iriColor * iriMask * (uIsLight == 1 ? 0.10 : 0.22);
        vec3 sheen    = mix(uLight1Color, vec3(1.0), 0.4) * sheenBand
                      * (uIsLight == 1 ? 0.16 : 0.30) * vEdge;

        vec3 col = ambient + diffuse + specular + rim + iri + sheen;
        col *= ao;
        col *= 1.0 + weave;

        // Radial vignette
        float vignette = smoothstep(1.25, 0.28, length(vUv - 0.5) * 1.5);
        col *= mix(uVignetteFloor, 1.0, vignette);

        // Intro fade
        col *= clamp(uIntro * uExposure, 0.0, 1.0);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    // Higher resolution mesh for smoother folds
    const geometry = new THREE.PlaneGeometry(16, 10, 180, 120);

    const lightUniforms = isLight
      ? {
          uLight1Color:  new THREE.Color(0.76, 0.84, 1.06),
          uLight2Color:  new THREE.Color(1.12, 0.88, 0.60),
          uAmbient:      0.88,
          uDiffuse1:     0.30,
          uDiffuse2:     0.26,
          uSpecular1:    0.55,
          uSpecular2:    0.75,
          uRimStrength:  0.28,
          uAoFloor:      0.84,
          uVignetteFloor:0.93,
          uExposure:     1.0,
        }
      : {
          uLight1Color:  new THREE.Color(0.38, 0.58, 1.10),
          uLight2Color:  new THREE.Color(1.18, 0.52, 0.18),
          uAmbient:      0.15,
          uDiffuse1:     0.72,
          uDiffuse2:     0.58,
          uSpecular1:    0.95,
          uSpecular2:    1.40,
          uRimStrength:  0.80,
          uAoFloor:      0.50,
          uVignetteFloor:0.68,
          uExposure:     1.12,
        };

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime:           { value: 0 },
        uMouse:          { value: new THREE.Vector2(0, 0) },
        uMouseInfluence: { value: 0 },
        uIntro:          { value: 0 },
        uTex:            { value: clothTex },
        uLight1Color:    { value: lightUniforms.uLight1Color },
        uLight2Color:    { value: lightUniforms.uLight2Color },
        uAmbient:        { value: lightUniforms.uAmbient },
        uDiffuse1:       { value: lightUniforms.uDiffuse1 },
        uDiffuse2:       { value: lightUniforms.uDiffuse2 },
        uSpecular1:      { value: lightUniforms.uSpecular1 },
        uSpecular2:      { value: lightUniforms.uSpecular2 },
        uRimStrength:    { value: lightUniforms.uRimStrength },
        uAoFloor:        { value: lightUniforms.uAoFloor },
        uVignetteFloor:  { value: lightUniforms.uVignetteFloor },
        uExposure:       { value: lightUniforms.uExposure },
        uIsLight:        { value: isLight ? 1 : 0 },
      },
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
    });

    const cloth = new THREE.Mesh(geometry, material);
    cloth.position.set(0, 0, 0);
    cloth.rotation.z = -0.018;
    scene.add(cloth);

    function resize() {
      const rect = currentCanvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const visibleHeight = 2 * Math.tan(((camera.fov * Math.PI) / 180) / 2) * camera.position.z;
      const visibleWidth  = visibleHeight * camera.aspect;
      const scale = Math.max((visibleWidth * 1.06) / 16, (visibleHeight * 1.12) / 10);
      cloth.scale.set(scale, scale, 1);
    }
    window.addEventListener("resize", resize);
    resize();

    const mouse = { x: 0, y: 0, tx: 0, ty: 0, influence: 0, tInfluence: 0 };

    const onMouseMove = (e: MouseEvent) => {
      const rect = currentCanvas.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouse.ty = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.tInfluence = 1.0;
    };
    const onMouseLeave = () => { mouse.tInfluence = 0; };
    const onMouseEnter = () => { mouse.tInfluence = 1; };
    const onTouchMove  = (e: TouchEvent) => {
      if (e.touches.length) {
        const t = e.touches[0];
        const rect = currentCanvas.getBoundingClientRect();
        mouse.tx = ((t.clientX - rect.left) / rect.width)  * 2 - 1;
        mouse.ty = -(((t.clientY - rect.top) / rect.height) * 2 - 1);
        mouse.tInfluence = 1.0;
      }
    };

    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("touchmove",  onTouchMove, { passive: true });

    const clock = new THREE.Clock();
    let intro = 0;
    let animId: number;

    function tick() {
      const t = clock.getElapsedTime();

      mouse.x         += (mouse.tx        - mouse.x)         * 0.055;
      mouse.y         += (mouse.ty        - mouse.y)         * 0.055;
      mouse.influence += (mouse.tInfluence - mouse.influence) * 0.032;

      // Smooth exponential intro (reaches ~0.97 at t≈5s)
      intro += (1 - intro) * 0.010;

      material.uniforms.uTime.value           = t;
      material.uniforms.uMouse.value.set(mouse.x, mouse.y);
      material.uniforms.uMouseInfluence.value = mouse.influence;
      material.uniforms.uIntro.value          = Math.min(intro, 1);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(tick);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        material.uniforms.uTex.value = makeClothTexture();
        tick();
      });
    } else {
      tick();
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize",   resize);
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("touchmove",  onTouchMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      clothTex.dispose();
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "145vh",
        zIndex: 1,
        pointerEvents: "none",
        maskImage:
          "linear-gradient(to bottom, #000 0%, #000 55%, rgba(0,0,0,0.68) 70%, rgba(0,0,0,0.22) 86%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, #000 0%, #000 55%, rgba(0,0,0,0.68) 70%, rgba(0,0,0,0.22) 86%, transparent 100%)",
      }}
    />
  );
}
