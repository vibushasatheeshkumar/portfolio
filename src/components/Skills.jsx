import { motion } from 'framer-motion'
import { FaShieldHalved, FaMagnifyingGlassChart, FaScrewdriverWrench, FaServer, FaCode } from 'react-icons/fa6'
import Section from './Section'
import { skillGroups } from '../data'
import { skillIcons, defaultSkillIcon } from '../skillIcons'

const groupIcons = {
  Security: FaShieldHalved,
  'SIEM & Analytics': FaMagnifyingGlassChart,
  Tools: FaScrewdriverWrench,
  Platforms: FaServer,
  Programming: FaCode,
}

const allTools = [...new Set(skillGroups.flatMap((g) => g.skills))]

export default function Skills() {
  return (
    <Section id="skills" title="Technical Skills" shapeVariant={0}>
      <div className="grid gap-6 sm:grid-cols-2">
        {skillGroups.map((group) => {
          const GroupIcon = groupIcons[group.label] || FaCode
          return (
            <div
              key={group.label}
              className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/40"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="gradient-bg flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white">
                  <GroupIcon size={18} />
                </span>
                <h3 className="font-display text-sm font-semibold text-heading">
                  {group.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => {
                  const Icon = skillIcons[skill] || defaultSkillIcon
                  return (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.06, y: -2 }}
                      className="flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3 py-1.5 font-mono text-xs text-text transition-colors hover:border-primary/50"
                    >
                      <Icon className="text-secondary" size={13} />
                      {skill}
                    </motion.span>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-10 overflow-hidden rounded-xl border border-border bg-surface py-4">
        <p className="mb-3 px-5 font-mono text-xs text-text-dim">
          <span className="text-secondary">&gt;</span> tools_in_use
        </p>
        <div className="flex w-max gap-3 px-5 marquee-track">
          {[...allTools, ...allTools].map((tool, i) => {
            const Icon = skillIcons[tool] || defaultSkillIcon
            return (
              <span
                key={`${tool}-${i}`}
                className="flex shrink-0 items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 font-mono text-xs text-secondary"
              >
                <Icon size={12} />
                {tool}
              </span>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
