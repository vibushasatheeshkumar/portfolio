import { motion, useReducedMotion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaMedium, FaEnvelope, FaArrowUp } from 'react-icons/fa6'
import { profile } from '../data'
import { EASE, viewportOnce } from '../motion'

const socials = [
  { href: profile.github, label: 'GitHub', Icon: FaGithub },
  { href: profile.linkedin, label: 'LinkedIn', Icon: FaLinkedin },
  { href: profile.medium, label: 'Medium', Icon: FaMedium },
  { href: `mailto:${profile.email}`, label: 'Email', Icon: FaEnvelope, external: false },
]

export default function Footer() {
  const reduced = useReducedMotion()

  return (
    <motion.footer
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative mt-8 border-t border-border"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 -top-px mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-primary/35 to-transparent"
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-sm text-heading">
            <span className="text-primary">&gt;</span> {profile.name.toLowerCase()}
            <span className="caret ml-0.5">_</span>
          </p>
          <p className="mt-2 font-mono text-[11px] leading-relaxed text-text-dim">
            © {new Date().getFullYear()} {profile.fullName} — built with React &amp; Tailwind, hosted
            on GitHub Pages
          </p>
        </div>

        <div className="flex items-center gap-2">
          {socials.map(({ href, label, Icon, external = true }) => (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              aria-label={`${label}${external ? ' (opens in a new tab)' : ''}`}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text-dim transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-line hover:text-primary"
            >
              <Icon size={15} aria-hidden="true" />
            </a>
          ))}
          <a
            href="#top"
            aria-label="Back to top"
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text-dim transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-line hover:text-primary"
          >
            <FaArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.footer>
  )
}
