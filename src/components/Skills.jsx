import { motion } from 'framer-motion'
import Section from './Section'
import { skillGroups } from '../data'
import { skillIcons, defaultSkillIcon } from '../skillIcons'

export default function Skills() {
  return (
    <Section id="skills" title="Technical Skills">
      <div className="grid gap-6 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div
            key={group.label}
            className="rounded-lg border border-border bg-surface p-5"
          >
            <h3 className="mb-3 font-mono text-sm font-semibold text-secondary">
              {group.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => {
                const Icon = skillIcons[skill] || defaultSkillIcon
                return (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.06, y: -2 }}
                    className="flex items-center gap-1.5 rounded border border-border bg-surface-2 px-2.5 py-1 font-mono text-xs text-text transition-colors hover:border-primary/50"
                  >
                    <Icon className="text-secondary" size={13} />
                    {skill}
                  </motion.span>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
