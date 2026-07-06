import{K as e,Z as t,t as n}from"./jsx-runtime-ShAEzt4g.js";var r=t(e(),1),i=n(),a=`
attribute vec2 aPosition;
attribute vec2 aUv;
varying vec2 vUv;

void main() {
  vUv = aUv;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`,o=`
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
`,s=`
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
`,c=`
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
`,l=new Float32Array([-1,-1,0,0,1,-1,1,0,-1,1,0,1,-1,1,0,1,1,-1,1,0,1,1,1,1]);function u(e){let t=e;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function d(e){let t=Number.parseInt(e.slice(1),16);return[(t>>16&255)/255,(t>>8&255)/255,(t&255)/255]}function f(e,t,n){let r=e.getPropertyValue(t).trim()||n;return r.startsWith(`#`)?d(r):d(n)}function p(e,t,n){let r=e.createShader(t);return r?(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(e.deleteShader(r),null)):null}function m(e,t,n){let r=p(e,e.VERTEX_SHADER,t),i=p(e,e.FRAGMENT_SHADER,n),a=e.createProgram();return!r||!i||!a?null:(e.attachShader(a,r),e.attachShader(a,i),e.linkProgram(a),e.deleteShader(r),e.deleteShader(i),e.getProgramParameter(a,e.LINK_STATUS)?a:(e.deleteProgram(a),null))}function h(e,t,n){t&&e.uniform3f(t,n[0],n[1],n[2])}function g(){let e=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let t=e.current;if(!t)return;if(window.matchMedia(`(prefers-reduced-motion: reduce)`).matches){t.dataset.webglFallback=`true`;return}let n=document.createElement(`canvas`),r=n.getContext(`webgl`,{alpha:!0,antialias:!1,depth:!1,powerPreference:`high-performance`,premultipliedAlpha:!0});if(!r){t.dataset.webglFallback=`true`;return}n.style.width=`100%`,n.style.height=`100%`,n.style.display=`block`,t.appendChild(n);let i=m(r,a,o),d=m(r,s,c);if(!i||!d){t.dataset.webglFallback=`true`,i&&r.deleteProgram(i),d&&r.deleteProgram(d),t.removeChild(n);return}let p={x:.5,y:.5},g={x:.5,y:.5},_={width:1,height:1,pixelRatio:1},v=getComputedStyle(document.documentElement),y=f(v,`--color-background`,`#07080d`),b=f(v,`--color-accent`,`#c8ff3d`),x=f(v,`--color-foreground`,`#f4f7e8`),S=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,S),r.bufferData(r.ARRAY_BUFFER,l,r.STATIC_DRAW);let C=2200,w=u(42),T=new Float32Array(C*5);for(let e=0;e<C;e++){let t=e*5,n=w();T[t]=(w()-.5)*17,T[t+1]=(w()-.5)*9.5,T[t+2]=-1.5-n*13,T[t+3]=w(),T[t+4]=.06+w()*.1}let E=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,E),r.bufferData(r.ARRAY_BUFFER,T,r.STATIC_DRAW);let D={position:r.getAttribLocation(i,`aPosition`),uv:r.getAttribLocation(i,`aUv`),time:r.getUniformLocation(i,`uTime`),scroll:r.getUniformLocation(i,`uScroll`),resolution:r.getUniformLocation(i,`uResolution`),pointer:r.getUniformLocation(i,`uPointer`),ink:r.getUniformLocation(i,`uInk`),amber:r.getUniformLocation(i,`uAmber`),pearl:r.getUniformLocation(i,`uPearl`)},O={position:r.getAttribLocation(d,`aPosition`),seed:r.getAttribLocation(d,`aSeed`),scale:r.getAttribLocation(d,`aScale`),time:r.getUniformLocation(d,`uTime`),scroll:r.getUniformLocation(d,`uScroll`),pointer:r.getUniformLocation(d,`uPointer`),camera:r.getUniformLocation(d,`uCamera`),aspect:r.getUniformLocation(d,`uAspect`),rotationX:r.getUniformLocation(d,`uRotationX`),rotationY:r.getUniformLocation(d,`uRotationY`),amber:r.getUniformLocation(d,`uAmber`),pearl:r.getUniformLocation(d,`uPearl`)},k=()=>{let e=Math.max(t.clientWidth,1),i=Math.max(t.clientHeight,1),a=Math.min(window.devicePixelRatio,1.75);n.width=Math.max(Math.floor(e*a),1),n.height=Math.max(Math.floor(i*a),1),_.width=e,_.height=i,_.pixelRatio=a,r.viewport(0,0,n.width,n.height)},A=e=>{let n=t.getBoundingClientRect();g.x=(e.clientX-n.left)/Math.max(n.width,1),g.y=1-(e.clientY-n.top)/Math.max(n.height,1)},j=performance.now(),M=0,N=()=>{let e=(performance.now()-j)/1e3;p.x+=(g.x-p.x)*.075,p.y+=(g.y-p.y)*.075,r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),r.disable(r.DEPTH_TEST),r.useProgram(i),r.bindBuffer(r.ARRAY_BUFFER,S),r.enableVertexAttribArray(D.position),r.vertexAttribPointer(D.position,2,r.FLOAT,!1,16,0),r.enableVertexAttribArray(D.uv),r.vertexAttribPointer(D.uv,2,r.FLOAT,!1,16,8),r.uniform1f(D.time,e),r.uniform1f(D.scroll,0),r.uniform2f(D.resolution,_.width,_.height),r.uniform2f(D.pointer,p.x,p.y),h(r,D.ink,y),h(r,D.amber,b),h(r,D.pearl,x),r.enable(r.BLEND),r.blendFunc(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA),r.drawArrays(r.TRIANGLES,0,6),r.useProgram(d),r.bindBuffer(r.ARRAY_BUFFER,E),r.enableVertexAttribArray(O.position),r.vertexAttribPointer(O.position,3,r.FLOAT,!1,20,0),r.enableVertexAttribArray(O.seed),r.vertexAttribPointer(O.seed,1,r.FLOAT,!1,20,12),r.enableVertexAttribArray(O.scale),r.vertexAttribPointer(O.scale,1,r.FLOAT,!1,20,16),r.uniform1f(O.time,e),r.uniform1f(O.scroll,0),r.uniform2f(O.pointer,p.x,p.y),r.uniform2f(O.camera,(p.x-.5)*.55,(p.y-.5)*.35),r.uniform1f(O.aspect,_.width/Math.max(_.height,1)),r.uniform1f(O.rotationX,Math.sin(e*.12)*.025),r.uniform1f(O.rotationY,e*.025),h(r,O.amber,b),h(r,O.pearl,x),r.blendFunc(r.SRC_ALPHA,r.ONE),r.drawArrays(r.POINTS,0,C),M=requestAnimationFrame(N)};return k(),window.addEventListener(`resize`,k),window.addEventListener(`pointermove`,A,{passive:!0}),M=requestAnimationFrame(N),()=>{cancelAnimationFrame(M),window.removeEventListener(`resize`,k),window.removeEventListener(`pointermove`,A),r.deleteBuffer(S),r.deleteBuffer(E),r.deleteProgram(i),r.deleteProgram(d),t.contains(n)&&t.removeChild(n)}},[]),(0,i.jsx)(`div`,{ref:e,className:`hero-canvas-fallback absolute inset-0`,style:{pointerEvents:`none`}})}export{g as default};