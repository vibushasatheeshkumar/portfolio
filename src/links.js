import { profile } from './data'

// import.meta.env.BASE_URL resolves to Vite's `base` ('/portfolio/' in production,
// '/' in dev), so the resume link works on GitHub Pages and locally.
export const resumeUrl = `${import.meta.env.BASE_URL}${profile.resume}`

export const navLinks = [
  { href: '#about', label: 'about' },
  { href: '#skills', label: 'skills' },
  { href: '#projects', label: 'projects' },
  { href: '#research', label: 'research' },
  { href: '#experience', label: 'experience' },
  { href: '#certifications', label: 'certifications' },
  { href: '#contact', label: 'contact' },
]

export const externalNavLinks = [{ href: profile.medium, label: 'blog' }]

export const sectionIds = navLinks.map((link) => link.href.slice(1))
