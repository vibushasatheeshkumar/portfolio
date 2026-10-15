import { motion, useReducedMotion } from 'framer-motion'
import { FaEnvelope, FaGithub, FaLinkedin, FaMedium, FaFileArrowDown } from 'react-icons/fa6'
import Section from './Section'
import { profile } from '../data'
import { resumeUrl } from '../links'
import { fadeUp, pick, stagger, viewportOnce } from '../motion'

const links = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    Icon: FaEnvelope,
    external: false,
  },
  {
    label: 'GitHub',
    value: profile.github.replace('https://', ''),
    href: profile.github,
    Icon: FaGithub,
    external: true,
  },
  {
    label: 'LinkedIn',
    value: profile.linkedin.replace('https://', ''),
    href: profile.linkedin,
    Icon: FaLinkedin,
    external: true,
  },
  {
    label: 'Medium',
    value: profile.medium.replace('https://', ''),
    href: profile.medium,
    Icon: FaMedium,
    external: true,
  },
]

export default function Contact() {
  const reduced = useReducedMotion()

  return (
    <Section
      id="contact"
      index={7}
      title="Get In Touch"
      kicker="contact"
      intro="Open to internships, CTF collaborations, and security research opportunities. Reach out through any of the channels below."
    >
      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {links.map(({ label, value, href, Icon, external }) => (
          <motion.a
            key={label}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            aria-label={`${label}: ${value}${external ? ' (opens in a new tab)' : ''}`}
            variants={pick(fadeUp, reduced)}
            whileHover={reduced ? undefined : { y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="panel card-ring group flex items-start gap-3 rounded-xl p-5 transition-colors duration-300 hover:border-border-strong"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 text-primary transition-colors duration-300 group-hover:border-primary-line">
              <Icon size={15} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="label-mono">{label}</p>
              <p className="mt-1.5 font-mono text-[12px] break-all text-text transition-colors duration-300 group-hover:text-primary">
                {value}
              </p>
            </div>
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        variants={pick(fadeUp, reduced)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-6"
      >
        <a
          href={resumeUrl}
          download
          aria-label="Download resume as PDF"
          className="btn-sweep inline-flex items-center gap-2 rounded-md border border-primary-line bg-primary-soft px-5 py-3 font-mono text-[12px] font-medium text-primary transition-colors duration-300 hover:bg-primary hover:text-bg"
        >
          <FaFileArrowDown size={13} aria-hidden="true" />
          download resume (pdf)
        </a>
      </motion.div>
    </Section>
  )
}
