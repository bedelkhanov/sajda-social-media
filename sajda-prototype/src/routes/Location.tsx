import { ChevronLeft, Search, MapPin, Navigation } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import cities from '../data/cities.json'
import { useAppStore } from '../store/useAppStore'

export default function Location() {
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const { setCity } = useAppStore()
  const saved = cities.slice(0, 4)
  const filtered = q ? cities.filter((c) => c.name.toLowerCase().includes(q.toLowerCase())) : []

  const pick = (name: string) => { setCity(name); nav(-1) }

  return (
    <div className="relative w-full h-full bg-neutral-950 text-white overflow-y-auto">
      <StatusBar />
      <div className="px-5">
        <button onClick={() => nav(-1)} className="w-9 h-9 flex items-center justify-center -ml-2 mt-1"><ChevronLeft size={22} /></button>

        <div className="flex items-center gap-2 px-3 h-11 rounded-xl bg-white/10 mb-4">
          <Search size={16} className="text-white/50" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Найдите город или район"
            className="flex-1 bg-transparent outline-none placeholder:text-white/40 text-[15px]"
          />
        </div>

        <button onClick={() => pick('Алматы')} className="w-full flex items-center gap-3 rounded-xl bg-surface-2 p-3 mb-5 text-left">
          <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center"><Navigation size={16} /></div>
          <div>
            <div className="font-semibold">Моё местоположение</div>
            <div className="text-white/50 text-sm">Нажмите, чтобы определить</div>
          </div>
        </button>

        {q && filtered.length > 0 && (
          <div className="rounded-card bg-surface-2 mb-5 overflow-hidden">
            {filtered.map((c) => (
              <button key={c.name} onClick={() => pick(c.name)} className="w-full flex items-center gap-3 px-4 py-3 border-t border-white/5 first:border-t-0 text-left">
                <MapPin size={16} className="text-white/60" />
                <div>
                  <div>{c.name}</div>
                  <div className="text-white/50 text-xs">{c.country}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="text-white/50 text-[12px] font-semibold tracking-widest uppercase mb-2">Сохраненные города</div>
        <div className="rounded-card bg-surface-2 overflow-hidden">
          {saved.map((c) => (
            <button key={c.name} onClick={() => pick(c.name)} className="w-full flex items-center gap-3 px-4 py-3 border-t border-white/5 first:border-t-0 text-left">
              <MapPin size={16} className="text-white/60" />
              <div>
                <div>{c.name}</div>
                <div className="text-white/50 text-xs">{c.country}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
