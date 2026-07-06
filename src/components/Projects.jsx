import { motion } from 'framer-motion'
import { FaSatelliteDish, FaFileShield } from 'react-icons/fa6'
import Section from './Section'
import { projects } from '../data'

const projectIcons = {
  Watchtower: FaSatelliteDish,
  MallnSight: FaFileShield,
}

export default function Projects() {
  return (
    <Section id="projects" title="Projects" shapeVariant={1}>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => {
          const Icon = projectIcons[project.name] || FaSatelliteDish
          return (
            <motion.div
              key={project.name}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="gradient-border-top flex flex-col rounded-lg border border-border bg-surface p-6 transition-colors hover:shadow-[0_0_30px_-8px_var(--color-primary)]"
            >
              <div className="flex items-center gap-3">
                <span className="gradient-bg flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-white">
                  <Icon size={18} />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-heading">{project.name}</h3>
                  <p className="font-mono text-sm text-primary">{project.tagline}</p>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text">
                {project.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="text-secondary">▸</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-secondary/30 bg-secondary/10 px-2.5 py-0.5 font-mono text-xs text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
