import { Volume2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import data from '../data/prayerTimes.json'
import { useCountdown } from '../hooks/useCountdown'

export function PrayerCard() {
  const countdown = useCountdown(data.next.iso)
  const nav = useNavigate()
  return (
    <div className="w-[72%] mx-auto rounded-card overflow-hidden glass">
      <div className="px-6 py-4 space-y-3">
        {data.prayers.map((p: any) => {
          const isActive = p.active
          return (
            <button
              key={p.key}
              onClick={() => nav(`/prayer/${p.key}`)}
              className="w-full flex items-center justify-between text-white text-[18px] text-left"
            >
              <span className={`font-medium ${isActive ? 'opacity-100' : 'opacity-90'}`}>{p.name}</span>
              <div className="flex items-center gap-2">
                {p.sound && <Volume2 size={14} className="opacity-60" />}
                <span className={`tabular-nums ${isActive ? 'px-3 py-0.5 rounded-lg bg-white/15' : ''}`}>{p.time}</span>
              </div>
            </button>
          )
        })}
      </div>
      <div className="bg-accent-green py-3 px-6 flex items-center justify-between text-white font-medium">
        <span>{data.next.name}</span>
        <span className="tabular-nums">{countdown}</span>
      </div>
    </div>
  )
}
