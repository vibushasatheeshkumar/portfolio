import { motion } from 'framer-motion'
import Section from './Section'
import { achievements } from '../data'

export default function Achievements() {
  return (
    <Section id="achievements" title="Achievements">
      <div className="grid gap-6 sm:grid-cols-2">
        {achievements.map((item) => (
          <motion.div
            key={item.title}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="rounded-lg border border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/5 p-6 hover:shadow-[0_0_30px_-8px_var(--color-primary)]"
          >
            <p className="font-mono text-sm text-secondary">[disclosed]</p>
            <h3 className="mt-2 text-lg font-semibold text-heading">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
