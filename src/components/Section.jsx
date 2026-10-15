import { motion, useReducedMotion } from 'framer-motion'
import { EASE, fadeUp, pick, pickMask, stagger, viewportOnce } from '../motion'

export default function Section({ id, index, title, kicker, intro, children }) {
  const reduced = useReducedMotion()
  const mask = pickMask(reduced)

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
            {index != null && (
              <span className="text-primary tabular-nums">{String(index).padStart(2, '0')}</span>
            )}
            <motion.span
              aria-hidden="true"
              className="h-px w-10 origin-left bg-border-strong"
              initial={reduced ? false : { scaleX: 0 }}
              whileInView={reduced ? undefined : { scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            />
            <span>{kicker || title}</span>
          </motion.div>

          <h2 className="font-display display-tight mt-4 text-3xl font-bold text-heading sm:text-5xl">
            <span className="mask-line">
              <motion.span variants={mask} className="inline-block">
                {title}
              </motion.span>
            </span>
          </h2>

          <motion.span
            aria-hidden="true"
            className="accent-rule mt-5 block w-24 origin-left rounded-full"
            initial={reduced ? false : { scaleX: 0 }}
            whileInView={reduced ? undefined : { scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          />

          {intro && (
            <motion.p
              variants={pick(fadeUp, reduced)}
              className="text-pretty mt-6 max-w-2xl text-base leading-relaxed text-text"
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
