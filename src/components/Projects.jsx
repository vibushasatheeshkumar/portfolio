import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import {
  FaSatelliteDish,
  FaFileShield,
  FaShieldHalved,
  FaGithub,
  FaArrowUpRightFromSquare,
} from 'react-icons/fa6'
import Section from './Section'
import { projects } from '../data'
import { pick, riseIn, stagger, viewportOnce } from '../motion'
import useSpotlight from '../useSpotlight'

const projectIcons = {
  'CogniShield AI': FaShieldHalved,
  Watchtower: FaSatelliteDish,
  MallnSight: FaFileShield,
}

const TILT = 6 // max degrees of rotation
const SPRING = { stiffness: 220, damping: 22, mass: 0.6 }

const CORNERS = [
  'top-3 left-3 border-t border-l rounded-tl-sm',
  'top-3 right-3 border-t border-r rounded-tr-sm',
  'bottom-3 left-3 border-b border-l rounded-bl-sm',
  'bottom-3 right-3 border-b border-r rounded-br-sm',
]

/**
 * The whole card is a single anchor to the repository, so there are no nested
 * interactive elements and the card is reachable with Tab. Pointer tilt and
 * lighting are mouse-only and are skipped under reduced motion.
 */
function ProjectCard({ project, index }) {
  const Icon = projectIcons[project.name] || FaSatelliteDish
  const reduced = useReducedMotion()
  const spotlight = useSpotlight()

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-TILT, TILT]), SPRING)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [TILT, -TILT]), SPRING)

  const handlePointerMove = (event) => {
    spotlight.onPointerMove(event)
    if (reduced || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    px.set((event.clientX - rect.left) / rect.width - 0.5)
    py.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const handlePointerLeave = (event) => {
    spotlight.onPointerLeave(event)
    px.set(0)
    py.set(0)
  }

  return (
    <motion.a
      href={project.repo}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.name} — ${project.tagline}. Opens the GitHub repository in a new tab.`}
      variants={pick(riseIn, reduced)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onBlur={() => {
        px.set(0)
        py.set(0)
      }}
      whileHover={reduced ? undefined : { y: -8 }}
      transition={{ type: 'spring', ...SPRING }}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      className="panel elev-1 card-ring spotlight group relative flex flex-col rounded-xl p-6 transition-shadow duration-300 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07),0_28px_60px_-28px_rgba(0,0,0,0.95),0_0_40px_-22px_var(--color-primary)]"
    >
      <span className="edge-accent" aria-hidden="true" />
      {CORNERS.map((position) => (
        <span key={position} className={`corner ${position}`} aria-hidden="true" />
      ))}

      <div className="relative flex items-start gap-3.5">
        <span className="panel-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-primary transition-colors duration-300 group-hover:border-primary-line">
          <Icon size={17} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-lg font-semibold text-heading">{project.name}</h3>
            <span className="font-mono text-[10px] text-text-dim" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <p className="mt-1 font-mono text-[11px] leading-snug text-primary">{project.tagline}</p>
        </div>
        <FaArrowUpRightFromSquare
          size={12}
          aria-hidden="true"
          className="mt-1 shrink-0 text-text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
        />
      </div>

      <ul className="relative mt-5 flex-1 space-y-2.5 text-sm leading-relaxed text-text">
        {project.points.map((point) => (
          <li key={point} className="flex gap-2.5">
            <span
              aria-hidden="true"
              className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-primary/60 transition-colors duration-300 group-hover:bg-primary"
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-text-dim transition-colors duration-300 group-hover:border-border-strong"
          >
            {tech}
          </span>
        ))}
      </div>

      <span className="relative mt-5 inline-flex items-center gap-2 border-t border-border pt-4 font-mono text-[11px] text-text-dim transition-colors duration-300 group-hover:text-primary">
        <FaGithub size={12} aria-hidden="true" />
        view repository
        <span
          aria-hidden="true"
          className="ml-auto h-px w-0 bg-primary/50 transition-all duration-500 group-hover:w-10"
        />
      </span>
    </motion.a>
  )
}

export default function Projects() {
  return (
    <Section
      id="projects"
      index={3}
      title="Projects"
      kicker="builds"
      intro="Security tooling I have built end to end. Each card links to its source on GitHub."
    >
      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </motion.div>
    </Section>
  )
}
