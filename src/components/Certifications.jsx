import { motion, useReducedMotion } from 'framer-motion'
import { FaCertificate } from 'react-icons/fa6'
import Section from './Section'
import { certifications } from '../data'
import { pick, riseIn, stagger, viewportOnce } from '../motion'
import useSpotlight from '../useSpotlight'

export default function Certifications() {
  const reduced = useReducedMotion()
  const spotlight = useSpotlight()

  return (
    <Section id="certifications" index={6} title="Certifications" kicker="credentials">
      <motion.ul
        variants={stagger(0.07)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-3 sm:grid-cols-2"
      >
        {certifications.map((cert, i) => (
          <motion.li
            key={cert}
            variants={pick(riseIn, reduced)}
            onPointerMove={spotlight.onPointerMove}
            onPointerLeave={spotlight.onPointerLeave}
            className="panel elev-1 card-ring spotlight group relative flex items-start gap-3.5 rounded-xl px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong"
          >
            <span className="edge-accent" aria-hidden="true" />
            <span className="panel-2 relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-text-dim transition-colors duration-300 group-hover:border-primary-line group-hover:text-primary">
              <FaCertificate size={13} aria-hidden="true" />
            </span>
            <span className="relative min-w-0 flex-1 text-sm leading-snug text-text transition-colors duration-300 group-hover:text-heading">
              {cert}
            </span>
            <span
              aria-hidden="true"
              className="relative shrink-0 font-mono text-[11px] text-text-dim tabular-nums"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}
