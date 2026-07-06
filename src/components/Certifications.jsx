import { motion } from 'framer-motion'
import Section from './Section'
import { certifications } from '../data'

export default function Certifications() {
  return (
    <Section id="certifications" title="Certifications">
      <ul className="grid gap-3 sm:grid-cols-2">
        {certifications.map((cert) => (
          <motion.li
            key={cert}
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex items-start gap-2 rounded-md border border-border bg-surface px-4 py-3 text-sm text-text transition-colors hover:border-primary/50"
          >
            <span className="text-primary">✓</span>
            <span>{cert}</span>
          </motion.li>
        ))}
      </ul>
    </Section>
  )
}
