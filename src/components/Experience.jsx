import { motion, useReducedMotion } from 'framer-motion'
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa6'
import Section from './Section'
import { experience, education } from '../data'
import { EASE, pick, riseIn, stagger, viewportOnce } from '../motion'
import useSpotlight from '../useSpotlight'

function RailHeading({ Icon, title, tone }) {
  return (
    <div className="mb-5 flex items-center gap-2.5">
      <span className={`panel-2 flex h-7 w-7 items-center justify-center rounded-md ${tone}`}>
        <Icon size={12} aria-hidden="true" />
      </span>
      <h3 className="label-mono text-text">{title}</h3>
      <span className="hairline flex-1" aria-hidden="true" />
    </div>
  )
}

function Rail({ children, tone = 'primary' }) {
  const reduced = useReducedMotion()
  return (
    <div className="relative pl-7">
      <motion.span
        aria-hidden="true"
        className={`absolute top-2 bottom-2 left-[3px] w-px origin-top bg-gradient-to-b ${
          tone === 'primary' ? 'from-primary/55' : 'from-secondary/55'
        } via-border-strong to-transparent`}
        initial={reduced ? false : { scaleY: 0 }}
        whileInView={reduced ? undefined : { scaleY: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.9, ease: EASE }}
      />
      {children}
    </div>
  )
}

function Node({ tone }) {
  const reduced = useReducedMotion()
  return (
    <span aria-hidden="true" className="absolute top-7 -left-7">
      <span className="relative flex h-[9px] w-[9px] items-center justify-center">
        {!reduced && (
          <span
            className={`pulse-ring absolute inset-0 rounded-full ${
              tone === 'primary' ? 'bg-primary/50' : 'bg-secondary/50'
            }`}
          />
        )}
        <span
          className={`relative h-[9px] w-[9px] rounded-full ${
            tone === 'primary'
              ? 'bg-primary shadow-[0_0_12px_var(--color-primary)]'
              : 'bg-secondary shadow-[0_0_12px_var(--color-secondary)]'
          }`}
        />
      </span>
    </span>
  )
}

export default function Experience() {
  const reduced = useReducedMotion()
  const spotlight = useSpotlight()

  return (
    <Section id="experience" index={5} title="Experience & Education" kicker="timeline">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <RailHeading Icon={FaBriefcase} title="Experience" tone="text-primary" />
          <Rail tone="primary">
            <motion.ul
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="m-0 list-none space-y-5 p-0"
            >
              {experience.map((job) => (
                <motion.li key={job.role} variants={pick(riseIn, reduced)} className="relative">
                  <Node tone="primary" />
                  <div
                    onPointerMove={spotlight.onPointerMove}
                    onPointerLeave={spotlight.onPointerLeave}
                    className="panel elev-1 card-ring spotlight group relative rounded-xl p-5 transition-colors duration-300 hover:border-border-strong"
                  >
                    <span className="edge-accent" aria-hidden="true" />
                    <div className="relative flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="font-display text-base font-semibold text-heading">
                          {job.role}
                        </p>
                        <p className="mt-0.5 font-mono text-[12px] text-primary">{job.org}</p>
                      </div>
                      {job.status && (
                        <span className="shrink-0 rounded border border-border-strong bg-surface-2 px-2 py-0.5 font-mono text-[11px] tracking-[0.1em] text-text-dim uppercase">
                          {job.status}
                        </span>
                      )}
                    </div>
                    <p className="relative mt-2 font-mono text-[11px] text-text-dim">
                      {job.period}
                    </p>
                    <ul className="relative mt-3 space-y-1.5 text-sm leading-relaxed text-text">
                      {job.points.map((point) => (
                        <li key={point} className="flex gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-primary/60"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </Rail>
        </div>

        <div>
          <RailHeading Icon={FaGraduationCap} title="Education" tone="text-secondary" />
          <Rail tone="secondary">
            <motion.ul
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="m-0 list-none space-y-5 p-0"
            >
              {education.map((edu) => (
                <motion.li key={edu.school} variants={pick(riseIn, reduced)} className="relative">
                  <Node tone="secondary" />
                  <div
                    onPointerMove={spotlight.onPointerMove}
                    onPointerLeave={spotlight.onPointerLeave}
                    className="panel elev-1 card-ring spotlight group relative rounded-xl p-5 transition-colors duration-300 hover:border-border-strong"
                  >
                    <p className="font-display text-base font-semibold text-heading">
                      {edu.program}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-text">{edu.school}</p>
                    <p className="mt-2 font-mono text-[11px] text-text-dim tabular-nums">
                      {edu.period}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </Rail>
        </div>
      </div>
    </Section>
  )
}
