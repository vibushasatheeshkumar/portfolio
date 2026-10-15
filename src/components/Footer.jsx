import { motion, useReducedMotion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaMedium, FaEnvelope, FaArrowUp } from 'react-icons/fa6'
import { profile } from '../data'
import { EASE, fadeUp, pick, stagger, viewportOnce } from '../motion'

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
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={stagger(0.08)}
      className="relative mt-10 border-t border-border"
    >
      {/* Accent seam that draws across the top edge */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-0 -top-px mx-auto h-px max-w-6xl origin-center bg-gradient-to-r from-transparent via-primary/45 to-transparent"
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={reduced ? undefined : { scaleX: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1, ease: EASE }}
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-7 px-6 py-11 sm:flex-row sm:items-center sm:justify-between">
        <motion.div variants={pick(fadeUp, reduced)}>
          <p className="font-mono text-sm text-heading">
            <span className="text-primary">&gt;</span> {profile.name.toLowerCase()}
            <span className="caret ml-0.5">_</span>
          </p>
          <p className="mt-2.5 max-w-md font-mono text-[11px] leading-relaxed text-text-dim">
            © {new Date().getFullYear()} {profile.fullName} — built with React &amp; Tailwind, hosted
            on GitHub Pages
          </p>
        </motion.div>

        <motion.div variants={pick(fadeUp, reduced)} className="flex items-center gap-2">
          {socials.map(({ href, label, Icon, external = true }) => (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              aria-label={`${label}${external ? ' (opens in a new tab)' : ''}`}
              className="panel elev-1 flex h-10 w-10 items-center justify-center rounded-lg text-text-dim transition-all duration-300 hover:-translate-y-1 hover:border-primary-line hover:text-primary hover:shadow-[0_8px_20px_-12px_var(--color-primary)]"
            >
              <Icon size={15} aria-hidden="true" />
            </a>
          ))}
          <a
            href="#top"
            aria-label="Back to top"
            className="panel elev-1 group ml-1 flex h-10 w-10 items-center justify-center rounded-lg text-text-dim transition-all duration-300 hover:-translate-y-1 hover:border-primary-line hover:text-primary"
          >
            <FaArrowUp
              size={14}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </a>
        </motion.div>
      </div>
    </motion.footer>
  )
}
