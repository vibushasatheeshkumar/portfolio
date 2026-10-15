import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '../motion'

/**
 * Abstract, decorative SVG motifs — one per project.
 *
 * These are illustrations of the *kind* of work each project does, not
 * screenshots and not real output. No figure here is derived from or
 * represents actual data, metrics, scores or application state, which is why
 * every value is a fixed coordinate and nothing is labelled with a number.
 * All of it is aria-hidden; the card's text carries the real meaning.
 */

const VIEW = { width: 320, height: 104 }

// `preserveAspectRatio="none"` lets a drawing fill bands of any width, and the
// `.diagram` class holds every stroke at a constant weight via vector-effect so
// nothing looks smeared when the band is much wider than the viewBox.
function Frame({ children, className = '' }) {
  return (
    <svg
      viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
      preserveAspectRatio="none"
      className={`diagram h-full w-full ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

const draw = (reduced, delay = 0) =>
  reduced
    ? {}
    : {
        initial: { pathLength: 0, opacity: 0 },
        whileInView: { pathLength: 1, opacity: 1 },
        viewport: { once: true, amount: 0.4 },
        transition: { duration: 1.1, ease: EASE, delay },
      }

const pop = (reduced, delay = 0) =>
  reduced
    ? {}
    : {
        initial: { scale: 0, opacity: 0 },
        whileInView: { scale: 1, opacity: 1 },
        viewport: { once: true, amount: 0.4 },
        transition: { duration: 0.45, ease: EASE, delay },
      }

/* ---------------------------------------------------------------------------
 * CogniShield AI — threat intelligence, analytics, AI-assisted investigation.
 * A correlation graph: entities linked into a constellation, with concentric
 * analysis rings and a shield-shaped focal node.
 * ------------------------------------------------------------------------- */

const INTEL_NODES = [
  { x: 60, y: 30, r: 3 },
  { x: 104, y: 62, r: 2.5 },
  { x: 150, y: 24, r: 2.5 },
  { x: 196, y: 54, r: 3 },
  { x: 240, y: 32, r: 2.5 },
  { x: 268, y: 70, r: 2 },
  { x: 36, y: 74, r: 2 },
  { x: 132, y: 86, r: 2 },
]

const INTEL_EDGES = [
  'M60,30 L104,62',
  'M104,62 L150,24',
  'M150,24 L196,54',
  'M196,54 L240,32',
  'M240,32 L268,70',
  'M36,74 L104,62',
  'M104,62 L132,86',
  'M132,86 L196,54',
]

function CogniShieldVisual() {
  const reduced = useReducedMotion()

  return (
    <Frame>
      {/* analysis rings around the focal point */}
      {[22, 34, 46].map((r, i) => (
        <motion.circle
          key={r}
          cx="150"
          cy="52"
          r={r}
          fill="none"
          stroke="var(--color-primary)"
          strokeOpacity={0.2 - i * 0.04}
          strokeWidth="1"
          strokeDasharray="3 5"
          {...pop(reduced, 0.1 + i * 0.08)}
        />
      ))}

      {INTEL_EDGES.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="var(--color-primary)"
          strokeOpacity="0.4"
          strokeWidth="1"
          {...draw(reduced, 0.15 + i * 0.05)}
        />
      ))}

      {INTEL_NODES.map((n, i) => (
        <motion.circle
          key={`${n.x}-${n.y}`}
          cx={n.x}
          cy={n.y}
          r={n.r}
          className="fill-primary/70 transition-all duration-500 group-hover:fill-primary"
          {...pop(reduced, 0.3 + i * 0.05)}
        />
      ))}

      {/* focal shield glyph */}
      <motion.path
        d="M150,36 L164,42 L164,54 Q164,66 150,72 Q136,66 136,54 L136,42 Z"
        fill="var(--color-bg)"
        stroke="var(--color-primary)"
        strokeWidth="1.4"
        {...draw(reduced, 0.45)}
      />
      <motion.path
        d="M144,53 L149,58 L157,47"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...draw(reduced, 0.9)}
      />

      {/* classification ticks */}
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={i}
          x={282}
          y={28 + i * 12}
          width={i === 1 ? 26 : i === 0 ? 18 : 12}
          height="3"
          rx="1.5"
          className={i === 1 ? 'fill-primary/60' : 'fill-text-dim/35'}
          {...pop(reduced, 0.6 + i * 0.07)}
        />
      ))}
    </Frame>
  )
}

/* ---------------------------------------------------------------------------
 * Watchtower — telemetry, detection pipeline, SIEM events, alert correlation.
 * Event lanes stream left to right through pipeline stages into one alert.
 * ------------------------------------------------------------------------- */

const LANES = [26, 44, 62, 80]
const EVENTS = [
  [18, 34, 52, 74, 96],
  [24, 46, 68, 88],
  [16, 40, 60, 84, 104],
  [30, 56, 78],
]

function WatchtowerVisual() {
  const reduced = useReducedMotion()

  return (
    <Frame>
      {/* telemetry lanes */}
      {LANES.map((y, lane) => (
        <g key={y}>
          <motion.line
            x1="10"
            y1={y}
            x2="150"
            y2={y}
            stroke="var(--color-border-strong)"
            strokeWidth="1"
            {...draw(reduced, 0.05 * lane)}
          />
          {EVENTS[lane].map((x, i) => (
            <motion.rect
              key={x}
              x={x + 10}
              y={y - 3}
              width="3"
              height="6"
              rx="1"
              className={
                lane === 2 && i === 3 ? 'fill-secondary/80' : 'fill-primary/45'
              }
              {...pop(reduced, 0.2 + lane * 0.06 + i * 0.04)}
            />
          ))}
        </g>
      ))}

      {/* converging funnel into the correlation stage */}
      {LANES.map((y, i) => (
        <motion.path
          key={y}
          d={`M150,${y} C178,${y} 182,53 200,53`}
          fill="none"
          stroke="var(--color-primary)"
          strokeOpacity="0.3"
          strokeWidth="1"
          {...draw(reduced, 0.35 + i * 0.06)}
        />
      ))}

      {/* pipeline stages */}
      {[
        { x: 200, label: 'rule' },
        { x: 238, label: 'correlate' },
      ].map((stage, i) => (
        <motion.rect
          key={stage.label}
          x={stage.x}
          y="43"
          width="20"
          height="20"
          rx="4"
          fill="var(--color-surface-2)"
          stroke="var(--color-primary)"
          strokeOpacity="0.45"
          strokeWidth="1"
          {...pop(reduced, 0.6 + i * 0.12)}
        />
      ))}
      <motion.line
        x1="220"
        y1="53"
        x2="238"
        y2="53"
        stroke="var(--color-primary)"
        strokeOpacity="0.4"
        strokeWidth="1"
        {...draw(reduced, 0.72)}
      />
      <motion.line
        x1="258"
        y1="53"
        x2="276"
        y2="53"
        stroke="var(--color-primary)"
        strokeOpacity="0.4"
        strokeWidth="1"
        {...draw(reduced, 0.84)}
      />

      {/* alert output */}
      <motion.path
        d="M288,44 L298,62 L278,62 Z"
        fill="var(--color-bg)"
        stroke="var(--color-secondary)"
        strokeWidth="1.4"
        strokeLinejoin="round"
        {...draw(reduced, 0.95)}
      />
      <motion.circle
        cx="288"
        cy="57"
        r="1.4"
        className="fill-secondary"
        {...pop(reduced, 1.15)}
      />
    </Frame>
  )
}

/* ---------------------------------------------------------------------------
 * MallnSight — static malware analysis, PE metadata, entropy, indicators.
 * An entropy profile over a segmented file-section map, with a signature grid.
 * ------------------------------------------------------------------------- */

// Fixed decorative silhouette — not measured from any file.
const ENTROPY = [
  14, 22, 18, 30, 26, 44, 38, 52, 46, 62, 70, 58, 48, 36, 42, 30, 24, 34, 20, 16,
]

const SECTIONS = [
  { x: 14, w: 52, accent: false },
  { x: 68, w: 38, accent: false },
  { x: 108, w: 64, accent: true },
  { x: 174, w: 44, accent: false },
  { x: 220, w: 32, accent: false },
]

function MallnSightVisual() {
  const reduced = useReducedMotion()

  return (
    <Frame>
      {/* entropy profile */}
      {ENTROPY.map((h, i) => (
        <motion.rect
          key={i}
          x={14 + i * 12}
          y={70 - h}
          width="7"
          height={h}
          rx="1.5"
          className={h > 55 ? 'fill-primary/70' : 'fill-primary/25'}
          style={{ transformOrigin: `${17.5 + i * 12}px 70px` }}
          {...(reduced
            ? {}
            : {
                initial: { scaleY: 0, opacity: 0 },
                whileInView: { scaleY: 1, opacity: 1 },
                viewport: { once: true, amount: 0.4 },
                transition: { duration: 0.5, ease: EASE, delay: 0.1 + i * 0.03 },
              })}
        />
      ))}

      {/* high-entropy threshold marker */}
      <motion.line
        x1="10"
        y1="18"
        x2="310"
        y2="18"
        stroke="var(--color-secondary)"
        strokeOpacity="0.35"
        strokeWidth="1"
        strokeDasharray="4 6"
        {...draw(reduced, 0.5)}
      />

      {/* file section map */}
      <motion.line
        x1="10"
        y1="78"
        x2="310"
        y2="78"
        stroke="var(--color-border-strong)"
        strokeWidth="1"
        {...draw(reduced, 0.2)}
      />
      {SECTIONS.map((s, i) => (
        <motion.rect
          key={s.x}
          x={s.x}
          y="84"
          width={s.w}
          height="6"
          rx="2"
          className={s.accent ? 'fill-primary/55' : 'fill-text-dim/30'}
          style={{ transformOrigin: `${s.x}px 87px` }}
          {...(reduced
            ? {}
            : {
                initial: { scaleX: 0 },
                whileInView: { scaleX: 1 },
                viewport: { once: true, amount: 0.4 },
                transition: { duration: 0.5, ease: EASE, delay: 0.55 + i * 0.08 },
              })}
        />
      ))}

      {/* signature-match grid */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <motion.rect
            key={`${row}-${col}`}
            x={262 + col * 11}
            y={28 + row * 11}
            width="7"
            height="7"
            rx="1.5"
            className={
              (row === 1 && col === 2) || (row === 0 && col === 0)
                ? 'fill-secondary/60'
                : 'fill-text-dim/22'
            }
            {...pop(reduced, 0.7 + (row * 4 + col) * 0.035)}
          />
        )),
      )}
    </Frame>
  )
}

const VISUALS = {
  'CogniShield AI': CogniShieldVisual,
  Watchtower: WatchtowerVisual,
  MallnSight: MallnSightVisual,
}

/** Technical caption shown under each motif — describes the drawing, not data. */
const CAPTIONS = {
  'CogniShield AI': 'correlation graph · abstract',
  Watchtower: 'telemetry pipeline · abstract',
  MallnSight: 'entropy profile · abstract',
}

export default function ProjectVisual({ name, tall = false }) {
  const Visual = VISUALS[name]
  if (!Visual) return null

  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-border bg-surface-2/60 ${
        tall ? 'h-[150px]' : 'h-[104px]'
      }`}
      aria-hidden="true"
    >
      {/* fine grid bed */}
      <span
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.028) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />
      <span className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent" />

      <div className="relative h-full w-full">
        <Visual />
      </div>

      <span className="absolute right-2 bottom-1.5 font-mono text-[10px] tracking-[0.1em] text-text-dim uppercase">
        {CAPTIONS[name]}
      </span>
    </div>
  )
}
