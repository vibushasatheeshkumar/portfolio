import { motion, useReducedMotion } from 'framer-motion'
import { FaArrowUpRightFromSquare, FaAward, FaFileShield, FaCircleCheck, FaListCheck } from 'react-icons/fa6'
import Section from './Section'
import { research } from '../data'
import { EASE, fadeUp, pick, stagger, viewportOnce } from '../motion'

function GroupHeading({ Icon, title, count }) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <Icon size={12} className="text-primary" aria-hidden="true" />
      <h3 className="label-mono text-text">{title}</h3>
      <span className="hairline flex-1" aria-hidden="true" />
      <span className="font-mono text-[11px] text-text-dim">{String(count).padStart(2, '0')}</span>
    </div>
  )
}

function EvidenceLink({ link }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="link-underline inline-flex items-center gap-1.5 font-mono text-[11px] font-medium text-primary"
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

export default function Research() {
  const reduced = useReducedMotion()

  return (
    <Section
      id="research"
      index={4}
      title="Security Research & Recognition"
      kicker="disclosure"
      intro="Vulnerabilities I have reported through coordinated disclosure. Published advisories and vendor acknowledgements are linked to their official evidence; entries without a public record are listed separately."
    >
      <div className="space-y-12">
        {/* ---------- Recognition ---------- */}
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
                variants={pick(fadeUp, reduced)}
                className="panel card-ring relative overflow-hidden rounded-xl p-6 sm:p-7"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent"
                />
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="font-display text-xl font-bold text-heading sm:text-2xl">
                      {item.title}
                    </h4>
                    <p className="mt-1 font-mono text-[11px] text-text-dim">{item.org}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <StatusChip label={item.status} emphasis />
                    <span className="font-mono text-[11px] text-text-dim">{item.date}</span>
                  </div>
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text sm:text-[0.95rem]">
                  {item.summary}
                </p>
                <div className="mt-5">
                  <EvidenceLink link={item.link} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ---------- Published advisories (timeline rail) ---------- */}
        <div>
          <GroupHeading
            Icon={FaFileShield}
            title="Published security advisories"
            count={research.advisories.length}
          />
          <motion.ol
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative m-0 list-none space-y-4 p-0 pl-6 sm:pl-8"
          >
            <motion.span
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-[3px] w-px origin-top bg-gradient-to-b from-primary/50 via-border-strong to-transparent"
              initial={reduced ? false : { scaleY: 0 }}
              whileInView={reduced ? undefined : { scaleY: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.9, ease: EASE }}
            />

            {research.advisories.map((item) => (
              <motion.li key={item.advisoryId} variants={pick(fadeUp, reduced)} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-7 -left-6 h-[7px] w-[7px] rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)] sm:-left-8"
                />
                <div className="panel card-ring rounded-xl p-5 transition-colors duration-300 hover:border-border-strong sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="font-display text-lg font-semibold text-heading">
                        {item.title}
                      </h4>
                      <p className="mt-1 font-mono text-[11px] break-all text-text-dim">
                        {item.advisoryId}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <StatusChip label={item.status} emphasis />
                      <div
                        className={`flex items-baseline gap-1.5 rounded-md border px-2.5 py-1 ${
                          item.severity.label === 'Critical'
                            ? 'border-primary-line bg-primary-soft'
                            : 'border-border-strong bg-surface-2'
                        }`}
                      >
                        <span
                          className={`font-display text-base font-bold ${
                            item.severity.label === 'Critical' ? 'text-primary' : 'text-heading'
                          }`}
                        >
                          {item.severity.score}
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.1em] text-text uppercase">
                          CVSS {item.severity.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-text">{item.summary}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-1.5">
                    <span className="rounded border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-primary">
                      {item.role}
                    </span>
                    {item.meta.map((meta) => (
                      <span
                        key={meta}
                        className="rounded border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-text-dim"
                      >
                        {meta}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 border-t border-border pt-4">
                    <EvidenceLink link={item.link} />
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>

        {/* ---------- Resolved ---------- */}
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
                variants={pick(fadeUp, reduced)}
                className="panel card-ring rounded-xl p-5 transition-colors duration-300 hover:border-border-strong sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h4 className="font-display text-lg font-semibold text-heading">{item.title}</h4>
                  <StatusChip label={item.status} emphasis />
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text">{item.summary}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {item.meta.map((meta) => (
                    <span
                      key={meta}
                      className="rounded border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-text-dim"
                    >
                      {meta}
                    </span>
                  ))}
                </div>
                <div className="mt-5 border-t border-border pt-4">
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
            className="grid gap-px overflow-hidden rounded-xl border border-border bg-border"
          >
            {research.disclosures.map((item) => (
              <motion.li
                key={item.title}
                variants={pick(fadeUp, reduced)}
                className="bg-surface p-5 transition-colors duration-300 hover:bg-surface-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-[0.95rem] font-semibold text-heading">{item.title}</h4>
                  <StatusChip label={item.status} />
                </div>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-text">{item.summary}</p>
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

          <p className="mt-4 font-mono text-[11px] leading-relaxed text-text-dim">
            Severity scores and patched versions shown above are taken from the published advisories.
            Entries in this last group have no public advisory page, so no evidence link is shown.
            Technical details beyond what vendors have published are intentionally omitted.
          </p>
        </div>
      </div>
    </Section>
  )
}
