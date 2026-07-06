import { profile } from '../data'

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pb-16 pt-20 sm:pt-28">
      <p className="mb-4 font-mono text-sm text-secondary">whoami</p>
      <h1 className="glow-text text-4xl font-bold text-heading sm:text-6xl">
        {profile.name}
      </h1>
      <p className="mt-3 font-mono text-lg text-primary sm:text-xl">
        {profile.title}
      </p>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-text sm:text-lg">
        {profile.bio}
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href="#projects"
          className="rounded-md border border-primary bg-primary/10 px-5 py-2 font-mono text-sm text-heading transition-colors hover:bg-primary/20"
        >
          view_projects()
        </a>
        <a
          href="#contact"
          className="rounded-md border border-border px-5 py-2 font-mono text-sm text-text-dim transition-colors hover:border-secondary hover:text-secondary"
        >
          get_in_touch()
        </a>
      </div>
    </section>
  )
}
