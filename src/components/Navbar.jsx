import { profile } from '../data'

const links = [
  { href: '#skills', label: 'skills' },
  { href: '#projects', label: 'projects' },
  { href: '#experience', label: 'experience' },
  { href: '#certifications', label: 'certifications' },
  { href: '#achievements', label: 'achievements' },
  { href: '#contact', label: 'contact' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-sm text-heading">
          <span className="text-primary">&gt;</span> {profile.name.toLowerCase()}
          <span className="animate-pulse text-secondary">_</span>
        </a>
        <ul className="hidden gap-6 font-mono text-sm text-text-dim sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-secondary">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
