import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "../contexts/ThemeContext";

export function ClothCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

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
      c.width = 4096;
      c.height = 2048;
      const ctx = c.getContext("2d")!;

      if (isLight) {
        // Light silk — warm cream base with soft pastel drift
        ctx.fillStyle = "#f6f0ea";
        ctx.fillRect(0, 0, 4096, 2048);

        const colorDrift = ctx.createLinearGradient(0, 0, 4096, 0);
        colorDrift.addColorStop(0, "rgba(232, 222, 255, 0.55)");
        colorDrift.addColorStop(0.4, "rgba(255, 240, 230, 0.45)");
        colorDrift.addColorStop(0.8, "rgba(255, 220, 198, 0.55)");
        colorDrift.addColorStop(1, "rgba(255, 210, 180, 0.6)");
        ctx.fillStyle = colorDrift;
        ctx.fillRect(0, 0, 4096, 2048);
      } else {
        // Dark silk — original deep, warm-tinted base
        ctx.fillStyle = "#0a0508";
        ctx.fillRect(0, 0, 4096, 2048);

        const colorDrift = ctx.createLinearGradient(0, 0, 4096, 0);
        colorDrift.addColorStop(0, "rgba(8, 10, 22, 0.7)");
        colorDrift.addColorStop(0.4, "rgba(15, 8, 12, 0.5)");
        colorDrift.addColorStop(0.8, "rgba(28, 14, 10, 0.6)");
        colorDrift.addColorStop(1, "rgba(35, 18, 12, 0.7)");
        ctx.fillStyle = colorDrift;
        ctx.fillRect(0, 0, 4096, 2048);
      }

      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return tex;
    }

    const clothTex = makeClothTexture();

    const vertexShader = /* glsl */ `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uMouseInfluence;
      uniform float uIntro;

      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewDir;
      varying float vDisplacement;
      varying float vEdge;

      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1,0)), u.x),
                   mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
      }

      float displaceAt(vec2 uv, float t) {
        float edgeX = smoothstep(0.0, 0.85, uv.x);
        float edgeY = smoothstep(0.0, 0.25, uv.y) * smoothstep(1.0, 0.75, uv.y);
        edgeY = mix(0.7, 1.0, edgeY);

        float fold1 = sin(uv.x * 2.4 - t * 0.55) * 0.55;
        float fold2 = sin(uv.x * 3.6 + uv.y * 1.7 + t * 0.75) * 0.32;
        float fold3 = cos(uv.y * 2.3 + uv.x * 1.4 + t * 0.4) * 0.22;
        float fold4 = sin(uv.x * 6.5 + uv.y * 2.5 + t * 1.0) * 0.10;
        float wrinkle = (noise(uv * 14.0 + vec2(t * 0.15, 0.0)) - 0.5) * 0.10;
        float sag = uv.x * (1.0 - uv.y) * 0.4;

        return (fold1 + fold2 + fold3 + fold4 + wrinkle - sag) * edgeX * edgeY;
      }

      float mouseAt(vec2 uv, vec2 mouseUv) {
        float d = distance(uv, mouseUv);
        return exp(-d * d * 5.0) * uMouseInfluence;
      }

      void main() {
        vUv = uv;
        vec3 pos = position;
        float t = uTime;

        float edgeX = smoothstep(0.0, 0.85, uv.x);
        vEdge = edgeX;

        float disp = displaceAt(uv, t);

        float intro = clamp(uIntro, 0.0, 1.0);
        float introInv = 1.0 - intro;
        pos.z -= introInv * (sin(uv.x * 5.0 + uv.y * 2.0) * 0.6 + (1.0 - uv.y) * 1.4) * 1.4;
        pos.y -= introInv * 1.4 * uv.x;
        pos.x -= introInv * 0.4 * (1.0 - uv.x);

        pos.z += disp * intro;

        vec2 mouseUv = uMouse * 0.5 + 0.5;
        float pull = mouseAt(uv, mouseUv);
        pos.z += pull * 0.55 * edgeX;
        pos.xy += (mouseUv - uv) * pull * 0.28 * edgeX;

        vDisplacement = disp + pull * 0.55 * edgeX;

        float eps = 0.004;
        float hR = displaceAt(uv + vec2(eps, 0.0), t) + mouseAt(uv + vec2(eps, 0.0), mouseUv) * 0.55 * smoothstep(0.0, 0.85, uv.x + eps);
        float hL = displaceAt(uv - vec2(eps, 0.0), t) + mouseAt(uv - vec2(eps, 0.0), mouseUv) * 0.55 * smoothstep(0.0, 0.85, uv.x - eps);
        float hU = displaceAt(uv + vec2(0.0, eps), t) + mouseAt(uv + vec2(0.0, eps), mouseUv) * 0.55 * edgeX;
        float hD = displaceAt(uv - vec2(0.0, eps), t) + mouseAt(uv - vec2(0.0, eps), mouseUv) * 0.55 * edgeX;

        vec3 dx = vec3(eps * 16.0, 0.0, hR - hL);
        vec3 dy = vec3(0.0, eps * 10.0, hU - hD);
        vec3 N = normalize(cross(dx, dy));
        vNormal = N;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        vViewDir = normalize(-mvPosition.xyz);

        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = /* glsl */ `
      uniform sampler2D uTex;
      uniform float uTime;
      uniform float uIntro;
      uniform vec3 uLight1Color;
      uniform vec3 uLight2Color;
      uniform float uAmbient;
      uniform float uDiffuse1;
      uniform float uDiffuse2;
      uniform float uSpecular1;
      uniform float uSpecular2;
      uniform float uRimStrength;
      uniform float uAoFloor;
      uniform float uVignetteFloor;
      uniform float uExposure;

      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewDir;
      varying float vDisplacement;
      varying float vEdge;

      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1,0)), u.x),
                   mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
      }

      void main() {
        vec3 N = normalize(vNormal);
        vec3 V = normalize(vViewDir);

        vec3 light1Dir = normalize(vec3(-0.55, 0.45, 0.85));
        vec3 light2Dir = normalize(vec3(0.85, -0.35, 0.55));

        float NdotL1 = max(dot(N, light1Dir), 0.0);
        float NdotL2 = max(dot(N, light2Dir), 0.0);

        vec3 H1 = normalize(light1Dir + V);
        float spec1 = pow(max(dot(N, H1), 0.0), 28.0);

        vec3 H2 = normalize(light2Dir + V);
        float spec2 = pow(max(dot(N, H2), 0.0), 22.0);

        float fresnel = pow(1.0 - max(dot(N, V), 0.0), 2.2);

        float weave = (noise(vUv * vec2(900.0, 600.0)) - 0.5) * 0.15
                    + (noise(vUv * vec2(180.0, 120.0)) - 0.5) * 0.08
                    + (noise(vUv * 35.0) - 0.5) * 0.05;

        vec3 albedo = texture2D(uTex, vUv).rgb;

        float ao = smoothstep(-0.6, 0.4, vDisplacement);
        ao = mix(uAoFloor, 1.0, ao);

        vec3 ambient = albedo * uAmbient;
        vec3 diffuse = albedo * (NdotL1 * uDiffuse1 * uLight1Color + NdotL2 * uDiffuse2 * uLight2Color);
        vec3 specular = uLight1Color * spec1 * uSpecular1 + uLight2Color * spec2 * uSpecular2;
        vec3 rim = mix(uLight2Color, uLight1Color, 0.4) * fresnel * uRimStrength;

        vec3 col = ambient + diffuse + specular + rim;
        col *= ao;
        col *= 1.0 + weave;

        float vignette = smoothstep(1.2, 0.3, length(vUv - 0.5) * 1.4);
        col *= mix(uVignetteFloor, 1.0, vignette);

        col *= clamp(uIntro * uExposure, 0.0, 1.0);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const geometry = new THREE.PlaneGeometry(16, 10, 140, 90);

    const lightUniforms = isLight
      ? {
          uLight1Color: new THREE.Color(0.78, 0.86, 1.05),
          uLight2Color: new THREE.Color(1.1, 0.86, 0.62),
          uAmbient: 0.85,
          uDiffuse1: 0.32,
          uDiffuse2: 0.28,
          uSpecular1: 0.22,
          uSpecular2: 0.42,
          uRimStrength: 0.35,
          uAoFloor: 0.82,
          uVignetteFloor: 0.92,
          uExposure: 1.0,
        }
      : {
          uLight1Color: new THREE.Color(0.42, 0.62, 1.05),
          uLight2Color: new THREE.Color(1.15, 0.55, 0.22),
          uAmbient: 0.18,
          uDiffuse1: 0.7,
          uDiffuse2: 0.55,
          uSpecular1: 0.55,
          uSpecular2: 1.1,
          uRimStrength: 0.7,
          uAoFloor: 0.55,
          uVignetteFloor: 0.7,
          uExposure: 1.1,
        };

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseInfluence: { value: 0 },
        uIntro: { value: 0 },
        uTex: { value: clothTex },
        uLight1Color: { value: lightUniforms.uLight1Color },
        uLight2Color: { value: lightUniforms.uLight2Color },
        uAmbient: { value: lightUniforms.uAmbient },
        uDiffuse1: { value: lightUniforms.uDiffuse1 },
        uDiffuse2: { value: lightUniforms.uDiffuse2 },
        uSpecular1: { value: lightUniforms.uSpecular1 },
        uSpecular2: { value: lightUniforms.uSpecular2 },
        uRimStrength: { value: lightUniforms.uRimStrength },
        uAoFloor: { value: lightUniforms.uAoFloor },
        uVignetteFloor: { value: lightUniforms.uVignetteFloor },
        uExposure: { value: lightUniforms.uExposure },
      },
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
    });

    const cloth = new THREE.Mesh(geometry, material);
    cloth.position.set(0, 0, 0);
    cloth.rotation.z = -0.02;
    scene.add(cloth);

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      const visibleHeight =
        2 * Math.tan(((camera.fov * Math.PI) / 180) / 2) * camera.position.z;
      const visibleWidth = visibleHeight * camera.aspect;
      const scaleX = (visibleWidth * 1.05) / 16;
      const scaleY = (visibleHeight * 1.1) / 10;
      const scale = Math.max(scaleX, scaleY);
      cloth.scale.set(scale, scale, 1);
    }
    window.addEventListener("resize", resize);
    resize();

    const mouse = { x: 0, y: 0, tx: 0, ty: 0, influence: 0, tInfluence: 0 };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.ty = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.tInfluence = 1.0;
    };
    const onMouseLeave = () => { mouse.tInfluence = 0; };
    const onMouseEnter = () => { mouse.tInfluence = 1; };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length) {
        const t = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        mouse.tx = ((t.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.ty = -(((t.clientY - rect.top) / rect.height) * 2 - 1);
        mouse.tInfluence = 1.0;
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    const clock = new THREE.Clock();
    let intro = 0;
    let animId: number;

    function tick() {
      const t = clock.getElapsedTime();

      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      mouse.influence += (mouse.tInfluence - mouse.influence) * 0.03;

      intro += (1 - intro) * 0.011;

      material.uniforms.uTime.value = t;
      material.uniforms.uMouse.value.set(mouse.x, mouse.y);
      material.uniforms.uMouseInfluence.value = mouse.influence;
      material.uniforms.uIntro.value = Math.min(intro, 1);

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
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("touchmove", onTouchMove);
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
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}
