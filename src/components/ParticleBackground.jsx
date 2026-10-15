import { useEffect, useRef } from 'react'

const ACCENT = '78, 240, 141'
const NEUTRAL = '150, 155, 165'
const LINK_DISTANCE = 120
const MAX_DPR = 1.5

// Fewer nodes on small screens keeps the per-frame pair loop cheap on phones.
function particleCount(width) {
  if (width < 640) return 26
  if (width < 1024) return 40
  return 54
}

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    let width = 0
    let height = 0
    let particles = []
    let frameId = null
    let resizeTimer = null

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function createParticles() {
      particles = Array.from({ length: particleCount(width) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.26,
        vy: (Math.random() - 0.5) * 0.26,
        r: Math.random() * 0.9 + 0.9,
        accent: Math.random() < 0.22,
      }))
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distSq = dx * dx + dy * dy
          if (distSq > LINK_DISTANCE * LINK_DISTANCE) continue
          const fade = 1 - Math.sqrt(distSq) / LINK_DISTANCE
          ctx.strokeStyle = `rgba(${NEUTRAL}, ${0.1 * fade})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      for (const p of particles) {
        ctx.fillStyle = p.accent ? `rgba(${ACCENT}, 0.55)` : `rgba(${NEUTRAL}, 0.35)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function step() {
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
      }
      draw()
      frameId = requestAnimationFrame(step)
    }

    function stop() {
      if (frameId !== null) {
        cancelAnimationFrame(frameId)
        frameId = null
      }
    }

    function start() {
      if (frameId !== null) return
      if (motionQuery.matches || document.hidden) return
      frameId = requestAnimationFrame(step)
    }

    function onVisibilityChange() {
      if (document.hidden) stop()
      else start()
    }

    function onResize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        resize()
        createParticles()
        if (motionQuery.matches) draw()
      }, 150)
    }

    function onMotionPreferenceChange() {
      stop()
      if (motionQuery.matches) draw()
      else start()
    }

    resize()
    createParticles()
    draw()
    start()

    window.addEventListener('resize', onResize, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    motionQuery.addEventListener('change', onMotionPreferenceChange)

    return () => {
      stop()
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      motionQuery.removeEventListener('change', onMotionPreferenceChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 opacity-70"
      aria-hidden="true"
    />
  )
}
