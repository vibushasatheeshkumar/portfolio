import { motion, useReducedMotion } from 'framer-motion'
import {
  FaArrowUpRightFromSquare,
  FaAward,
  FaFileShield,
  FaCircleCheck,
  FaListCheck,
} from 'react-icons/fa6'
import Section from './Section'
import { research } from '../data'
import { EASE, fadeUp, pick, riseIn, stagger, viewportOnce } from '../motion'
import useSpotlight from '../useSpotlight'

function GroupHeading({ Icon, title, count }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      variants={pick(fadeUp, reduced)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="mb-5 flex items-center gap-2.5"
    >
      <span className="panel-2 flex h-7 w-7 items-center justify-center rounded-md text-primary">
        <Icon size={11} aria-hidden="true" />
      </span>
      <h3 className="label-mono text-text">{title}</h3>
      <span className="hairline flex-1" aria-hidden="true" />
      <span className="font-mono text-[11px] text-text-dim tabular-nums">
        {String(count).padStart(2, '0')}
      </span>
    </motion.div>
  )
}

function EvidenceLink({ link, strong = false }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`link-underline inline-flex items-center gap-1.5 font-mono font-medium text-primary ${
        strong ? 'text-[12px]' : 'text-[11px]'
      }`}
    >
      {link.label}
      <FaArrowUpRightFromSquare size={9} aria-hidden="true" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}

function StatusChip({ label, emphasis = false }) {
  return (
    <span
      className={`shrink-0 rounded border px-2 py-0.5 font-mono text-[11px] tracking-[0.1em] uppercase ${
        emphasis
          ? 'border-primary-line bg-primary-soft text-primary'
          : 'border-border-strong bg-surface-2 text-text-dim'
      }`}
    >
      {label}
    </span>
  )
}

/** Severity readout: numeral, label, and a proportional bar out of 10. */
function SeverityMeter({ severity }) {
  const reduced = useReducedMotion()
  const critical = severity.label === 'Critical'
  const fraction = Math.min(parseFloat(severity.score) / 10, 1)

  return (
    <div
      className={`w-[7.5rem] shrink-0 rounded-lg border px-3 py-2 ${
        critical ? 'border-primary-line bg-primary-soft' : 'border-border-strong bg-surface-2'
      }`}
    >
      <div className="flex items-baseline gap-1.5">
        <span
          className={`font-display text-xl leading-none font-bold tabular-nums ${
            critical ? 'text-primary' : 'text-heading'
          }`}
        >
          {severity.score}
        </span>
        <span className="font-mono text-[10px] tracking-[0.08em] text-text uppercase">
          {severity.label}
        </span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-bg/70">
        <motion.span
          aria-hidden="true"
          className={`block h-full w-full origin-left rounded-full ${
            critical ? 'bg-primary' : 'bg-text-dim'
          }`}
          initial={reduced ? false : { scaleX: 0 }}
          whileInView={{ scaleX: fraction }}
          viewport={viewportOnce}
          transition={{ duration: reduced ? 0 : 0.9, ease: EASE, delay: reduced ? 0 : 0.2 }}
        />
      </div>
      <p className="mt-1.5 font-mono text-[10px] text-text">CVSS / 10</p>
    </div>
  )
}

export default function Research() {
  const reduced = useReducedMotion()
  const spotlight = useSpotlight()

  return (
    <Section
      id="research"
      index={4}
      title="Security Research & Recognition"
      kicker="disclosure"
      intro="Vulnerabilities I have reported through coordinated disclosure. Published advisories and vendor acknowledgements are linked to their official evidence; entries without a public record are listed separately."
    >
      <div className="space-y-14">
        {/* ---------- Recognition: the editorial lead of this section ---------- */}
        <div>
          <GroupHeading Icon={FaAward} title="Recognition" count={research.recognition.length} />
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            {research.recognition.map((item) => (
              <motion.div
                key={item.title}
                variants={pick(riseIn, reduced)}
                onPointerMove={spotlight.onPointerMove}
                onPointerLeave={spotlight.onPointerLeave}
                className="panel elev-2 card-ring spotlight group relative overflow-hidden rounded-2xl p-6 sm:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-primary via-primary/40 to-transparent"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-primary/[0.07] blur-3xl"
                />

                <div className="relative flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <StatusChip label={item.status} emphasis />
                      <span className="font-mono text-[11px] text-text-dim">{item.date}</span>
                    </div>
                    <h4 className="font-display display-tight text-2xl font-bold text-heading sm:text-[2rem]">
                      {item.title}
                    </h4>
                    <p className="mt-1.5 font-mono text-[11px] text-text-dim">{item.org}</p>
                  </div>

                  <span
                    aria-hidden="true"
                    className="panel-2 relative hidden h-14 w-14 shrink-0 items-center justify-center rounded-xl text-primary sm:flex"
                  >
                    {!reduced && (
                      <span className="pulse-ring absolute inset-0 rounded-xl bg-primary/20" />
                    )}
                    <FaAward size={20} className="relative" />
                  </span>
                </div>

                <p className="text-pretty relative mt-5 max-w-2xl leading-relaxed text-text">
                  {item.summary}
                </p>

                <div className="relative mt-6 border-t border-border pt-5">
                  <EvidenceLink link={item.link} strong />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ---------- Published advisories, on a drawn timeline ---------- */}
        <div>
          <GroupHeading
            Icon={FaFileShield}
            title="Published security advisories"
            count={research.advisories.length}
          />
          <motion.ol
            variants={stagger(0.14)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative m-0 list-none space-y-4 p-0 pl-7 sm:pl-9"
          >
            <motion.span
              aria-hidden="true"
              className="absolute top-3 bottom-3 left-[3px] w-px origin-top bg-gradient-to-b from-primary/60 via-border-strong to-transparent"
              initial={reduced ? false : { scaleY: 0 }}
              whileInView={reduced ? undefined : { scaleY: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1, ease: EASE }}
            />

            {research.advisories.map((item) => (
              <motion.li
                key={item.advisoryId}
                variants={pick(riseIn, reduced)}
                className="group relative"
              >
                <span aria-hidden="true" className="absolute top-8 -left-7 sm:-left-9">
                  <span className="relative flex h-[9px] w-[9px] items-center justify-center">
                    {!reduced && (
                      <span className="pulse-ring absolute inset-0 rounded-full bg-primary/50" />
                    )}
                    <span className="relative h-[9px] w-[9px] rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)]" />
                  </span>
                </span>

                <div
                  onPointerMove={spotlight.onPointerMove}
                  onPointerLeave={spotlight.onPointerLeave}
                  className="panel elev-1 card-ring spotlight relative rounded-xl p-5 transition-colors duration-300 hover:border-border-strong sm:p-6"
                >
                  <span className="edge-accent" aria-hidden="true" />

                  <div className="relative flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="mb-2.5 flex flex-wrap items-center gap-2">
                        <StatusChip label={item.status} emphasis />
                        <span className="rounded border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-primary">
                          {item.role}
                        </span>
                      </div>
                      <h4 className="font-display text-xl font-semibold text-heading">
                        {item.title}
                      </h4>
                      <p className="mt-1 font-mono text-[11px] break-all text-text-dim">
                        {item.advisoryId}
                      </p>
                    </div>

                    <SeverityMeter severity={item.severity} />
                  </div>

                  <p className="text-pretty relative mt-4 text-sm leading-relaxed text-text">
                    {item.summary}
                  </p>

                  <div className="relative mt-4 flex flex-wrap items-center gap-1.5">
                    {item.meta.map((meta) => (
                      <span
                        key={meta}
                        className="rounded border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-text-dim"
                      >
                        {meta}
                      </span>
                    ))}
                  </div>

                  <div className="relative mt-5 border-t border-border pt-4">
                    <EvidenceLink link={item.link} />
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>

        {/* ---------- Resolved & acknowledged ---------- */}
        <div>
          <GroupHeading
            Icon={FaCircleCheck}
            title="Resolved & acknowledged"
            count={research.resolved.length}
          />
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-4"
          >
            {research.resolved.map((item) => (
              <motion.div
                key={item.title}
                variants={pick(riseIn, reduced)}
                onPointerMove={spotlight.onPointerMove}
                onPointerLeave={spotlight.onPointerLeave}
                className="panel elev-1 card-ring spotlight group relative overflow-hidden rounded-xl p-5 transition-colors duration-300 hover:border-border-strong sm:p-6"
              >
                <span className="edge-accent" aria-hidden="true" />
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-secondary/60 via-secondary/20 to-transparent"
                />

                <div className="relative flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="font-display text-xl font-semibold text-heading">{item.title}</h4>
                    <p className="text-pretty mt-2.5 max-w-2xl text-sm leading-relaxed text-text">
                      {item.summary}
                    </p>
                  </div>
                  <StatusChip label={item.status} emphasis />
                </div>

                <div className="relative mt-4 flex flex-wrap items-center gap-1.5">
                  {item.meta.map((meta) => (
                    <span
                      key={meta}
                      className="rounded border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-text-dim"
                    >
                      {meta}
                    </span>
                  ))}
                </div>

                <div className="relative mt-5 border-t border-border pt-4">
                  <EvidenceLink link={item.link} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ---------- Additional disclosures ---------- */}
        <div>
          <GroupHeading
            Icon={FaListCheck}
            title="Additional disclosures"
            count={research.disclosures.length}
          />
          <motion.ul
            variants={stagger(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="elev-1 grid gap-px overflow-hidden rounded-xl border border-border bg-border"
          >
            {research.disclosures.map((item) => (
              <motion.li
                key={item.title}
                variants={pick(fadeUp, reduced)}
                className="group relative bg-surface p-5 transition-colors duration-300 hover:bg-surface-2"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-[2px] origin-top scale-y-0 bg-primary/40 transition-transform duration-500 group-hover:scale-y-100"
                />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-[0.95rem] font-semibold text-heading">{item.title}</h4>
                  <StatusChip label={item.status} />
                </div>
                <p className="text-pretty mt-2 max-w-3xl text-sm leading-relaxed text-text">
                  {item.summary}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-text-dim"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.li>
            ))}
          </motion.ul>

          <p className="mt-4 max-w-3xl font-mono text-[11px] leading-relaxed text-text-dim">
            Severity scores and patched versions shown above are taken from the published advisories.
            Entries in this last group have no public advisory page, so no evidence link is shown.
            Technical details beyond what vendors have published are intentionally omitted.
          </p>
        </div>
      </div>
    </Section>
  )
}
