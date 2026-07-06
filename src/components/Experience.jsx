import Section from './Section'
import { experience, education } from '../data'

export default function Experience() {
  return (
    <Section id="experience" title="Experience & Education" shapeVariant={1}>
      <div className="grid gap-10 sm:grid-cols-2">
        <div>
          <h3 className="mb-4 font-mono text-sm font-semibold text-secondary">
            Experience
          </h3>
          <div className="space-y-6">
            {experience.map((job) => (
              <div key={job.role} className="border-l-2 border-primary/40 pl-4">
                <p className="font-semibold text-heading">{job.role}</p>
                <p className="font-mono text-sm text-primary">{job.org}</p>
                <p className="font-mono text-xs text-text-dim">{job.period}</p>
                <ul className="mt-2 space-y-1 text-sm text-text">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-mono text-sm font-semibold text-secondary">
            Education
          </h3>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.school} className="border-l-2 border-secondary/40 pl-4">
                <p className="font-semibold text-heading">{edu.program}</p>
                <p className="text-sm text-text">{edu.school}</p>
                <p className="font-mono text-xs text-text-dim">{edu.period}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
