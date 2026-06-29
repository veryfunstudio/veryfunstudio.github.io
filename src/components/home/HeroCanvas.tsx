import { useEffect, useRef } from "react";

const SURFACE_VERTEX = `
attribute vec2 aPosition;
attribute vec2 aUv;
varying vec2 vUv;

void main() {
  vUv = aUv;
  gl_Position = vec4(aPosition, 0.0, 1.0);
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
attribute vec3 aPosition;
attribute float aSeed;
attribute float aScale;
uniform float uTime;
uniform float uScroll;
uniform vec2 uPointer;
uniform vec2 uCamera;
uniform float uAspect;
uniform float uRotationX;
uniform float uRotationY;
varying float vSeed;

vec3 rotateX(vec3 p, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return vec3(p.x, p.y * c - p.z * s, p.y * s + p.z * c);
}

vec3 rotateY(vec3 p, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return vec3(p.x * c + p.z * s, p.y, -p.x * s + p.z * c);
}

void main() {
  vSeed = aSeed;
  vec3 pos = aPosition;
  float phase = uTime * (0.18 + aSeed * 0.22) + aSeed * 18.849;
  pos.x += sin(phase + aPosition.y * 0.55) * 0.18;
  pos.y += cos(phase * 0.82 + aPosition.x * 0.32) * 0.12;
  pos.z += sin(phase * 0.7) * 0.24;
  pos.y += uScroll * 0.55;

  vec2 pointer = (uPointer - 0.5) * vec2(8.0, 4.5);
  float repel = smoothstep(1.8, 0.0, distance(pos.xy, pointer));
  pos.xy += normalize(pos.xy - pointer + 0.0001) * repel * 0.22;

  pos = rotateY(pos, uRotationY);
  pos = rotateX(pos, uRotationX);
  pos.xy -= uCamera;

  float viewZ = pos.z - 10.0;
  float depth = max(-viewZ, 0.1);
  float perspective = 2.41421356 / depth;
  gl_PointSize = aScale * (180.0 / depth);
  gl_Position = vec4(pos.x * perspective / max(uAspect, 0.001), pos.y * perspective, 0.0, 1.0);
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

const SURFACE_VERTICES = new Float32Array([
  -1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, -1, 1, 0, 1, 1, -1, 1, 0, 1, 1, 1, 1,
]);

function createSeededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function hexToRgb(hex: string): [number, number, number] {
  const value = Number.parseInt(hex.slice(1), 16);
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255];
}

function colorTokenToRgb(style: CSSStyleDeclaration, token: string, fallback: string) {
  const value = style.getPropertyValue(token).trim() || fallback;
  if (!value.startsWith("#")) return hexToRgb(fallback);
  return hexToRgb(value);
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string) {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) return null;

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

function setVec3(
  gl: WebGLRenderingContext,
  location: WebGLUniformLocation | null,
  value: [number, number, number],
) {
  if (location) gl.uniform3f(location, value[0], value[1], value[2]);
}

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      container.dataset.webglFallback = "true";
      return;
    }

    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: "high-performance",
      premultipliedAlpha: true,
    });

    if (!gl) {
      container.dataset.webglFallback = "true";
      return;
    }

    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const surfaceProgram = createProgram(gl, SURFACE_VERTEX, SURFACE_FRAGMENT);
    const particleProgram = createProgram(gl, PARTICLE_VERTEX, PARTICLE_FRAGMENT);
    if (!surfaceProgram || !particleProgram) {
      container.dataset.webglFallback = "true";
      if (surfaceProgram) gl.deleteProgram(surfaceProgram);
      if (particleProgram) gl.deleteProgram(particleProgram);
      container.removeChild(canvas);
      return;
    }

    const pointer = { x: 0.5, y: 0.5 };
    const targetPointer = { x: 0.5, y: 0.5 };
    const resolution = { width: 1, height: 1, pixelRatio: 1 };
    const rootStyle = getComputedStyle(document.documentElement);
    const ink = colorTokenToRgb(rootStyle, "--color-background", "#07080d");
    const amber = colorTokenToRgb(rootStyle, "--color-accent", "#c8ff3d");
    const pearl = colorTokenToRgb(rootStyle, "--color-foreground", "#f4f7e8");

    const surfaceBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, surfaceBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, SURFACE_VERTICES, gl.STATIC_DRAW);

    const count = 2200;
    const random = createSeededRandom(42);
    const particleData = new Float32Array(count * 5);

    for (let i = 0; i < count; i++) {
      const offset = i * 5;
      const depth = random();
      particleData[offset] = (random() - 0.5) * 17;
      particleData[offset + 1] = (random() - 0.5) * 9.5;
      particleData[offset + 2] = -1.5 - depth * 13;
      particleData[offset + 3] = random();
      particleData[offset + 4] = 0.06 + random() * 0.1;
    }

    const particleBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, particleBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, particleData, gl.STATIC_DRAW);

    const surfaceLocations = {
      position: gl.getAttribLocation(surfaceProgram, "aPosition"),
      uv: gl.getAttribLocation(surfaceProgram, "aUv"),
      time: gl.getUniformLocation(surfaceProgram, "uTime"),
      scroll: gl.getUniformLocation(surfaceProgram, "uScroll"),
      resolution: gl.getUniformLocation(surfaceProgram, "uResolution"),
      pointer: gl.getUniformLocation(surfaceProgram, "uPointer"),
      ink: gl.getUniformLocation(surfaceProgram, "uInk"),
      amber: gl.getUniformLocation(surfaceProgram, "uAmber"),
      pearl: gl.getUniformLocation(surfaceProgram, "uPearl"),
    };

    const particleLocations = {
      position: gl.getAttribLocation(particleProgram, "aPosition"),
      seed: gl.getAttribLocation(particleProgram, "aSeed"),
      scale: gl.getAttribLocation(particleProgram, "aScale"),
      time: gl.getUniformLocation(particleProgram, "uTime"),
      scroll: gl.getUniformLocation(particleProgram, "uScroll"),
      pointer: gl.getUniformLocation(particleProgram, "uPointer"),
      camera: gl.getUniformLocation(particleProgram, "uCamera"),
      aspect: gl.getUniformLocation(particleProgram, "uAspect"),
      rotationX: gl.getUniformLocation(particleProgram, "uRotationX"),
      rotationY: gl.getUniformLocation(particleProgram, "uRotationY"),
      amber: gl.getUniformLocation(particleProgram, "uAmber"),
      pearl: gl.getUniformLocation(particleProgram, "uPearl"),
    };

    const resize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      const pixelRatio = Math.min(window.devicePixelRatio, 1.75);
      canvas.width = Math.max(Math.floor(width * pixelRatio), 1);
      canvas.height = Math.max(Math.floor(height * pixelRatio), 1);
      resolution.width = width;
      resolution.height = height;
      resolution.pixelRatio = pixelRatio;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const updatePointer = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      targetPointer.x = (event.clientX - rect.left) / Math.max(rect.width, 1);
      targetPointer.y = 1 - (event.clientY - rect.top) / Math.max(rect.height, 1);
    };

    const startedAt = performance.now();
    let raf = 0;

    const render = () => {
      const elapsed = (performance.now() - startedAt) / 1000;
      pointer.x += (targetPointer.x - pointer.x) * 0.075;
      pointer.y += (targetPointer.y - pointer.y) * 0.075;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.disable(gl.DEPTH_TEST);

      gl.useProgram(surfaceProgram);
      gl.bindBuffer(gl.ARRAY_BUFFER, surfaceBuffer);
      gl.enableVertexAttribArray(surfaceLocations.position);
      gl.vertexAttribPointer(surfaceLocations.position, 2, gl.FLOAT, false, 16, 0);
      gl.enableVertexAttribArray(surfaceLocations.uv);
      gl.vertexAttribPointer(surfaceLocations.uv, 2, gl.FLOAT, false, 16, 8);
      gl.uniform1f(surfaceLocations.time, elapsed);
      gl.uniform1f(surfaceLocations.scroll, 0);
      gl.uniform2f(surfaceLocations.resolution, resolution.width, resolution.height);
      gl.uniform2f(surfaceLocations.pointer, pointer.x, pointer.y);
      setVec3(gl, surfaceLocations.ink, ink);
      setVec3(gl, surfaceLocations.amber, amber);
      setVec3(gl, surfaceLocations.pearl, pearl);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      gl.useProgram(particleProgram);
      gl.bindBuffer(gl.ARRAY_BUFFER, particleBuffer);
      gl.enableVertexAttribArray(particleLocations.position);
      gl.vertexAttribPointer(particleLocations.position, 3, gl.FLOAT, false, 20, 0);
      gl.enableVertexAttribArray(particleLocations.seed);
      gl.vertexAttribPointer(particleLocations.seed, 1, gl.FLOAT, false, 20, 12);
      gl.enableVertexAttribArray(particleLocations.scale);
      gl.vertexAttribPointer(particleLocations.scale, 1, gl.FLOAT, false, 20, 16);
      gl.uniform1f(particleLocations.time, elapsed);
      gl.uniform1f(particleLocations.scroll, 0);
      gl.uniform2f(particleLocations.pointer, pointer.x, pointer.y);
      gl.uniform2f(particleLocations.camera, (pointer.x - 0.5) * 0.55, (pointer.y - 0.5) * 0.35);
      gl.uniform1f(particleLocations.aspect, resolution.width / Math.max(resolution.height, 1));
      gl.uniform1f(particleLocations.rotationX, Math.sin(elapsed * 0.12) * 0.025);
      gl.uniform1f(particleLocations.rotationY, elapsed * 0.025);
      setVec3(gl, particleLocations.amber, amber);
      setVec3(gl, particleLocations.pearl, pearl);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      gl.drawArrays(gl.POINTS, 0, count);

      raf = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointer);
      gl.deleteBuffer(surfaceBuffer);
      gl.deleteBuffer(particleBuffer);
      gl.deleteProgram(surfaceProgram);
      gl.deleteProgram(particleProgram);
      if (container.contains(canvas)) {
        container.removeChild(canvas);
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
