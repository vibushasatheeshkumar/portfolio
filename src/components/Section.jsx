import { motion } from 'framer-motion'

export default function Section({ id, title, children }) {
  return (
    <motion.section
      id={id}
      className="mx-auto max-w-5xl px-6 py-20 scroll-mt-20"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {title && (
        <h2 className="glow-text mb-10 text-3xl font-semibold text-heading">
          {title}
        </h2>
      )}
      {children}
    </motion.section>
  )
}
