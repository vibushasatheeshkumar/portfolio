import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

const SPRING = { stiffness: 260, damping: 20, mass: 0.5 }

/**
 * An anchor that drifts a few pixels toward the pointer. The travel is capped
 * well below the control's own size so the hit area never moves out from under
 * the cursor, and the effect is skipped for touch pointers and reduced motion.
 */
export default function MagneticLink({ children, strength = 6, className, ...props }) {
  const reduced = useReducedMotion()
  const x = useSpring(useMotionValue(0), SPRING)
  const y = useSpring(useMotionValue(0), SPRING)

  const handlePointerMove = (event) => {
    if (reduced || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    const dx = (event.clientX - rect.left) / rect.width - 0.5
    const dy = (event.clientY - rect.top) / rect.height - 0.5
    x.set(dx * strength * 2)
    y.set(dy * strength * 2)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      {...props}
      className={className}
      style={reduced ? undefined : { x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onBlur={reset}
      whileTap={reduced ? undefined : { scale: 0.97 }}
    >
      {children}
    </motion.a>
  )
}
