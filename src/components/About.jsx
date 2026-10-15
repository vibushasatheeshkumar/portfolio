import { motion, useReducedMotion } from 'framer-motion'
import { FaGraduationCap } from 'react-icons/fa6'
import Section from './Section'
import { about, education } from '../data'
import { fadeUp, pick, riseIn, stagger, viewportOnce } from '../motion'
import useSpotlight from '../useSpotlight'

export default function About() {
  const reduced = useReducedMotion()
  const spotlight = useSpotlight()

  return (
    <Section id="about" index={1} title="About" kicker="whoami">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {/* Lead paragraph gets a quiet accent spine for emphasis */}
          <motion.div variants={pick(fadeUp, reduced)} className="relative pl-5">
            <span
              aria-hidden="true"
              className="absolute inset-y-1 left-0 w-[2px] rounded-full bg-gradient-to-b from-primary/70 via-border-strong to-transparent"
            />
            <p className="text-pretty text-[1.0625rem] leading-[1.75] text-heading/90 sm:text-lg">
              {about.lead[0]}
            </p>
          </motion.div>

          {about.lead.slice(1).map((paragraph) => (
            <motion.p
              key={paragraph.slice(0, 40)}
              variants={pick(fadeUp, reduced)}
              className="text-pretty mt-5 text-base leading-[1.75] text-text sm:text-[1.0625rem]"
            >
              {paragraph}
            </motion.p>
          ))}

          <motion.div variants={pick(fadeUp, reduced)} className="mt-9">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="panel-2 flex h-7 w-7 items-center justify-center rounded-md text-secondary">
                <FaGraduationCap size={12} aria-hidden="true" />
              </span>
              <h3 className="label-mono text-text">Education</h3>
              <span className="hairline flex-1" aria-hidden="true" />
            </div>

            <ul className="space-y-3">
              {education.map((edu) => (
                <li
                  key={edu.school}
                  className="panel elev-1 group rounded-lg p-4 transition-colors duration-300 hover:border-border-strong"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-heading">{edu.program}</p>
                    <span className="shrink-0 font-mono text-[11px] text-text-dim tabular-nums">
                      {edu.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-text">{edu.school}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.ul
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="space-y-3"
        >
          {about.focus.map((item, i) => (
            <motion.li
              key={item.title}
              variants={pick(riseIn, reduced)}
              onPointerMove={spotlight.onPointerMove}
              onPointerLeave={spotlight.onPointerLeave}
              className="panel elev-1 card-ring spotlight group relative rounded-xl p-5 transition-colors duration-300 hover:border-border-strong"
            >
              <span className="edge-accent" aria-hidden="true" />
              <div className="relative flex items-start gap-3.5">
                <span
                  aria-hidden="true"
                  className="panel-2 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-[11px] text-primary/80 transition-colors duration-300 group-hover:border-primary-line group-hover:text-primary"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[0.975rem] font-semibold text-heading">
                    {item.title}
                  </h3>
                  <p className="text-pretty mt-2 text-sm leading-relaxed text-text">{item.body}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-text-dim transition-colors duration-300 group-hover:border-border-strong"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Section>
  )
}
