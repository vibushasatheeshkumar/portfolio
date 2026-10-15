import { motion, useReducedMotion } from 'framer-motion'
import { FaLock, FaTerminal, FaBug } from 'react-icons/fa6'
import profilePhoto from '../assets/profile.jpeg'
import { EASE } from '../motion'

const badges = [
  { Icon: FaLock, label: 'lock', className: 'top-3 -left-1', tone: 'text-primary border-primary-line' },
  {
    Icon: FaTerminal,
    label: 'terminal',
    className: 'top-1/2 -right-2 -translate-y-1/2',
    tone: 'text-secondary border-secondary-line',
  },
  { Icon: FaBug, label: 'bug', className: '-bottom-1 left-12', tone: 'text-primary border-primary-line' },
]

// Bearing labels around the dial. Purely decorative orientation marks.
const BEARINGS = [
  { deg: 0, label: '000' },
  { deg: 90, label: '090' },
  { deg: 180, label: '180' },
  { deg: 270, label: '270' },
]

const TICKS = Array.from({ length: 48 }, (_, i) => i * 7.5)

export default function HeroGraphic() {
  const reduced = useReducedMotion()

  return (
    <div className="relative mx-auto flex h-[19rem] w-[19rem] items-center justify-center sm:h-[21rem] sm:w-[21rem]">
      {/* Outer dashed ring, clipped to a circle so its rotated bounding box
          never reaches past the painted circle. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full" aria-hidden="true">
        <div className="spin-slow absolute inset-px rounded-full border border-dashed border-border-strong" />
      </div>

      {/* Dial: ticks, bearings, scan arcs */}
      <svg
        viewBox="0 0 200 200"
        className="pointer-events-none absolute inset-[5%]"
        aria-hidden="true"
        fill="none"
      >
        <circle cx="100" cy="100" r="96" stroke="var(--color-border)" strokeWidth="1" />
        <circle
          cx="100"
          cy="100"
          r="78"
          stroke="var(--color-border)"
          strokeOpacity="0.6"
          strokeWidth="1"
          strokeDasharray="2 7"
        />

        {TICKS.map((deg, i) => {
          const major = i % 6 === 0
          return (
            <line
              key={deg}
              x1="100"
              y1="4"
              x2="100"
              y2={major ? 14 : 9}
              stroke={major ? 'var(--color-primary)' : 'var(--color-border-strong)'}
              strokeWidth={major ? 1.5 : 1}
              opacity={major ? 0.85 : 0.5}
              transform={`rotate(${deg} 100 100)`}
            />
          )
        })}

        {/* Scan arcs — two partial rings that trace the dial on entry */}
        <motion.path
          d="M100,18 A82,82 0 0,1 182,100"
          stroke="var(--color-primary)"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.5 }}
        />
        <motion.path
          d="M100,182 A82,82 0 0,1 18,100"
          stroke="var(--color-secondary)"
          strokeOpacity="0.3"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.7 }}
        />

        {/* Crosshair ticks */}
        {[
          [100, 30, 100, 38],
          [100, 162, 100, 170],
          [30, 100, 38, 100],
          [162, 100, 170, 100],
        ].map(([x1, y1, x2, y2]) => (
          <line
            key={`${x1}-${y1}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--color-primary)"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* Fine technical labels around the dial */}
      {BEARINGS.map(({ deg, label }) => {
        const position = {
          0: 'top-[1%] left-1/2 -translate-x-1/2',
          90: 'right-[1%] top-1/2 -translate-y-1/2',
          180: 'bottom-[1%] left-1/2 -translate-x-1/2',
          270: 'left-[1%] top-1/2 -translate-y-1/2',
        }[deg]
        return (
          <motion.span
            key={label}
            aria-hidden="true"
            className={`absolute font-mono text-[9px] tracking-[0.18em] text-text-dim ${position}`}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            {label}
          </motion.span>
        )
      })}

      {/* Radar sweep, masked to the ring band */}
      {!reduced && (
        <div
          className="pointer-events-none absolute inset-[14%] overflow-hidden rounded-full"
          aria-hidden="true"
        >
          <div className="radar absolute inset-0 rounded-full" />
        </div>
      )}

      {/* Counter-rotating ring with orbiting markers */}
      <div className="pointer-events-none absolute inset-[18%]" aria-hidden="true">
        <div className="spin-reverse relative h-full w-full rounded-full border border-primary/20">
          <span className="absolute -top-[3.5px] left-1/2 h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)]" />
          <span className="absolute top-1/2 -right-[3px] h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-secondary/70" />
          <span className="absolute -bottom-[2.5px] left-[30%] h-1.5 w-1.5 rounded-full bg-primary/50" />
        </div>
      </div>

      {/* Ambient bloom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[22%] rounded-full bg-primary/10 blur-3xl"
      />

      {/* Photo frame */}
      <motion.div
        className="group relative h-[10.5rem] w-[10.5rem] sm:h-[11.5rem] sm:w-[11.5rem]"
        initial={reduced ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
      >
        <div className="panel elev-2 relative h-full w-full overflow-hidden rounded-[1.25rem]">
          <img
            src={profilePhoto}
            alt="Vibusha Satheeshkumar"
            width="184"
            height="184"
            className="h-full w-full object-cover grayscale-[45%] contrast-[1.05] transition-[filter] duration-700 group-hover:grayscale-0"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-primary/[0.07] mix-blend-overlay"
          />
          {!reduced && (
            <span
              aria-hidden="true"
              className="scanline pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-primary/[0.09] to-transparent"
            />
          )}
        </div>

        {[
          '-top-2 -left-2 border-t-2 border-l-2 rounded-tl-md',
          '-top-2 -right-2 border-t-2 border-r-2 rounded-tr-md',
          '-bottom-2 -left-2 border-b-2 border-l-2 rounded-bl-md',
          '-bottom-2 -right-2 border-b-2 border-r-2 rounded-br-md',
        ].map((position) => (
          <span
            key={position}
            aria-hidden="true"
            className={`absolute h-5 w-5 border-primary/70 ${position}`}
          />
        ))}
      </motion.div>

      {badges.map(({ Icon, label, className, tone }, i) => (
        <motion.span
          key={label}
          aria-hidden="true"
          className={`panel elev-1 absolute flex h-10 w-10 items-center justify-center rounded-xl border ${tone} ${className}`}
          initial={reduced ? false : { opacity: 0, scale: 0.6 }}
          animate={reduced ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -7, 0] }}
          transition={
            reduced
              ? undefined
              : {
                  opacity: { duration: 0.4, delay: 0.7 + i * 0.12 },
                  scale: { duration: 0.5, ease: EASE, delay: 0.7 + i * 0.12 },
                  y: { duration: 4.5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 },
                }
          }
        >
          <Icon size={14} />
        </motion.span>
      ))}
    </div>
  )
}
