import { motion, useReducedMotion } from 'framer-motion'
import {
  FaShieldHalved,
  FaMagnifyingGlassChart,
  FaScrewdriverWrench,
  FaServer,
  FaCode,
} from 'react-icons/fa6'
import Section from './Section'
import { skillGroups } from '../data'
import { skillIcons, defaultSkillIcon } from '../skillIcons'
import { pick, riseIn, stagger, viewportOnce } from '../motion'
import useSpotlight from '../useSpotlight'

const groupIcons = {
  Security: FaShieldHalved,
  'SIEM & Analytics': FaMagnifyingGlassChart,
  Tools: FaScrewdriverWrench,
  Platforms: FaServer,
  Programming: FaCode,
}

export default function Skills() {
  const reduced = useReducedMotion()
  const spotlight = useSpotlight()

  return (
    <Section id="skills" index={2} title="Technical Skills" kicker="toolchain">
      <motion.div
        variants={stagger(0.09)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-4 sm:grid-cols-2"
      >
        {skillGroups.map((group) => {
          const GroupIcon = groupIcons[group.label] || FaCode
          return (
            <motion.div
              key={group.label}
              variants={pick(riseIn, reduced)}
              onPointerMove={spotlight.onPointerMove}
              onPointerLeave={spotlight.onPointerLeave}
              className="panel elev-1 card-ring spotlight group relative rounded-xl p-5 transition-colors duration-300 hover:border-border-strong"
            >
              <span className="edge-accent" aria-hidden="true" />

              <div className="relative mb-5 flex items-center gap-3">
                <span className="panel-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-primary transition-colors duration-300 group-hover:border-primary-line">
                  <GroupIcon size={15} aria-hidden="true" />
                </span>
                <h3 className="font-display text-sm font-semibold tracking-wide text-heading">
                  {group.label}
                </h3>
                <span className="ml-auto font-mono text-[11px] text-text-dim tabular-nums">
                  {String(group.skills.length).padStart(2, '0')}
                </span>
              </div>

              <div className="relative flex flex-wrap gap-2">
                {group.skills.map((skill) => {
                  const Icon = skillIcons[skill] || defaultSkillIcon
                  return (
                    <span
                      key={skill}
                      className="group/chip flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-2.5 py-1.5 font-mono text-[11px] text-text transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-line hover:bg-surface-3 hover:text-heading hover:shadow-[0_6px_16px_-10px_var(--color-primary)]"
                    >
                      <Icon
                        className="text-text-dim transition-colors duration-300 group-hover/chip:text-primary"
                        size={12}
                        aria-hidden="true"
                      />
                      {skill}
                    </span>
                  )
                })}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}
