import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { FaSatelliteDish, FaFileShield, FaShieldHalved, FaGithub, FaArrowUpRightFromSquare } from 'react-icons/fa6'
import Section from './Section'
import { projects } from '../data'
import { fadeUp, pick, stagger, viewportOnce } from '../motion'

const projectIcons = {
  'CogniShield AI': FaShieldHalved,
  Watchtower: FaSatelliteDish,
  MallnSight: FaFileShield,
}

const TILT = 7 // max degrees of rotation
const SPRING = { stiffness: 220, damping: 22, mass: 0.6 }

/**
 * The whole card is a single anchor to the repository, so there are no nested
 * interactive elements and the card is reachable with Tab. Pointer tilt is
 * mouse-only and is skipped entirely when reduced motion is preferred.
 */
function ProjectCard({ project }) {
  const Icon = projectIcons[project.name] || FaSatelliteDish
  const reduced = useReducedMotion()

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-TILT, TILT]), SPRING)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [TILT, -TILT]), SPRING)

  const handlePointerMove = (event) => {
    if (reduced || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    px.set((event.clientX - rect.left) / rect.width - 0.5)
    py.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const resetTilt = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <motion.a
      href={project.repo}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.name} — ${project.tagline}. Opens the GitHub repository in a new tab.`}
      variants={pick(fadeUp, reduced)}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onBlur={resetTilt}
      whileHover={reduced ? undefined : { y: -6 }}
      transition={{ type: 'spring', ...SPRING }}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      className="panel card-ring group relative flex flex-col rounded-xl p-6 transition-shadow duration-300 hover:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9),0_0_30px_-18px_var(--color-primary)]"
    >
      {/* Accent top edge that grows on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-primary to-transparent transition-transform duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />

      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 text-primary transition-colors duration-300 group-hover:border-primary-line">
          <Icon size={17} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-semibold text-heading">{project.name}</h3>
          <p className="mt-0.5 font-mono text-[11px] leading-snug text-primary">{project.tagline}</p>
        </div>
        <FaArrowUpRightFromSquare
          size={12}
          aria-hidden="true"
          className="mt-1 shrink-0 text-text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
        />
      </div>

      <ul className="mt-5 flex-1 space-y-2.5 text-sm leading-relaxed text-text">
        {project.points.map((point) => (
          <li key={point} className="flex gap-2.5">
            <span aria-hidden="true" className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-primary/60" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-text-dim"
          >
            {tech}
          </span>
        ))}
      </div>

      <span className="mt-5 inline-flex items-center gap-2 border-t border-border pt-4 font-mono text-[11px] text-text-dim transition-colors duration-300 group-hover:text-primary">
        <FaGithub size={12} aria-hidden="true" />
        view repository
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
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </motion.div>
    </Section>
  )
}
