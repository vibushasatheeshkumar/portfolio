import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { FaBars, FaXmark, FaFileArrowDown, FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { profile } from '../data'
import { externalNavLinks, navLinks, resumeUrl, sectionIds } from '../links'
import { EASE } from '../motion'

function useActiveSection() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const elements = sectionIds.map((id) => document.getElementById(id)).filter((el) => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.25, 0.5] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return active
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection()
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on Escape, and lock background scroll while it is open.
  useEffect(() => {
    if (!open) return
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-400 ${
        scrolled
          ? 'border-border bg-bg/80 shadow-[0_10px_30px_-24px_rgba(0,0,0,1)] backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      }`}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-primary via-primary to-secondary"
        style={{ scaleX: reduced ? 0 : progress }}
      />

      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4"
      >
        <a href="#top" className="group font-mono text-sm font-medium text-heading">
          <span className="text-primary transition-opacity duration-300 group-hover:opacity-70">
            &gt;
          </span>{' '}
          {profile.name.toLowerCase()}
          <span className="caret ml-0.5 align-baseline">_</span>
        </a>

        <ul className="hidden items-center gap-1 font-mono text-[12px] tracking-wide text-text-dim lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1)
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative block rounded-md px-3 py-1.5 transition-colors duration-200 hover:text-heading ${
                    isActive ? 'text-primary' : ''
                  }`}
                >
                  {/* Shared-layout pill slides between active items */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-md border border-primary-line bg-primary-soft"
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 380, damping: 32 }
                      }
                    />
                  )}
                  {link.label}
                </a>
              </li>
            )
          })}
          {externalNavLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline ml-2 inline-flex items-center gap-1 py-1 transition-colors duration-200 hover:text-heading"
              >
                {link.label}
                <FaArrowUpRightFromSquare size={8} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={resumeUrl}
            download
            className="btn-sweep hidden items-center gap-2 rounded-lg border border-primary-line bg-primary-soft px-3.5 py-2 font-mono text-[12px] font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-bg hover:shadow-[0_0_24px_-10px_var(--color-primary)] sm:inline-flex"
          >
            <FaFileArrowDown size={12} aria-hidden="true" />
            resume
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            className="panel flex h-10 w-10 items-center justify-center rounded-lg text-heading transition-colors duration-200 hover:border-primary-line hover:text-primary lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'close' : 'open'}
                initial={reduced ? false : { opacity: 0, rotate: -90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={reduced ? { opacity: 1 } : { opacity: 0, rotate: 90, scale: 0.7 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="flex"
              >
                {open ? <FaXmark size={16} /> : <FaBars size={16} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduced ? { opacity: 1 } : { opacity: 0, height: 0 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
            exit={reduced ? { opacity: 1 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="overflow-hidden border-t border-border bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="mx-auto max-w-6xl px-6 py-4 font-mono text-sm">
              {navLinks.map((link, i) => {
                const isActive = active === link.href.slice(1)
                return (
                  <motion.li
                    key={link.href}
                    initial={reduced ? false : { opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduced ? 0 : 0.04 * i, duration: 0.3, ease: EASE }}
                    className="border-b border-border/60 last:border-b-0"
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`group flex items-center gap-3 py-3 transition-colors duration-200 hover:text-primary ${
                        isActive ? 'text-primary' : 'text-text'
                      }`}
                    >
                      <span className="text-[11px] text-text-dim tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={`ml-auto h-px bg-primary/50 transition-all duration-300 ${
                          isActive ? 'w-8' : 'w-0 group-hover:w-6'
                        }`}
                      />
                    </a>
                  </motion.li>
                )
              })}
              {externalNavLinks.map((link) => (
                <li key={link.href} className="border-t border-border/60">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 py-3 text-text transition-colors duration-200 hover:text-primary"
                  >
                    <FaArrowUpRightFromSquare size={9} aria-hidden="true" className="text-text-dim" />
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <a
                  href={resumeUrl}
                  download
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg border border-primary-line bg-primary-soft py-3 font-medium text-primary"
                >
                  <FaFileArrowDown size={13} aria-hidden="true" />
                  download resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
