const VARIANTS = {
  square: 'rounded-md',
  diamond: 'rounded-md rotate-45',
  circle: 'rounded-full',
}

const defaultShapes = [
  { type: 'square', top: '8%', left: '4%', size: 28, color: 'primary', delay: '0s' },
  { type: 'diamond', top: '18%', right: '8%', size: 20, color: 'secondary', delay: '1.2s' },
  { type: 'circle', bottom: '15%', left: '10%', size: 14, color: 'secondary', delay: '0.6s' },
  { type: 'diamond', bottom: '8%', right: '14%', size: 24, color: 'primary', delay: '1.8s' },
]

export default function FloatingShapes({ shapes = defaultShapes }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {shapes.map((shape, i) => (
        <span
          key={i}
          className={`float-shape absolute border-2 opacity-40 ${VARIANTS[shape.type]} ${
            shape.color === 'primary' ? 'border-primary/50' : 'border-secondary/50'
          }`}
          style={{
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
            width: shape.size,
            height: shape.size,
            animationDelay: shape.delay,
            '--rot': shape.type === 'diamond' ? '45deg' : '0deg',
          }}
        />
      ))}
    </div>
  )
}
