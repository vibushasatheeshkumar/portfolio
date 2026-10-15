import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, pick, stagger, viewportOnce } from '../motion'

export default function Section({ id, index, title, kicker, intro, children }) {
  const reduced = useReducedMotion()

  return (
    <section id={id} className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-20 sm:py-28">
      {title && (
        <motion.div
          className="relative mb-12"
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.div
            variants={pick(fadeUp, reduced)}
            className="flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-text-dim uppercase"
          >
            {index != null && <span className="text-primary">{String(index).padStart(2, '0')}</span>}
            <span className="h-px w-8 bg-border-strong" aria-hidden="true" />
            <span>{kicker || title}</span>
          </motion.div>

          <motion.h2
            variants={pick(fadeUp, reduced)}
            className="font-display mt-4 text-3xl font-bold text-heading sm:text-5xl"
          >
            {title}
          </motion.h2>

          <motion.span
            aria-hidden="true"
            className="accent-rule mt-5 block w-24 origin-left rounded-full"
            initial={reduced ? false : { scaleX: 0 }}
            whileInView={reduced ? undefined : { scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          />

          {intro && (
            <motion.p
              variants={pick(fadeUp, reduced)}
              className="text-balance mt-6 max-w-2xl text-base leading-relaxed text-text"
            >
              {intro}
            </motion.p>
          )}
        </motion.div>
      )}

      <div className="relative">{children}</div>
    </section>
  )
}
