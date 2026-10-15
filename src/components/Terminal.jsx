import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { terminalLines } from '../data'
import { EASE } from '../motion'

const TYPE_SPEED = 38
const OUTPUT_PAUSE = 240
const LINE_PAUSE = 520
const START_DELAY = 700

/**
 * Decorative terminal. Every character is pre-written in `terminalLines` and
 * replayed on a timer — nothing is executed, and no tool is invoked. The
 * animation runs once and then stops, so it costs nothing while idle.
 */
export default function Terminal() {
  const reduced = useReducedMotion()
  const [started, setStarted] = useState(false)
  const [state, setState] = useState({ line: 0, chars: 0, output: false })

  useEffect(() => {
    if (reduced) return
    const timeout = setTimeout(() => setStarted(true), START_DELAY)
    return () => clearTimeout(timeout)
  }, [reduced])

  useEffect(() => {
    if (reduced || !started) return

    const current = terminalLines[state.line]
    if (!current) return // script finished — no further timers

    let delay
    let next

    if (state.chars < current.command.length) {
      delay = TYPE_SPEED
      next = { ...state, chars: state.chars + 1 }
    } else if (!state.output) {
      delay = OUTPUT_PAUSE
      next = { ...state, output: true }
    } else {
      delay = LINE_PAUSE
      next = { line: state.line + 1, chars: 0, output: false }
    }

    const timeout = setTimeout(() => setState(next), delay)
    return () => clearTimeout(timeout)
  }, [state, started, reduced])

  const done = reduced || state.line >= terminalLines.length

  return (
    <motion.figure
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
      className="panel card-ring relative m-0 overflow-hidden rounded-xl"
    >
      {/* Title bar */}
      <div className="flex items-center gap-3 border-b border-border bg-surface-2 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
        </span>
        <span className="font-mono text-[11px] tracking-wide text-text-dim">
          vibusha@portfolio:~
        </span>
        <span className="ml-auto rounded border border-border-strong px-1.5 py-0.5 font-mono text-[10px] tracking-[0.12em] text-text uppercase">
          simulated
        </span>
      </div>

      {/* Scanline accent */}
      {!reduced && (
        <span
          aria-hidden="true"
          className="scanline pointer-events-none absolute inset-x-0 top-10 h-16 bg-gradient-to-b from-transparent via-primary/[0.055] to-transparent"
        />
      )}

      <pre
        aria-hidden="true"
        className="m-0 overflow-x-auto px-4 py-4 font-mono text-[12px] leading-6 whitespace-pre-wrap sm:text-[13px]"
      >
        {terminalLines.map((line, i) => {
          if (reduced || i < state.line) {
            return (
              <span key={line.command} className="block">
                <span className="text-primary">$ </span>
                <span className="text-heading">{line.command}</span>
                {'\n'}
                <span className="text-text">{line.output}</span>
                {'\n'}
              </span>
            )
          }

          if (i > state.line) return null

          return (
            <span key={line.command} className="block">
              <span className="text-primary">$ </span>
              <span className="text-heading">{line.command.slice(0, state.chars)}</span>
              {!state.output && <span className="caret">_</span>}
              {state.output && (
                <>
                  {'\n'}
                  <span className="text-text">{line.output}</span>
                </>
              )}
              {'\n'}
            </span>
          )
        })}
        {done && (
          <span className="block">
            <span className="text-primary">$ </span>
            <span className="caret">_</span>
          </span>
        )}
      </pre>

      {/* Equivalent content for assistive tech, without the partial typing. */}
      <div className="sr-only">
        Simulated terminal output.
        {terminalLines.map((line) => (
          <p key={line.command}>
            {line.command}: {line.output}
          </p>
        ))}
      </div>

      <figcaption className="border-t border-border px-4 py-2 font-mono text-[11px] text-text-dim">
        Decorative output — this terminal is a simulation and does not run any commands.
      </figcaption>
    </motion.figure>
  )
}
