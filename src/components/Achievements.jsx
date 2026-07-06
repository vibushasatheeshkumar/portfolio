import { motion } from 'framer-motion'
import { FaAward, FaCertificate } from 'react-icons/fa6'
import Section from './Section'
import { achievements } from '../data'

const badgeIcons = {
  primary: FaAward,
  secondary: FaCertificate,
}

export default function Achievements() {
  return (
    <Section id="achievements" title="Achievements" shapeVariant={0}>
      <div className="space-y-5">
        {achievements.map((item) => {
          const Icon = badgeIcons[item.color] || FaAward
          const isPrimary = item.color === 'primary'
          return (
            <motion.div
              key={item.title}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`flex flex-col gap-4 rounded-lg border-l-4 bg-surface p-6 sm:flex-row sm:items-start ${
                isPrimary ? 'border-l-primary' : 'border-l-secondary'
              }`}
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white ${
                  isPrimary ? 'bg-primary' : 'bg-secondary'
                }`}
              >
                <Icon size={20} />
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-heading">{item.title}</h3>
                  <span
                    className={`rounded-full px-3 py-1 font-mono text-xs font-semibold text-white ${
                      isPrimary ? 'bg-primary' : 'bg-secondary'
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-text">{item.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-text-dim"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
