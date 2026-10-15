import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function TypingText({ text, speed = 55, startDelay = 0, className }) {
  const reduced = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (reduced) {
      setCount(text.length)
      return
    }

    setCount(0)
    let interval
    let i = 0

    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setCount(i)
        if (i >= text.length) clearInterval(interval)
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(startTimeout)
      clearInterval(interval)
    }
  }, [text, speed, startDelay, reduced])

  return (
    <span className={className}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      <span className="sr-only">{text}</span>
      {count < text.length && (
        <span className="caret ml-0.5" aria-hidden="true">
          _
        </span>
      )}
    </span>
  )
}
