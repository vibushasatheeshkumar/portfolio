import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * A soft accent light that trails the cursor on desktop.
 *
 * Purely decorative and `pointer-events: none`, so the native cursor and every
 * hit target behave normally. It only mounts for fine pointers (mouse/trackpad),
 * stays off under reduced motion, writes straight to style in one rAF per frame,
 * and unmounts its listener when the tab is hidden.
 */
export default function CursorGlow() {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const frame = useRef(0)
  const point = useRef({ x: 0, y: 0 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setEnabled(fine.matches)
    update()
    fine.addEventListener('change', update)
    return () => fine.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!enabled || reduced) return

    const el = ref.current
    if (!el) return

    const render = () => {
      frame.current = 0
      el.style.transform = `translate3d(${point.current.x - 300}px, ${point.current.y - 300}px, 0)`
    }

    const onMove = (event) => {
      point.current = { x: event.clientX, y: event.clientY }
      if (!frame.current) frame.current = requestAnimationFrame(render)
      if (el.style.opacity !== '1') el.style.opacity = '1'
    }

    const onLeave = () => {
      el.style.opacity = '0'
    }

    const onVisibility = () => {
      if (document.hidden) {
        el.style.opacity = '0'
        if (frame.current) {
          cancelAnimationFrame(frame.current)
          frame.current = 0
        }
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [enabled, reduced])

  if (!enabled || reduced) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 -z-10 h-[600px] w-[600px] opacity-0 transition-opacity duration-500"
      style={{
        background:
          'radial-gradient(circle, rgba(78,240,141,0.05) 0%, rgba(78,240,141,0.02) 35%, transparent 65%)',
      }}
    />
  )
}
