import Section from './Section'
import { skillGroups } from '../data'

export default function Skills() {
  return (
    <Section id="skills" label="skills.json" title="Technical Skills">
      <div className="grid gap-6 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div
            key={group.label}
            className="rounded-lg border border-border bg-surface p-5"
          >
            <h3 className="mb-3 font-mono text-sm font-semibold text-secondary">
              {group.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded border border-border bg-surface-2 px-2.5 py-1 font-mono text-xs text-text"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
