export default function Section({ id, label, title, children }) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-6 py-20 scroll-mt-20">
      {label && (
        <p className="mb-2 font-mono text-sm text-secondary">
          <span className="text-text-dim">//</span> {label}
        </p>
      )}
      {title && (
        <h2 className="mb-10 text-3xl font-semibold text-heading">{title}</h2>
      )}
      {children}
    </section>
  )
}
