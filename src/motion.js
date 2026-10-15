// Shared motion primitives so every section reveals on the same curve.
// Components pass the result of useReducedMotion() where a static fallback matters;
// index.css additionally neutralises CSS animations under prefers-reduced-motion.

export const EASE = [0.22, 1, 0.36, 1]

// `margin` expands the IntersectionObserver root well beyond the viewport.
// Without it a fast scroll (or an anchor jump) can move a small element from
// below the viewport to above it between observer callbacks, so `isIntersecting`
// never becomes true and the element stays at its hidden variant.
export const viewportOnce = { once: true, amount: 0.2, margin: '300px 0px 300px 0px' }
export const viewportEarly = { once: true, amount: 0.05, margin: '300px 0px 300px 0px' }

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

export const fadeUpSmall = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
}

export const slideLeft = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
}

// Cards rise and settle with a touch of scale for depth.
export const riseIn = {
  hidden: { opacity: 0, y: 30, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASE } },
}

// Used inside .mask-line wrappers for cinematic heading reveals.
export const maskUp = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.85, ease: EASE } },
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
  hidden: { opacity: 1, y: 0, x: 0, scale: 1 },
  show: { opacity: 1, y: 0, x: 0, scale: 1, transition: { duration: 0 } },
}

export const staticMask = {
  hidden: { y: '0%' },
  show: { y: '0%', transition: { duration: 0 } },
}

export function pick(variant, reduced) {
  return reduced ? staticVariant : variant
}

export function pickMask(reduced) {
  return reduced ? staticMask : maskUp
}
