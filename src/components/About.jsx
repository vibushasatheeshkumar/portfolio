import { motion, useReducedMotion } from 'framer-motion'
import Section from './Section'
import { about, education } from '../data'
import { fadeUp, pick, stagger, viewportOnce } from '../motion'

export default function About() {
  const reduced = useReducedMotion()

  return (
    <Section id="about" index={1} title="About" kicker="whoami">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="space-y-5"
        >
          {about.lead.map((paragraph) => (
            <motion.p
              key={paragraph.slice(0, 40)}
              variants={pick(fadeUp, reduced)}
              className="text-base leading-[1.75] text-text sm:text-[1.0625rem]"
            >
              {paragraph}
            </motion.p>
          ))}

          <motion.div variants={pick(fadeUp, reduced)} className="pt-4">
            <h3 className="label-mono mb-4">Education</h3>
            <ul className="space-y-4">
              {education.map((edu) => (
                <li key={edu.school} className="border-l border-border pl-4">
                  <p className="text-sm font-semibold text-heading">{edu.program}</p>
                  <p className="mt-0.5 text-sm text-text">{edu.school}</p>
                  <p className="mt-1 font-mono text-xs text-text-dim">{edu.period}</p>
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
              variants={pick(fadeUp, reduced)}
              className="panel card-ring group rounded-lg p-5 transition-colors duration-300 hover:border-border-strong"
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 font-mono text-[11px] text-primary/70 transition-colors duration-300 group-hover:text-primary"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[0.95rem] font-semibold text-heading">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text">{item.body}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-text-dim"
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
