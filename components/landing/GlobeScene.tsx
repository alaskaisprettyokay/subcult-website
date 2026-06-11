'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Particle wireframe globe — a living version of the Subcult globe mark.
// Raw three.js (no R3F) for full control over the render loop, so we can
// pause off-screen and respect prefers-reduced-motion.
export default function GlobeScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
    } catch {
      return // WebGL unavailable — hero still works without the globe
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      40,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    )
    camera.position.z = 7

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.domElement.style.display = 'block'
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const R = 2.4
    const disposables: { dispose: () => void }[] = []

    // --- Particle sphere (fibonacci distribution, purple gradient by height)
    const COUNT = isMobile ? 1500 : 2800
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const cDark = new THREE.Color('#4C1D95')
    const cLight = new THREE.Color('#A78BFA')
    const golden = Math.PI * (3 - Math.sqrt(5))
    const tmp = new THREE.Color()
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2
      const radius = Math.sqrt(1 - y * y)
      const theta = golden * i
      positions[i * 3] = Math.cos(theta) * radius * R
      positions[i * 3 + 1] = y * R
      positions[i * 3 + 2] = Math.sin(theta) * radius * R
      tmp.lerpColors(cDark, cLight, (y + 1) / 2)
      colors[i * 3] = tmp.r
      colors[i * 3 + 1] = tmp.g
      colors[i * 3 + 2] = tmp.b
    }
    const pointsGeo = new THREE.BufferGeometry()
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pointsGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const pointsMat = new THREE.PointsMaterial({
      size: 0.028,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })
    disposables.push(pointsGeo, pointsMat)
    group.add(new THREE.Points(pointsGeo, pointsMat))

    // --- Wireframe lat/long rings, like the logo
    const ringMat = new THREE.LineBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.22,
    })
    disposables.push(ringMat)

    const makeRing = (radius: number) => {
      const pts: THREE.Vector3[] = []
      const SEG = 96
      for (let i = 0; i <= SEG; i++) {
        const a = (i / SEG) * Math.PI * 2
        pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius))
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts)
      disposables.push(geo)
      return new THREE.Line(geo, ringMat)
    }

    // Latitudes: equator plus two above / two below
    for (const yFrac of [0, 0.55, -0.55, 0.85, -0.85]) {
      const y = yFrac * R
      const ring = makeRing(Math.sqrt(Math.max(R * R - y * y, 0.01)))
      ring.position.y = y
      group.add(ring)
    }
    // Longitudes: three great circles
    for (const rot of [0, Math.PI / 3, (2 * Math.PI) / 3]) {
      const ring = makeRing(R)
      ring.rotation.z = Math.PI / 2
      ring.rotation.y = rot
      group.add(ring)
    }

    // --- Soft purple halo behind the globe
    const haloCanvas = document.createElement('canvas')
    haloCanvas.width = haloCanvas.height = 256
    const ctx = haloCanvas.getContext('2d')
    if (ctx) {
      const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
      grad.addColorStop(0, 'rgba(124, 58, 237, 0.35)')
      grad.addColorStop(0.5, 'rgba(124, 58, 237, 0.12)')
      grad.addColorStop(1, 'rgba(124, 58, 237, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 256, 256)
    }
    const haloTex = new THREE.CanvasTexture(haloCanvas)
    const haloMat = new THREE.SpriteMaterial({
      map: haloTex,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const halo = new THREE.Sprite(haloMat)
    halo.scale.set(R * 4.4, R * 4.4, 1)
    disposables.push(haloTex, haloMat)
    scene.add(halo)

    group.rotation.x = 0.28

    // --- Interaction state
    let targetRotX = 0
    let targetRotY = 0
    const onPointerMove = (e: PointerEvent) => {
      targetRotY = (e.clientX / window.innerWidth - 0.5) * 0.55
      targetRotX = (e.clientY / window.innerHeight - 0.5) * 0.3
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    // --- Render loop, paused when the hero scrolls out of view
    const clock = new THREE.Clock()
    let rafId = 0
    let visible = true
    let mouseX = 0
    let mouseY = 0

    const render = () => {
      const t = clock.getElapsedTime()
      mouseX += (targetRotY - mouseX) * 0.04
      mouseY += (targetRotX - mouseY) * 0.04
      group.rotation.y = t * 0.07 + mouseX
      group.rotation.x = 0.28 + mouseY
      // Gentle breathing
      const s = 1 + Math.sin(t * 0.5) * 0.012
      group.scale.setScalar(s)
      renderer.render(scene, camera)
      if (visible && !prefersReduced) rafId = requestAnimationFrame(render)
    }
    render()

    const io = new IntersectionObserver(([entry]) => {
      const nowVisible = entry.isIntersecting
      if (nowVisible && !visible && !prefersReduced) {
        visible = true
        rafId = requestAnimationFrame(render)
      } else if (!nowVisible) {
        visible = false
        cancelAnimationFrame(rafId)
      }
    })
    io.observe(mount)

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
      if (prefersReduced) renderer.render(scene, camera)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      io.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      disposables.forEach((d) => d.dispose())
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />
}
