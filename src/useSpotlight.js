import { useCallback, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Tracks the pointer inside an element and writes --mx/--my CSS variables,
 * which `.spotlight` in index.css uses to position its radial highlight.
 *
 * Mouse only: touch pointers would leave a stale highlight behind, and the
 * whole effect is skipped when the user prefers reduced motion. Updates are
 * coalesced into one rAF per frame so a fast pointer cannot queue style work.
 */
export default function useSpotlight() {
  const reduced = useReducedMotion()
  const frame = useRef(0)
  const next = useRef(null)

  const onPointerMove = useCallback(
    (event) => {
      if (reduced || event.pointerType !== 'mouse') return
      const el = event.currentTarget
      const rect = el.getBoundingClientRect()
      next.current = {
        el,
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
      }
      if (frame.current) return
      frame.current = requestAnimationFrame(() => {
        frame.current = 0
        const pending = next.current
        if (!pending) return
        pending.el.style.setProperty('--mx', `${pending.x}%`)
        pending.el.style.setProperty('--my', `${pending.y}%`)
      })
    },
    [reduced],
  )

  const onPointerLeave = useCallback((event) => {
    if (frame.current) {
      cancelAnimationFrame(frame.current)
      frame.current = 0
    }
    next.current = null
    event.currentTarget.style.removeProperty('--mx')
    event.currentTarget.style.removeProperty('--my')
  }, [])

  return { onPointerMove, onPointerLeave }
}
