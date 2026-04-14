import { Navigation } from 'lucide-react'
import { useEffect, useState } from 'react'

export function StatusBar({ light = true }: { light?: boolean }) {
  const [time, setTime] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])
  const hh = String(time.getHours()).padStart(2, '0')
  const mm = String(time.getMinutes()).padStart(2, '0')
  const color = light ? 'text-white' : 'text-black'
  return (
    <div className={`h-12 pt-3 px-6 flex items-center justify-between text-[15px] font-semibold ${color} select-none relative z-50`}>
      <div className="flex items-center gap-1.5">
        <span>{hh}:{mm}</span>
        <Navigation size={12} className="fill-current -rotate-12" />
      </div>
      <div className="flex items-center gap-1.5 text-xs">
        <span className="tracking-tighter">∷∷</span>
        <span>📶</span>
        <div className="flex items-center gap-0.5">
          <div className="w-6 h-3 rounded-[3px] border border-current relative">
            <div className="absolute left-0.5 top-0.5 bottom-0.5 w-2 bg-current rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  )
}
