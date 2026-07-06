import { motion } from 'framer-motion'
import { profile } from '../data'
import TypingText from './TypingText'

export default function Hero() {
  return (
    <section id="top" className="relative mx-auto max-w-5xl px-6 pb-16 pt-20 sm:pt-28">
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
        className="glow-text text-4xl font-bold text-heading sm:text-6xl"
      >
        {profile.name}
      </motion.h1>
      <p className="mt-3 min-h-[1.75rem] font-mono text-lg text-primary sm:text-xl">
        <TypingText text={profile.title} startDelay={500} speed={55} />
      </p>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-6 max-w-2xl text-base leading-relaxed text-text sm:text-lg"
      >
        {profile.bio}
      </motion.p>
    </section>
  )
}
