import Section from './Section'
import { achievements } from '../data'

export default function Achievements() {
  return (
    <Section id="achievements" label="cat achievements.log" title="Achievements">
      <div className="grid gap-6 sm:grid-cols-2">
        {achievements.map((item) => (
          <div
            key={item.title}
            className="rounded-lg border border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/5 p-6"
          >
            <p className="font-mono text-sm text-secondary">[disclosed]</p>
            <h3 className="mt-2 text-lg font-semibold text-heading">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text">{item.description}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
