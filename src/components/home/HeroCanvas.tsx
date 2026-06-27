import { useEffect, useRef } from "react";
import * as THREE from "three";

const SURFACE_VERTEX = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const SURFACE_FRAGMENT = `
precision highp float;

uniform float uTime;
uniform float uScroll;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform vec3 uInk;
uniform vec3 uAmber;
uniform vec3 uPearl;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amp * noise(p);
    p = mat2(1.6, 1.2, -1.2, 1.6) * p;
    amp *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = vUv;
  vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
  vec2 p = (uv - 0.5) * aspect;
  vec2 pointer = (uPointer - 0.5) * aspect;

  float flow = fbm(p * 2.0 + vec2(uTime * 0.05, -uTime * 0.035));
  float detail = fbm(p * 7.0 - vec2(uTime * 0.09, uTime * 0.04));
  float ring = sin((length(p - pointer) * 22.0) - uTime * 4.0);
  float pointerGlow = smoothstep(0.56, 0.0, length(p - pointer));
  float scrollBand = smoothstep(0.018, 0.0, abs(fract((uv.y + uScroll * 0.22) * 10.0) - 0.5));
  float circuit = smoothstep(0.012, 0.0, abs(fract((uv.x + flow * 0.06 + uScroll * 0.1) * 14.0) - 0.5));
  float vignette = smoothstep(0.85, 0.18, length(p));

  vec3 color = mix(uInk, uAmber, flow * 0.42 + detail * 0.18);
  color = mix(color, uPearl, pointerGlow * 0.13);
  color += uAmber * max(ring, 0.0) * pointerGlow * 0.09;
  color += uPearl * scrollBand * 0.02;
  color += uAmber * circuit * 0.018;
  color *= vignette;

  float alpha = 0.72;
  gl_FragColor = vec4(color, alpha);
}
`;

const PARTICLE_VERTEX = `
attribute float aSeed;
attribute float aScale;
uniform float uTime;
uniform float uScroll;
uniform vec2 uPointer;
varying float vSeed;

void main() {
  vSeed = aSeed;
  vec3 pos = position;
  float phase = uTime * (0.18 + aSeed * 0.22) + aSeed * 18.849;
  pos.x += sin(phase + position.y * 0.55) * 0.18;
  pos.y += cos(phase * 0.82 + position.x * 0.32) * 0.12;
  pos.z += sin(phase * 0.7) * 0.24;
  pos.y += uScroll * 0.55;

  vec2 pointer = (uPointer - 0.5) * vec2(8.0, 4.5);
  float repel = smoothstep(1.8, 0.0, distance(pos.xy, pointer));
  pos.xy += normalize(pos.xy - pointer + 0.0001) * repel * 0.22;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = aScale * (180.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const PARTICLE_FRAGMENT = `
precision highp float;

uniform vec3 uAmber;
uniform vec3 uPearl;
varying float vSeed;

void main() {
  vec2 p = gl_PointCoord - 0.5;
  float d = length(p);
  float alpha = smoothstep(0.5, 0.0, d);
  alpha *= alpha;
  vec3 color = mix(uPearl, uAmber, step(0.68, vSeed));
  gl_FragColor = vec4(color, alpha * 0.58);
}
`;

function createSeededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = new THREE.Vector2(0.5, 0.5);
    const targetPointer = new THREE.Vector2(0.5, 0.5);
    const resolution = new THREE.Vector2(1, 1);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      container.dataset.webglFallback = "true";
      return;
    }
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);

    const surfaceScene = new THREE.Scene();
    const surfaceCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const sharedUniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uResolution: { value: resolution },
      uPointer: { value: pointer },
      uInk: { value: new THREE.Color("#07080d") },
      uAmber: { value: new THREE.Color("#c8ff3d") },
      uPearl: { value: new THREE.Color("#f4f7e8") },
    };

    const surfaceMaterial = new THREE.ShaderMaterial({
      uniforms: sharedUniforms,
      vertexShader: SURFACE_VERTEX,
      fragmentShader: SURFACE_FRAGMENT,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.NormalBlending,
    });
    const surfaceMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), surfaceMaterial);
    surfaceScene.add(surfaceMesh);

    const particleScene = new THREE.Scene();
    const particleCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 80);
    particleCamera.position.set(0, 0, 10);

    const count = reduceMotion ? 900 : 2200;
    const random = createSeededRandom(42);
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const depth = random();
      positions[i3] = (random() - 0.5) * 17;
      positions[i3 + 1] = (random() - 0.5) * 9.5;
      positions[i3 + 2] = -1.5 - depth * 13;
      seeds[i] = random();
      scales[i] = 0.06 + random() * 0.1;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    particleGeometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: sharedUniforms,
      vertexShader: PARTICLE_VERTEX,
      fragmentShader: PARTICLE_FRAGMENT,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particleScene.add(particles);

    const resize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      renderer.setSize(width, height, false);
      resolution.set(width, height);
      particleCamera.aspect = width / height;
      particleCamera.updateProjectionMatrix();
    };

    const updatePointer = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      targetPointer.set(
        (event.clientX - rect.left) / Math.max(rect.width, 1),
        1 - (event.clientY - rect.top) / Math.max(rect.height, 1),
      );
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", updatePointer, { passive: true });

    const clock = new THREE.Clock();
    let raf = 0;

    const render = () => {
      const elapsed = clock.getElapsedTime();
      const speed = reduceMotion ? 0.18 : 1;
      pointer.lerp(targetPointer, reduceMotion ? 0.035 : 0.075);
      sharedUniforms.uTime.value = elapsed * speed;
      sharedUniforms.uScroll.value = 0;

      particles.rotation.y = elapsed * 0.025 * speed;
      particles.rotation.x = Math.sin(elapsed * 0.12) * 0.025;
      particleCamera.position.x = (pointer.x - 0.5) * 0.55;
      particleCamera.position.y = (pointer.y - 0.5) * 0.35;
      particleCamera.lookAt(0, 0, -4);

      renderer.autoClear = true;
      renderer.render(surfaceScene, surfaceCamera);
      renderer.autoClear = false;
      renderer.render(particleScene, particleCamera);

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointer);
      surfaceMesh.geometry.dispose();
      surfaceMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="hero-canvas-fallback absolute inset-0"
      style={{ pointerEvents: "none" }}
    />
  );
}
