import Section from './Section'
import { profile } from '../data'

const links = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'GitHub', value: profile.github.replace('https://', ''), href: profile.github },
  { label: 'LinkedIn', value: profile.linkedin.replace('https://', ''), href: profile.linkedin },
]

export default function Contact() {
  return (
    <Section id="contact" label="./connect.sh" title="Get In Touch">
      <p className="mb-8 max-w-xl text-text">
        Open to internships, CTF collaborations, and security research opportunities. Reach out through any of the channels below.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.label === 'Email' ? undefined : '_blank'}
            rel="noreferrer"
            className="group rounded-lg border border-border bg-surface p-5 transition-colors hover:border-primary/50"
          >
            <p className="font-mono text-xs text-text-dim">{link.label}</p>
            <p className="mt-1 break-all font-mono text-sm text-heading group-hover:text-secondary">
              {link.value}
            </p>
          </a>
        ))}
      </div>
    </Section>
  )
}
