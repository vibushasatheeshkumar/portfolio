import { useEffect, useRef } from 'react'

const PRIMARY = '168, 85, 247'
const SECONDARY = '46, 230, 214'
const PARTICLE_COUNT = 70
const LINK_DISTANCE = 130

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width, height, particles, frameId

    function resize() {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    function createParticles() {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        color: Math.random() > 0.5 ? PRIMARY : SECONDARY,
      }))
    }

    function step() {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(${PRIMARY}, ${0.15 * (1 - dist / LINK_DISTANCE)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (const p of particles) {
        ctx.fillStyle = `rgba(${p.color}, 0.7)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }

      frameId = requestAnimationFrame(step)
    }

    resize()
    createParticles()
    window.addEventListener('resize', resize)

    if (!prefersReducedMotion) {
      step()
    } else {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        ctx.fillStyle = `rgba(${p.color}, 0.5)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    />
  )
}
