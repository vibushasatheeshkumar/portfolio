import { motion, useReducedMotion } from 'framer-motion'
import { FaLock, FaTerminal, FaBug } from 'react-icons/fa6'
import profilePhoto from '../assets/profile.jpeg'

const badges = [
  { Icon: FaLock, className: 'top-2 -left-2', accent: 'text-primary border-primary-line' },
  { Icon: FaTerminal, className: 'top-1/2 -right-3 -translate-y-1/2', accent: 'text-secondary border-secondary-line' },
  { Icon: FaBug, className: '-bottom-2 left-10', accent: 'text-primary border-primary-line' },
]

export default function HeroGraphic() {
  const reduced = useReducedMotion()
  const spin = (duration, direction = 1) =>
    reduced ? undefined : { rotate: 360 * direction, transition: { duration, repeat: Infinity, ease: 'linear' } }

  return (
    <div className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80">
      {/* Rotating rings — transform-only, so they stay on the compositor. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-dashed border-border-strong"
        animate={spin(44)}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-5 rounded-full border border-primary/20"
        animate={spin(30, -1)}
      >
        <span className="absolute -top-[3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
      </motion.div>

      {/* Ambient accent bloom */}
      <div
        aria-hidden="true"
        className="absolute inset-12 rounded-full bg-primary/10 blur-3xl"
      />

      {/* Photo frame with corner brackets */}
      <div className="relative h-44 w-44 sm:h-48 sm:w-48">
        <div className="panel glow-accent h-full w-full overflow-hidden rounded-2xl">
          <img
            src={profilePhoto}
            alt="Vibusha Satheeshkumar"
            width="192"
            height="192"
            className="h-full w-full object-cover grayscale-[35%] transition-[filter] duration-500 hover:grayscale-0"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/55 via-transparent to-transparent"
          />
        </div>

        {['-top-1.5 -left-1.5 border-t-2 border-l-2', '-top-1.5 -right-1.5 border-t-2 border-r-2', '-bottom-1.5 -left-1.5 border-b-2 border-l-2', '-bottom-1.5 -right-1.5 border-b-2 border-r-2'].map(
          (position) => (
            <span
              key={position}
              aria-hidden="true"
              className={`absolute h-4 w-4 border-primary ${position}`}
            />
          ),
        )}
      </div>

      {badges.map(({ Icon, className, accent }, i) => (
        <motion.span
          key={className}
          aria-hidden="true"
          className={`panel absolute flex h-10 w-10 items-center justify-center rounded-xl border ${accent} ${className}`}
          animate={reduced ? undefined : { y: [0, -7, 0] }}
          transition={
            reduced
              ? undefined
              : { duration: 4.5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }
          }
        >
          <Icon size={14} />
        </motion.span>
      ))}
    </div>
  )
}
