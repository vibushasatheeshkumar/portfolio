import { motion } from 'framer-motion'
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa6'
import Section from './Section'
import { profile } from '../data'

const links = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: FaEnvelope },
  { label: 'GitHub', value: profile.github.replace('https://', ''), href: profile.github, Icon: FaGithub },
  { label: 'LinkedIn', value: profile.linkedin.replace('https://', ''), href: profile.linkedin, Icon: FaLinkedin },
]

export default function Contact() {
  return (
    <Section id="contact" title="Get In Touch">
      <p className="mb-8 max-w-xl text-text">
        Open to internships, CTF collaborations, and security research opportunities. Reach out through any of the channels below.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {links.map(({ label, value, href, Icon }) => (
          <motion.a
            key={label}
            href={href}
            target={label === 'Email' ? undefined : '_blank'}
            rel="noreferrer"
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="group flex items-start gap-3 rounded-lg border border-border bg-surface p-5 transition-colors hover:border-primary/50 hover:shadow-[0_0_30px_-8px_var(--color-primary)]"
          >
            <Icon className="mt-0.5 shrink-0 text-secondary" size={20} />
            <div>
              <p className="font-mono text-xs text-text-dim">{label}</p>
              <p className="mt-1 break-all font-mono text-sm text-heading group-hover:text-secondary">
                {value}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  )
}
