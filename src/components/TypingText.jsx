import { useEffect, useState } from 'react'

export default function TypingText({ text, speed = 60, startDelay = 0, className }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(0)
    let i = 0
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        i += 1
        setCount(i)
        if (i >= text.length) clearInterval(interval)
      }, speed)
    }, startDelay)

    return () => clearTimeout(startTimeout)
  }, [text, speed, startDelay])

  return (
    <span className={className}>
      {text.slice(0, count)}
      <span className="animate-pulse text-secondary">_</span>
    </span>
  )
}
