import { motion } from 'framer-motion'
import FloatingShapes from './FloatingShapes'

const shapeSets = [
  [
    { type: 'square', top: '10%', left: '2%', size: 22, color: 'primary', delay: '0s' },
    { type: 'diamond', bottom: '12%', right: '4%', size: 18, color: 'secondary', delay: '1s' },
  ],
  [
    { type: 'diamond', top: '15%', right: '6%', size: 20, color: 'primary', delay: '0.4s' },
    { type: 'circle', bottom: '20%', left: '6%', size: 12, color: 'secondary', delay: '1.4s' },
  ],
]

export default function Section({ id, title, children, shapeVariant = 0 }) {
  return (
    <motion.section
      id={id}
      className="relative mx-auto max-w-5xl px-6 py-20 scroll-mt-20"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <FloatingShapes shapes={shapeSets[shapeVariant % shapeSets.length]} />
      {title && (
        <div className="relative mb-10">
          <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
            {title}
          </h2>
          <span className="mt-3 block h-1 w-14 rounded-full gradient-bg" />
        </div>
      )}
      <div className="relative">{children}</div>
    </motion.section>
  )
}
