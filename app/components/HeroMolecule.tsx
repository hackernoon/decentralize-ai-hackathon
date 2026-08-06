'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Simplex 3D noise GLSL
const NOISE_GLSL = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+10.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

// COLOR — default arg is the particle glow color (hex string)
function hsl152FullSat(lightness: number): [number, number, number] {
  const H = 152 / 360;
  const S = 1;
  const L = Math.max(0, Math.min(1, lightness));
  const C = (1 - Math.abs(2 * L - 1)) * S;
  const H60 = (152 / 60) % 6;
  const X = C * (1 - Math.abs((H60 % 2) - 1));
  let r1 = 0, g1 = 0, b1 = 0;
  if (H60 >= 0 && H60 < 1) { r1 = C; g1 = X; b1 = 0; }
  else if (H60 >= 1 && H60 < 2) { r1 = X; g1 = C; b1 = 0; }
  else if (H60 >= 2 && H60 < 3) { r1 = 0; g1 = C; b1 = X; }
  else if (H60 >= 3 && H60 < 4) { r1 = 0; g1 = X; b1 = C; }
  else if (H60 >= 4 && H60 < 5) { r1 = X; g1 = 0; b1 = C; }
  else { r1 = C; g1 = 0; b1 = X; }
  const m = L - C / 2;
  return [r1 + m, g1 + m, b1 + m];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
}

// COLOR — default arg is the particle glow color (hex string)
function makeDotTexture(size = 36, color = '#007a4d'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const half = size * 0.5;
  const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.45, color + 'bb');
  gradient.addColorStop(1, color + '00');
  ctx.fillStyle = gradient;
  const circle = new Path2D();
  circle.arc(half, half, half, 0, 2 * Math.PI);
  ctx.fill(circle);
  return new THREE.CanvasTexture(canvas);
}

export default function HeroMolecule() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene / camera / renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 2.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Molecule mesh
    const RADIUS = 0.9;
    const PARTICLE_SIZE_MIN = 0.012;
    const PARTICLE_SIZE_MAX = 0.015;

    // All colors are #00ff88 derivatives: same hue (152°) & saturation (100%), varying lightness only.
    const textureColor = rgbToHex(...hsl152FullSat(0.32));
    const baseColorHex = hsl152FullSat(0.4);
    const baseColorThree = new THREE.Color().setRGB(baseColorHex[0], baseColorHex[1], baseColorHex[2]);

    const geometry = new THREE.IcosahedronGeometry(1, 40);
    const material = new THREE.PointsMaterial({
      map: makeDotTexture(64, textureColor), // COLOR — particle glow (hex, same hue/sat as #00ff88)
      blending: THREE.AdditiveBlending,
      color: baseColorThree,                 // COLOR — base tint (same hue/sat, L=0.4)
      depthTest: false,
      transparent: true,
      opacity: 0.10,                         // COLOR — overall brightness (0–1)
      vertexColors: true,
    });

    // Per-vertex palette: #00ff88 derivatives, lightness only (0–1). Four stops blended by position.
    const posArray = geometry.attributes.position.array as Float32Array;
    const vertexCount = posArray.length / 3;
    const colorArray = new Float32Array(vertexCount * 3);
    const palette = [
      hsl152FullSat(0.08),  // COLOR stop 0 — darkest
      hsl152FullSat(0.22),  // COLOR stop 1
      hsl152FullSat(0.38),  // COLOR stop 2 — brightest
      hsl152FullSat(0.22),  // COLOR stop 3 — mirror
    ];
    for (let i = 0; i < vertexCount; i++) {
      const t = (posArray[i * 3] + posArray[i * 3 + 1] + posArray[i * 3 + 2]) * 0.5 + 0.5;
      // Smooth blend across palette based on position
      const scaled = ((t % 1 + 1) % 1) * palette.length;
      const idx = Math.floor(scaled) % palette.length;
      const next = (idx + 1) % palette.length;
      const frac = scaled - Math.floor(scaled);
      colorArray[i * 3]     = palette[idx][0] * (1 - frac) + palette[next][0] * frac;
      colorArray[i * 3 + 1] = palette[idx][1] * (1 - frac) + palette[next][1] * frac;
      colorArray[i * 3 + 2] = palette[idx][2] * (1 - frac) + palette[next][2] * frac;
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    // Inject custom shader
    let shaderRef: Parameters<THREE.Material['onBeforeCompile']>[0] | null = null;
    material.onBeforeCompile = (shader) => {
      shader.uniforms.time = { value: 0 };
      shader.uniforms.radius = { value: RADIUS };
      shader.uniforms.particleSizeMin = { value: PARTICLE_SIZE_MIN };
      shader.uniforms.particleSizeMax = { value: PARTICLE_SIZE_MAX };

      shader.vertexShader =
        NOISE_GLSL +
        'uniform float time;\n' +
        'uniform float radius;\n' +
        'uniform float particleSizeMin;\n' +
        'uniform float particleSizeMax;\n' +
        shader.vertexShader;

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        vec3 p = position;
        float n = snoise(vec3(p.x*0.6 + time*0.2, p.y*0.4 + time*0.3, p.z*0.2 + time*0.2));
        p += n * 0.4;
        float l = radius / length(p);
        p *= l;
        float s = mix(particleSizeMin, particleSizeMax, n);
        vec3 transformed = vec3(p.x, p.y, p.z);
        `,
      );

      shader.vertexShader = shader.vertexShader.replace(
        'gl_PointSize = size;',
        'gl_PointSize = s;',
      );

      shaderRef = shader;
      material.userData.shader = shader;
    };

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Animation loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;
      points.rotation.y = time * 0.2;
      if (shaderRef) shaderRef.uniforms.time.value = time;
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="absolute left-1/2 top-[36%] -translate-x-1/2 -translate-y-1/2 w-[105%] max-w-none h-[105%] aspect-square pointer-events-none opacity-70 sm:opacity-100 z-0"
    />
  );
}
