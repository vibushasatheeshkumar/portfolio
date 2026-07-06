import { motion } from 'framer-motion'
import { FaShieldHalved, FaLock, FaTerminal, FaBug } from 'react-icons/fa6'

export default function HeroGraphic() {
  return (
    <div className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80">
      <motion.div
        className="absolute inset-0 rounded-full border border-primary/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-6 rounded-full border border-secondary/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute inset-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 blur-2xl" />

      <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-border bg-surface shadow-[0_0_60px_-10px_var(--color-primary)]">
        <FaShieldHalved className="text-primary" size={48} />
      </div>

      <span className="float-shape absolute left-0 top-6 flex h-10 w-10 items-center justify-center rounded-xl border border-secondary/40 bg-surface text-secondary">
        <FaLock size={16} />
      </span>
      <span
        className="float-shape absolute right-2 top-16 flex h-9 w-9 items-center justify-center rounded-xl border border-primary/40 bg-surface text-primary"
        style={{ animationDelay: '1s' }}
      >
        <FaTerminal size={14} />
      </span>
      <span
        className="float-shape absolute bottom-4 left-8 flex h-9 w-9 items-center justify-center rounded-xl border border-secondary/40 bg-surface text-secondary"
        style={{ animationDelay: '2s' }}
      >
        <FaBug size={14} />
      </span>
    </div>
  )
}
