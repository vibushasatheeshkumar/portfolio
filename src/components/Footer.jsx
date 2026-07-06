import { profile } from '../data'

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <p className="mx-auto max-w-5xl px-6 text-center font-mono text-xs text-text-dim">
        © {new Date().getFullYear()} {profile.name} — built with React &amp; Tailwind, hosted on GitHub Pages
      </p>
    </footer>
  )
}
