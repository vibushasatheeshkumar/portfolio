import { motion, useReducedMotion } from 'framer-motion'
import { FaCertificate } from 'react-icons/fa6'
import Section from './Section'
import { certifications } from '../data'
import { fadeUp, pick, stagger, viewportOnce } from '../motion'

export default function Certifications() {
  const reduced = useReducedMotion()

  return (
    <Section id="certifications" index={6} title="Certifications" kicker="credentials">
      <motion.ul
        variants={stagger(0.07)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-3 sm:grid-cols-2"
      >
        {certifications.map((cert) => (
          <motion.li
            key={cert}
            variants={pick(fadeUp, reduced)}
            className="panel card-ring group flex items-start gap-3 rounded-lg px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong"
          >
            <FaCertificate
              size={13}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-text-dim transition-colors duration-300 group-hover:text-primary"
            />
            <span className="text-sm leading-snug text-text">{cert}</span>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}
