import { motion, useReducedMotion } from 'framer-motion'
import { FaFileArrowDown, FaArrowRight, FaShieldHalved } from 'react-icons/fa6'
import { profile } from '../data'
import { resumeUrl } from '../links'
import { EASE, fadeUp, pick, stagger } from '../motion'
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
  const words = profile.fullName.split(' ')

  return (
    <section id="top" className="relative mx-auto max-w-6xl px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <motion.div variants={stagger(0.09, 0.05)} initial="hidden" animate="show">
          <motion.p
            variants={pick(fadeUp, reduced)}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-text-dim uppercase"
          >
            <FaShieldHalved size={11} className="text-primary" aria-hidden="true" />
            {profile.kicker}
          </motion.p>

          <h1 className="font-display text-4xl leading-[1.05] font-bold text-heading sm:text-6xl lg:text-[4.2rem]">
            {words.map((word, i) => (
              <motion.span
                key={word}
                variants={pick(fadeUp, reduced)}
                className={`mr-3 inline-block ${i === 0 ? 'glow-text-accent' : 'text-text-dim'}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            variants={pick(fadeUp, reduced)}
            className="mt-4 min-h-[1.9rem] font-mono text-lg text-primary sm:text-xl"
          >
            <TypingText text={profile.title} startDelay={600} speed={52} />
          </motion.p>

          <motion.p
            variants={pick(fadeUp, reduced)}
            className="text-balance mt-6 max-w-xl text-base leading-relaxed text-text sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div variants={pick(fadeUp, reduced)} className="mt-8 flex flex-wrap gap-3">
            <a
              href={resumeUrl}
              download
              aria-label="Download resume as PDF"
              className="btn-sweep group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-bg transition-shadow duration-300 hover:shadow-[0_0_34px_-8px_var(--color-primary)]"
            >
              <FaFileArrowDown size={14} aria-hidden="true" />
              Download Resume
            </a>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-3 text-sm font-semibold text-text transition-colors duration-300 hover:border-primary-line hover:text-primary"
            >
              View Projects
              <FaArrowRight
                size={12}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#contact"
              className="link-underline inline-flex items-center px-2 py-3 font-mono text-sm text-text-dim transition-colors duration-200 hover:text-heading"
            >
              get in touch
            </a>
          </motion.div>

          <motion.dl
            variants={pick(fadeUp, reduced)}
            className="mt-12 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-lg border border-border bg-border"
          >
            {markers.map((marker) => (
              <div key={marker.label} className="bg-surface px-4 py-4">
                <dt className="font-display text-lg font-bold text-primary sm:text-xl">
                  {marker.value}
                </dt>
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
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
        >
          <HeroGraphic />
        </motion.div>
      </div>

      <div className="mt-16 max-w-3xl">
        <Terminal />
      </div>
    </section>
  )
}
