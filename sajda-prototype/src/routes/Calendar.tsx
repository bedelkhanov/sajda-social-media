import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import cal from '../data/calendar.json'

export default function Calendar() {
  const nav = useNavigate()
  return (
    <div className="relative w-full h-full bg-neutral-950 text-white overflow-y-auto">
      <StatusBar />
      <div className="px-5">
        <button onClick={() => nav(-1)} className="w-9 h-9 flex items-center justify-center -ml-2 mt-1"><ChevronLeft size={22} /></button>
        <div className="flex gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-white text-black text-xs font-semibold tracking-wider">КАЛЕНДАРЬ</span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-semibold tracking-wider">АПРЕЛЬ</span>
        </div>
        <div className="space-y-3 pb-10">
          {cal.map((m: any) => (
            <div key={m.month} className={`rounded-card overflow-hidden ${m.current ? 'bg-white text-black' : 'bg-surface-2 text-white'}`}>
              <div className="px-5 py-4">
                <div className={`text-[13px] font-semibold tracking-wider uppercase ${m.current ? 'text-black/50' : 'text-white/50'}`}>{m.month}</div>
                {m.events.length === 0 && (
                  <div className={`mt-1 text-sm ${m.current ? 'text-black/40' : 'text-white/40'}`}>Нет событий</div>
                )}
                {m.events.map((e: any, i: number) => (
                  <div key={i} className="mt-2">
                    <div className={`font-semibold ${m.current ? 'text-black' : 'text-white'}`}>{e.name}</div>
                    <div className={`text-sm ${m.current ? 'text-black/60' : 'text-white/60'}`}>{e.hijri} · {e.greg}</div>
                  </div>
                ))}
              </div>
              {m.current && (
                <div className="h-1.5 w-full bg-blue-100">
                  <div className="h-full bg-blue-500" style={{ width: `${(m.progress || 0) * 100}%` }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
