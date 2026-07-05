import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import BlobField from './BlobField'

/**
 * Some environments (VMs, remote desktops, hardware-acceleration-off
 * browser profiles, certain privacy extensions) don't support WebGL, or
 * fail silently when creating a context. Rather than leaving a blank
 * hero background in that case, we detect it up front and fall back to
 * the CSS blob field, which always renders.
 */
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch (e) {
    return false
  }
}

/**
 * A real 3D scene (WebGL via three.js) replacing the flat CSS blob field
 * behind the hero. Three organic, noise-displaced glass blobs drift and
 * tumble in space with a soft camera-facing core glow (not a full-surface
 * fresnel, which was blowing out to white) in the site's signature blue /
 * purple / pink palette, and tilt gently toward the cursor for a subtle
 * sense of depth and parallax.
 */

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  uniform float uFreq;
  varying vec3 vNormal;
  varying vec3 vPosition;

  // Classic Perlin-style simplex noise (Ashima Arts, condensed)
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}

  float snoise(vec3 v){
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
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
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
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vNormal = normalize(normalMatrix * normal);
    float n = snoise(position * uFreq + uTime);
    vec3 displaced = position + normal * n * uAmp;
    vPosition = displaced;
    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vec3 viewDir = normalize(-vPosition);
    float facing = clamp(dot(vNormal, viewDir), 0.0, 1.0);
    // Soft core glow: bright only where the surface faces the camera
    // dead-on, fading out toward the silhouette edge — mimics the
    // original radial-gradient blob rather than lighting the whole sphere.
    float glow = pow(facing, 2.6);
    float alpha = glow * 0.42;
    gl_FragColor = vec4(uColor, alpha);
  }
`

export default function HeroScene() {
  const mountRef = useRef(null)
  const [useFallback, setUseFallback] = useState(false)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    if (!isWebGLAvailable()) {
      setUseFallback(true)
      return
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer, scene, camera, blobs, rafId
    let handlePointerMove, handleResize

    try {
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100)
      camera.position.set(0, 0, 9)

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(mount.clientWidth, mount.clientHeight)
      renderer.setClearColor(0x000000, 0)
      mount.appendChild(renderer.domElement)

      const palette = [
        new THREE.Color('#4C6FFF'),
        new THREE.Color('#A855F7'),
        new THREE.Color('#FF4FA3')
      ]

      blobs = []
      // Positions mirror the original CSS blob layout: pushed toward the
      // corners/edges so the center stays clear for the headline, with
      // enough depth separation (z) that they don't stack into one another.
      const configs = [
        { pos: [-4.4, 1.6, -3], scale: 2.6, freq: 0.8, amp: 0.4, speed: 0.55 },
        { pos: [4.6, 0.4, -5], scale: 3.1, freq: 0.65, amp: 0.45, speed: 0.4 },
        { pos: [0.6, -3.4, -2], scale: 2.3, freq: 1.0, amp: 0.38, speed: 0.65 }
      ]

      configs.forEach((cfg, i) => {
        const geometry = new THREE.IcosahedronGeometry(1, 5)
        const material = new THREE.ShaderMaterial({
          vertexShader: VERTEX_SHADER,
          fragmentShader: FRAGMENT_SHADER,
          uniforms: {
            uTime: { value: Math.random() * 100 },
            uAmp: { value: cfg.amp },
            uFreq: { value: cfg.freq },
            uColor: { value: palette[i] }
          },
          transparent: true,
          depthWrite: false,
          depthTest: false,
          blending: THREE.NormalBlending,
          side: THREE.DoubleSide
        })
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(...cfg.pos)
        mesh.scale.setScalar(cfg.scale)
        mesh.userData = {
          speed: cfg.speed,
          rotX: (Math.random() - 0.5) * 0.15,
          rotY: (Math.random() - 0.5) * 0.15,
          floatOffset: Math.random() * Math.PI * 2
        }
        scene.add(mesh)
        blobs.push(mesh)
      })

      const pointer = { x: 0, y: 0 }
      const targetRotation = { x: 0, y: 0 }

      handlePointerMove = (e) => {
        const rect = mount.getBoundingClientRect()
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
        pointer.y = ((e.clientY - rect.top) / rect.height) * 2 - 1
      }
      window.addEventListener('pointermove', handlePointerMove)

      handleResize = () => {
        const w = mount.clientWidth
        const h = mount.clientHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      window.addEventListener('resize', handleResize)

      const clock = new THREE.Clock()

      const animate = () => {
        const elapsed = clock.getElapsedTime()

        if (!reducedMotion) {
          blobs.forEach((mesh) => {
            const { speed, rotX, rotY, floatOffset } = mesh.userData
            mesh.material.uniforms.uTime.value = elapsed * speed + floatOffset
            mesh.rotation.x += rotX * 0.018
            mesh.rotation.y += rotY * 0.018
            mesh.position.y += Math.sin(elapsed * 0.4 + floatOffset) * 0.003
          })

          targetRotation.x += (pointer.y * 0.15 - targetRotation.x) * 0.03
          targetRotation.y += (pointer.x * 0.2 - targetRotation.y) * 0.03
          scene.rotation.x = targetRotation.x
          scene.rotation.y = targetRotation.y
        }

        renderer.render(scene, camera)
        rafId = requestAnimationFrame(animate)
      }
      animate()
    } catch (err) {
      // WebGL context creation or shader compilation failed (unsupported
      // GPU/browser, disabled hardware acceleration, restrictive privacy
      // settings, etc). Fall back to the CSS blob field so the hero never
      // ends up with a blank background.
      console.warn('HeroScene: WebGL rendering unavailable, falling back to CSS background.', err)
      if (renderer && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
      setUseFallback(true)
      return
    }

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('resize', handleResize)
      blobs.forEach((mesh) => {
        mesh.geometry.dispose()
        mesh.material.dispose()
      })
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  if (useFallback) {
    return <BlobField />
  }

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 -z-0 opacity-85"
      style={{ filter: 'blur(50px) saturate(80%)' }}
      aria-hidden="true"
    />
  )
}
