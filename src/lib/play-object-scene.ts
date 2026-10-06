import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export interface PlayObjectScene {
  setGame: (slug: string) => void;
  setVisible: (visible: boolean) => void;
  point: (x: number, y: number) => void;
  shuffle: () => void;
  dispose: () => void;
}

type Theme = "mahjong" | "tile" | "arrow";
const themeFor = (slug: string): Theme =>
  slug === "tile-journey" ? "tile" : slug === "arrow-out" ? "arrow" : "mahjong";
const NOVA_MARKS = [
  "tile_dot_6",
  "tile_bamboo_3",
  "tile_character_5",
  "tile_dragon_red",
  "tile_flower_orchid",
  "tile_flower_chrysanthemum",
];

// These are exact copies of the shipped Nova Mahjong face assets, not redrawn marks.
const ASSET_PATHS = [
  ...NOVA_MARKS.map((mark) => `/game-assets/nova-mahjong/${mark}.png`),
  "/images/tile-journey.webp",
  "/images/arrow-out.webp",
];

export async function createPlayObjectScene(
  host: HTMLElement,
  slug: string,
  onUnavailable: () => void,
): Promise<PlayObjectScene> {
  const loader = new THREE.TextureLoader();
  const results = await Promise.allSettled(ASSET_PATHS.map((path) => loader.loadAsync(path)));
  const textures = results.flatMap((result) =>
    result.status === "fulfilled" ? [result.value] : [],
  );
  if (results.some((result) => result.status === "rejected")) {
    textures.forEach((texture) => {
      texture.dispose();
    });
    throw new Error("Game artwork could not be loaded");
  }
  textures.forEach((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
  });
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
  } catch (error) {
    textures.forEach((texture) => {
      texture.dispose();
    });
    throw error;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  const canvas = renderer.domElement;
  host.appendChild(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 60);
  camera.position.set(7, 10, 12);
  camera.lookAt(0, -0.35, 0);
  scene.add(new THREE.HemisphereLight(0xfff9e8, 0x607367, 1.5));
  const key = new THREE.DirectionalLight(0xfff4dc, 2.5);
  key.position.set(-3, 9, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6, near: 0.5, far: 24 });
  key.shadow.normalBias = 0.035;
  key.shadow.bias = -0.0003;
  key.shadow.radius = 3;
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xe7f5ff, 0.75);
  fill.position.set(6, 4, -5);
  scene.add(fill);

  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const geometry = <T extends THREE.BufferGeometry>(value: T) => {
    geometries.add(value);
    return value;
  };
  const material = <T extends THREE.Material>(value: T) => {
    materials.add(value);
    return value;
  };
  const group = new THREE.Group();
  scene.add(group);
  const plinth = new THREE.Mesh(
    geometry(new THREE.CylinderGeometry(3.65, 3.7, 0.25, 80)),
    material(new THREE.MeshStandardMaterial({ color: 0xcbd7b8, roughness: 0.85 })),
  );
  plinth.position.y = -0.75;
  plinth.receiveShadow = true;
  plinth.castShadow = true;
  group.add(plinth);
  const rim = new THREE.Mesh(
    geometry(new THREE.TorusGeometry(3.48, 0.016, 6, 100)),
    material(new THREE.MeshStandardMaterial({ color: 0x768d6e, roughness: 0.9 })),
  );
  rim.rotation.x = -Math.PI / 2;
  rim.position.y = -0.619;
  group.add(rim);
  const floor = new THREE.Mesh(
    geometry(new THREE.PlaneGeometry(200, 200)),
    material(new THREE.ShadowMaterial({ opacity: 0.12 })),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.89;
  floor.receiveShadow = true;
  scene.add(floor);

  const bodyGeometry = geometry(new RoundedBoxGeometry(1.23, 0.43, 1.62, 3, 0.12));
  const backGeometry = geometry(new RoundedBoxGeometry(1.24, 0.16, 1.63, 3, 0.075));
  const faceGeometry = geometry(new THREE.PlaneGeometry(1.02, 1.38));
  const bodyMaterial = material(
    new THREE.MeshStandardMaterial({ color: 0xfffbed, roughness: 0.32 }),
  );
  const backMaterial = material(
    new THREE.MeshStandardMaterial({ color: 0x37604f, roughness: 0.45 }),
  );
  const faceMaterials = textures
    .slice(0, 6)
    .map((texture) =>
      material(new THREE.MeshBasicMaterial({ map: texture, transparent: true, toneMapped: false })),
    );
  // Other titles currently have verified key art only. Keep that artwork intact
  // instead of inventing replacement game pieces or labelling it gameplay.
  const poster = new THREE.Group();
  const posterBody = new THREE.Mesh(
    geometry(new RoundedBoxGeometry(6.4, 3.65, 0.22, 3, 0.1)),
    bodyMaterial,
  );
  posterBody.castShadow = true;
  poster.add(posterBody);
  const posterMaterials = textures
    .slice(6)
    .map((texture) => material(new THREE.MeshBasicMaterial({ map: texture, toneMapped: false })));
  const posterFace = new THREE.Mesh(
    geometry(new THREE.PlaneGeometry(6.1, 3.2025)),
    posterMaterials[0],
  );
  posterFace.position.z = 0.115;
  poster.add(posterFace);
  poster.position.y = 0.8;
  poster.rotation.set(-0.38, 0.4, -0.06);
  group.add(poster);
  const tiles = Array.from({ length: 9 }, (_, index) => {
    const object = new THREE.Group();
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    object.add(body);
    const back = new THREE.Mesh(backGeometry, backMaterial);
    back.position.y = -0.24;
    back.castShadow = true;
    object.add(back);
    const face = new THREE.Mesh(faceGeometry, faceMaterials[index % 6]);
    face.rotation.x = -Math.PI / 2;
    face.position.y = 0.217;
    object.add(face);
    group.add(object);
    return { object, face, target: new THREE.Vector3(), angle: 0, delay: index * 0.025 };
  });

  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let theme = themeFor(slug);
  let arrangement = 0;
  let visible = true;
  let disposed = false;
  let frame = 0;
  let start = 0;
  let previous = 0;
  let pointerX = 0;
  let pointerY = 0;

  function render() {
    if (disposed) return;
    try {
      renderer.render(scene, camera);
    } catch {
      fail();
    }
  }
  function finish() {
    group.rotation.y = pointerX * 0.18;
    group.rotation.x = pointerY * 0.06;
    poster.rotation.z = arrangement % 2 ? 0.07 : -0.06;
    for (const tile of tiles) {
      tile.object.position.copy(tile.target);
      tile.object.rotation.set(0, tile.angle, 0);
    }
  }
  function animate(now: number) {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    const elapsed = (now - start) / 1000;
    const delta = Math.min((now - previous) / 1000, 0.05);
    previous = now;
    const blend = 1 - Math.exp(-delta * 9);
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, pointerX * 0.18, blend);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, pointerY * 0.06, blend);
    poster.rotation.z = THREE.MathUtils.lerp(
      poster.rotation.z,
      arrangement % 2 ? 0.07 : -0.06,
      blend,
    );
    for (const tile of tiles) {
      if (elapsed < tile.delay) continue;
      tile.object.position.lerp(tile.target, blend);
      tile.object.rotation.y = THREE.MathUtils.lerp(tile.object.rotation.y, tile.angle, blend);
    }
    if (elapsed > 1.4) finish();
    render();
    if (elapsed <= 1.4 && !disposed) frame = requestAnimationFrame(animate);
  }
  function invalidate() {
    if (disposed) return;
    cancelAnimationFrame(frame);
    frame = 0;
    if (motion.matches) {
      finish();
      if (visible && !document.hidden) render();
      return;
    }
    if (!visible || document.hidden) return;
    start = previous = performance.now();
    frame = requestAnimationFrame(animate);
  }
  function arrange() {
    const spread = arrangement % 2 === 1;
    const faces = faceMaterials;
    const isBoard = theme === "mahjong";
    poster.visible = !isBoard;
    plinth.visible = isBoard;
    rim.visible = isBoard;
    posterFace.material = posterMaterials[theme === "arrow" ? 1 : 0];
    tiles.forEach((tile) => {
      tile.object.visible = isBoard;
    });
    backMaterial.color.set(theme === "arrow" ? 0xd16b48 : theme === "tile" ? 0x8b9b41 : 0x37604f);
    plinth.material.color.set(
      theme === "arrow" ? 0xe4af97 : theme === "tile" ? 0xcbd08c : 0xc2d3b6,
    );
    tiles.forEach((tile, index) => {
      const col = (index % 3) - 1;
      const row = Math.floor(index / 3) - 1;
      const layer = !spread && index >= 6;
      const x = spread ? col * 1.62 : col * 1.42 + (layer ? 0.3 : -0.2);
      const z = spread ? row * 1.8 : (layer ? 0 : row) * 1.74 + (layer ? 0.1 : 0.65);
      tile.target.set(x, layer ? 0.27 : -0.28, z);
      tile.angle = spread ? Math.sin(index * 5 + arrangement) * 0.19 : layer ? -0.12 : 0.03;
      tile.face.material = faces[(index + arrangement) % faces.length];
    });
    invalidate();
  }
  function resize() {
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (!width || !height || disposed) return;
    renderer.setSize(width, height, false);
    const aspect = width / height;
    const halfHeight = Math.max(4.25, 4.25 / aspect);
    camera.left = -halfHeight * aspect;
    camera.right = halfHeight * aspect;
    camera.top = halfHeight;
    camera.bottom = -halfHeight;
    camera.updateProjectionMatrix();
    invalidate();
  }
  const resizeObserver = new ResizeObserver(resize);
  const visibilityChange = () => invalidate();
  const contextLost = (event: Event) => {
    event.preventDefault();
    fail();
  };
  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    document.removeEventListener("visibilitychange", visibilityChange);
    motion.removeEventListener("change", invalidate);
    canvas.removeEventListener("webglcontextlost", contextLost);
    geometries.forEach((item) => {
      item.dispose();
    });
    materials.forEach((item) => {
      item.dispose();
    });
    textures.forEach((item) => {
      item.dispose();
    });
    key.shadow.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
  }
  function fail() {
    dispose();
    onUnavailable();
  }
  canvas.addEventListener("webglcontextlost", contextLost);
  document.addEventListener("visibilitychange", visibilityChange);
  motion.addEventListener("change", invalidate);
  resizeObserver.observe(host);
  arrange();
  finish();
  resize();
  render();
  if (disposed) throw new Error("The 3D display could not render its first frame");
  return {
    setGame(nextSlug) {
      if (disposed) return;
      theme = themeFor(nextSlug);
      arrangement = 0;
      tiles.forEach((tile) => {
        tile.object.position.y += 1.2;
      });
      arrange();
    },
    setVisible(nextVisible) {
      visible = nextVisible;
      invalidate();
    },
    point(x, y) {
      pointerX = x;
      pointerY = y;
      invalidate();
    },
    shuffle() {
      if (disposed) return;
      arrangement++;
      tiles.forEach((tile) => {
        tile.object.position.y += 0.7;
      });
      arrange();
    },
    dispose,
  };
}
