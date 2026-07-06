import { motion } from 'framer-motion'
import { profile } from '../data'
import TypingText from './TypingText'
import HeroGraphic from './HeroGraphic'
import FloatingShapes from './FloatingShapes'

export default function Hero() {
  return (
    <section id="top" className="relative mx-auto max-w-5xl px-6 pb-16 pt-20 sm:pt-28">
      <FloatingShapes />
      <div className="grid items-center gap-12 sm:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 font-mono text-sm text-secondary"
          >
            whoami
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl font-bold text-heading sm:text-6xl"
          >
            Hi, I'm <span className="gradient-text">{profile.name}</span>
          </motion.h1>
          <p className="mt-3 min-h-[1.75rem] font-mono text-lg text-primary sm:text-xl">
            <TypingText text={profile.title} startDelay={500} speed={55} />
          </p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-text sm:text-lg"
          >
            {profile.bio}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="gradient-bg rounded-full px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-8px_var(--color-primary)] transition-transform hover:scale-105"
            >
              Get In Touch
            </a>
            <a
              href="#projects"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-secondary hover:text-secondary"
            >
              View Projects
            </a>
          </motion.div>
        </div>
        <HeroGraphic />
      </div>
    </section>
  )
}
