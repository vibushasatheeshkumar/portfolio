import Section from './Section'
import { projects } from '../data'

export default function Projects() {
  return (
    <Section id="projects" label="ls ~/projects" title="Projects">
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.name}
            className="flex flex-col rounded-lg border border-border bg-surface p-6 transition-colors hover:border-primary/50"
          >
            <h3 className="text-xl font-semibold text-heading">{project.name}</h3>
            <p className="mt-1 font-mono text-sm text-primary">{project.tagline}</p>
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
                  className="rounded border border-secondary/30 bg-secondary/10 px-2 py-0.5 font-mono text-xs text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
