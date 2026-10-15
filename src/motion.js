// Shared motion primitives so every section reveals on the same curve.
// Components pass the result of useReducedMotion() where a static fallback matters;
// index.css additionally neutralises CSS animations under prefers-reduced-motion.

export const EASE = [0.22, 1, 0.36, 1]

export const viewportOnce = { once: true, amount: 0.2 }

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
}

export const slideLeft = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
}

export function stagger(childDelay = 0.08, initialDelay = 0) {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: childDelay, delayChildren: initialDelay },
    },
  }
}

// Motion-free equivalents, swapped in when the user prefers reduced motion.
export const staticVariant = {
  hidden: { opacity: 1, y: 0, x: 0 },
  show: { opacity: 1, y: 0, x: 0, transition: { duration: 0 } },
}

export function pick(variant, reduced) {
  return reduced ? staticVariant : variant
}
