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
    </Section>
  )
}
