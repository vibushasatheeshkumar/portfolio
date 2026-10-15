import { motion, useReducedMotion } from 'framer-motion'
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMedium,
  FaFileArrowDown,
  FaArrowUpRightFromSquare,
} from 'react-icons/fa6'
import Section from './Section'
import MagneticLink from './MagneticLink'
import { profile } from '../data'
import { resumeUrl } from '../links'
import { fadeUp, pick, riseIn, stagger, viewportOnce } from '../motion'
import useSpotlight from '../useSpotlight'

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

const invitations = ['security research', 'internships', 'CTF collaboration']

export default function Contact() {
  const reduced = useReducedMotion()
  const spotlight = useSpotlight()

  return (
    <Section id="contact" index={7} title="Get In Touch" kicker="contact">
      <motion.div
        variants={stagger(0.09)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {/* Invitation */}
        <motion.div variants={pick(fadeUp, reduced)} className="max-w-2xl">
          <p className="text-pretty text-lg leading-[1.7] text-heading/90 sm:text-xl">
            If you are working on something in application security, detection engineering, or
            vulnerability research — or you have found a bug you want a second pair of eyes on — I
            would like to hear about it.
          </p>
          <p className="text-pretty mt-4 leading-relaxed text-text">
            I am open to internships, CTF collaborations, and security research opportunities. The
            fastest way to reach me is email; everything else is below.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {invitations.map((item) => (
              <span
                key={item}
                className="panel-2 rounded-full px-3 py-1 font-mono text-[11px] text-text-dim"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Channels */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map(({ label, value, href, Icon, external }) => (
            <motion.a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              aria-label={`${label}: ${value}${external ? ' (opens in a new tab)' : ''}`}
              variants={pick(riseIn, reduced)}
              onPointerMove={spotlight.onPointerMove}
              onPointerLeave={spotlight.onPointerLeave}
              whileHover={reduced ? undefined : { y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="panel elev-1 card-ring spotlight group relative flex items-start gap-3 rounded-xl p-5 transition-colors duration-300 hover:border-border-strong"
            >
              <span className="edge-accent" aria-hidden="true" />
              <span className="panel-2 relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-primary transition-colors duration-300 group-hover:border-primary-line">
                <Icon size={15} aria-hidden="true" />
              </span>
              <div className="relative min-w-0">
                <p className="label-mono flex items-center gap-1.5">
                  {label}
                  {external && (
                    <FaArrowUpRightFromSquare
                      size={7}
                      aria-hidden="true"
                      className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  )}
                </p>
                <p className="mt-1.5 font-mono text-[12px] break-all text-text transition-colors duration-300 group-hover:text-primary">
                  {value}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div variants={pick(fadeUp, reduced)} className="mt-6 flex flex-wrap gap-3">
          <MagneticLink
            href={`mailto:${profile.email}`}
            strength={5}
            aria-label={`Send an email to ${profile.email}`}
            className="btn-sweep inline-flex items-center gap-2.5 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-bg shadow-[0_0_0_1px_var(--color-primary-line),0_14px_34px_-16px_var(--color-primary)] transition-shadow duration-300 hover:shadow-[0_0_0_1px_var(--color-primary),0_16px_40px_-12px_var(--color-primary)]"
          >
            <FaEnvelope size={14} aria-hidden="true" />
            Send an email
          </MagneticLink>

          <MagneticLink
            href={resumeUrl}
            download
            strength={5}
            aria-label="Download resume as PDF"
            className="btn-sweep inline-flex items-center gap-2 rounded-lg border border-primary-line bg-primary-soft px-5 py-3 font-mono text-[12px] font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-bg"
          >
            <FaFileArrowDown size={13} aria-hidden="true" />
            download resume (pdf)
          </MagneticLink>
        </motion.div>
      </motion.div>
    </Section>
  )
}
