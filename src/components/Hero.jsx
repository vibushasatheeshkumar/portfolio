import { motion, useReducedMotion } from 'framer-motion'
import { FaFileArrowDown, FaArrowRight, FaShieldHalved, FaArrowDown } from 'react-icons/fa6'
import { profile } from '../data'
import { resumeUrl } from '../links'
import { EASE, fadeUp, pick, pickMask, stagger } from '../motion'
import MagneticLink from './MagneticLink'
import TypingText from './TypingText'
import HeroGraphic from './HeroGraphic'
import Terminal from './Terminal'

// Factual credibility markers — each one is evidenced in the Research section.
const markers = [
  { value: '2', label: 'published advisories' },
  { value: 'Nokia', label: 'security hall of fame' },
  { value: 'eJPT', label: '+ CRTOM certified' },
]

export default function Hero() {
  const reduced = useReducedMotion()
  const mask = pickMask(reduced)
  const words = profile.fullName.split(' ')

  return (
    <section id="top" className="relative mx-auto max-w-6xl px-6 pt-14 pb-20 sm:pt-20 sm:pb-28">
      <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
        <motion.div variants={stagger(0.085, 0.05)} initial="hidden" animate="show">
          <motion.p
            variants={pick(fadeUp, reduced)}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/80 py-1.5 pr-4 pl-2 font-mono text-[11px] tracking-[0.14em] text-text-dim uppercase backdrop-blur"
          >
            <span className="relative flex h-5 w-5 items-center justify-center">
              {!reduced && (
                <span className="pulse-ring absolute inset-0 rounded-full bg-primary/30" aria-hidden="true" />
              )}
              <FaShieldHalved size={11} className="relative text-primary" aria-hidden="true" />
            </span>
            {profile.kicker}
          </motion.p>

          {/* Mask-reveal heading: each word slides up from behind a clip. */}
          <h1 className="font-display display-tight text-[2.75rem] font-bold text-heading sm:text-[4rem] lg:text-[4.6rem]">
            {words.map((word, i) => (
              <span key={word} className="mask-line mr-3.5 block sm:inline-block">
                <motion.span
                  variants={mask}
                  className={`inline-block ${i === 0 ? 'glow-text-accent' : 'text-text-dim'}`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            variants={pick(fadeUp, reduced)}
            className="mt-5 flex items-center gap-3 font-mono text-lg text-primary sm:text-xl"
          >
            <span className="h-px w-8 bg-primary/50" aria-hidden="true" />
            <p className="min-h-[1.9rem]">
              <TypingText text={profile.title} startDelay={900} speed={52} />
            </p>
          </motion.div>

          <motion.p
            variants={pick(fadeUp, reduced)}
            className="text-pretty mt-6 max-w-xl text-base leading-[1.75] text-text sm:text-[1.0625rem]"
          >
            {profile.tagline}
          </motion.p>

          <motion.div variants={pick(fadeUp, reduced)} className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticLink
              href={resumeUrl}
              download
              strength={5}
              aria-label="Download resume as PDF"
              className="btn-sweep group inline-flex items-center gap-2.5 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-bg shadow-[0_0_0_1px_var(--color-primary-line),0_14px_34px_-16px_var(--color-primary)] transition-shadow duration-300 hover:shadow-[0_0_0_1px_var(--color-primary),0_16px_40px_-12px_var(--color-primary)]"
            >
              <FaFileArrowDown size={14} aria-hidden="true" />
              Download Resume
            </MagneticLink>
            <MagneticLink
              href="#projects"
              strength={4}
              className="panel elev-1 group inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-text transition-colors duration-300 hover:border-primary-line hover:text-primary"
            >
              View Projects
              <FaArrowRight
                size={12}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </MagneticLink>
            <a
              href="#contact"
              className="link-underline inline-flex items-center px-2 py-3 font-mono text-sm text-text-dim transition-colors duration-200 hover:text-heading"
            >
              get in touch
            </a>
          </motion.div>

          <motion.dl
            variants={pick(fadeUp, reduced)}
            className="panel elev-1 mt-12 grid max-w-lg grid-cols-3 overflow-hidden rounded-xl"
          >
            {markers.map((marker, i) => (
              <div
                key={marker.label}
                className={`px-4 py-4 ${i > 0 ? 'border-l border-border' : ''}`}
              >
                <dt className="font-display text-xl font-bold text-primary">{marker.value}</dt>
                <dd className="mt-1 font-mono text-[11px] leading-snug tracking-wide text-text-dim uppercase">
                  {marker.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        >
          <HeroGraphic />
        </motion.div>
      </div>

      <div className="mt-16 max-w-3xl">
        <Terminal />
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to the About section"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="mt-14 hidden items-center gap-2.5 font-mono text-[11px] tracking-[0.16em] text-text-dim uppercase transition-colors duration-300 hover:text-primary lg:inline-flex"
      >
        <motion.span
          aria-hidden="true"
          animate={reduced ? undefined : { y: [0, 5, 0] }}
          transition={reduced ? undefined : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-border"
        >
          <FaArrowDown size={10} />
        </motion.span>
        scroll
      </motion.a>
    </section>
  )
}
