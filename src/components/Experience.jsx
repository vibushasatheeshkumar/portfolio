import { motion, useReducedMotion } from 'framer-motion'
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa6'
import Section from './Section'
import { experience, education } from '../data'
import { EASE, fadeUp, pick, stagger, viewportOnce } from '../motion'

function Rail({ children }) {
  const reduced = useReducedMotion()
  return (
    <div className="relative pl-6">
      <motion.span
        aria-hidden="true"
        className="absolute top-1 bottom-1 left-[3px] w-px origin-top bg-gradient-to-b from-primary/45 via-border-strong to-transparent"
        initial={reduced ? false : { scaleY: 0 }}
        whileInView={reduced ? undefined : { scaleY: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8, ease: EASE }}
      />
      {children}
    </div>
  )
}

export default function Experience() {
  const reduced = useReducedMotion()

  return (
    <Section id="experience" index={5} title="Experience & Education" kicker="timeline">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="mb-5 flex items-center gap-2.5">
            <FaBriefcase size={12} className="text-primary" aria-hidden="true" />
            <h3 className="label-mono text-text">Experience</h3>
            <span className="hairline flex-1" aria-hidden="true" />
          </div>

          <Rail>
            <motion.ul
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="m-0 list-none space-y-5 p-0"
            >
              {experience.map((job) => (
                <motion.li key={job.role} variants={pick(fadeUp, reduced)} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute top-2 -left-6 h-[7px] w-[7px] rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]"
                  />
                  <div className="panel card-ring rounded-lg p-5 transition-colors duration-300 hover:border-border-strong">
                    <div className="flex flex-wrap items-start justify-between gap-2">
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
                    <p className="mt-2 font-mono text-[11px] text-text-dim">{job.period}</p>
                    <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-text">
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
          <div className="mb-5 flex items-center gap-2.5">
            <FaGraduationCap size={13} className="text-secondary" aria-hidden="true" />
            <h3 className="label-mono text-text">Education</h3>
            <span className="hairline flex-1" aria-hidden="true" />
          </div>

          <Rail>
            <motion.ul
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="m-0 list-none space-y-5 p-0"
            >
              {education.map((edu) => (
                <motion.li key={edu.school} variants={pick(fadeUp, reduced)} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute top-2 -left-6 h-[7px] w-[7px] rounded-full bg-secondary/80 shadow-[0_0_10px_var(--color-secondary)]"
                  />
                  <div className="panel card-ring rounded-lg p-5 transition-colors duration-300 hover:border-border-strong">
                    <p className="font-display text-base font-semibold text-heading">
                      {edu.program}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-text">{edu.school}</p>
                    <p className="mt-2 font-mono text-[11px] text-text-dim">{edu.period}</p>
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
