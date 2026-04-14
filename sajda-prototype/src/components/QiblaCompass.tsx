import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function QiblaCompass({ bearing = 246 }: { bearing?: number }) {
  const [wobble, setWobble] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setWobble((w) => (w + (Math.random() - 0.5) * 2)), 1200)
    return () => clearInterval(id)
  }, [])
  const angle = bearing + wobble
  return (
    <div className="relative w-[280px] h-[280px]">
      <div className="absolute inset-0 rounded-full border-2 border-white/70" />
      <div className="absolute inset-8 rounded-full border border-white/20" />
      {/* compass rose */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute top-4 text-white/80 text-sm font-medium">N</div>
        <div className="absolute bottom-4 text-white/80 text-sm font-medium">S</div>
        <div className="absolute left-4 text-white/80 text-sm font-medium">W</div>
        <div className="absolute right-4 text-white/80 text-sm font-medium">E</div>
        <div className="w-px h-10 bg-white/40 absolute top-10" />
        <div className="w-px h-10 bg-white/40 absolute bottom-10" />
        <div className="h-px w-10 bg-white/40 absolute left-10" />
        <div className="h-px w-10 bg-white/40 absolute right-10" />
      </div>
      {/* Kaaba marker */}
      <motion.div
        animate={{ rotate: angle }}
        transition={{ type: 'spring', stiffness: 60, damping: 14 }}
        className="absolute inset-0"
        style={{ transformOrigin: '50% 50%' }}
      >
        <div className="absolute left-1/2 -translate-x-1/2 -top-3 w-8 h-8 rotate-[15deg] rounded-md shadow-lg" style={{ background: '#c9a86a' }} />
      </motion.div>
    </div>
  )
}
