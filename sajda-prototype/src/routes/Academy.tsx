import { ChevronLeft, Play, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'

export default function Academy() {
  const nav = useNavigate()
  const sections = [
    { title: 'Основы', items: [
      { icon: '💧', t: 'Вуду (омовение)', s: 'Ключ к намазу', badge: 'НОВОЕ' },
      { icon: '🕌', t: 'Обучение намазу', s: 'YouTube видео-уроки', play: true }
    ]},
    { title: 'Знания', items: [
      { icon: '🟢', t: '99 имён Аллаха', s: 'Асма Аль-Хусна', to: '/academy/99-names' },
      { icon: '📖', t: 'Названия сур', s: 'Изучайте смыслы и порядок сур в Коране', badge: 'НОВОЕ' }
    ]},
    { title: 'Пошаговые программы', items: [
      { icon: '🕋', t: 'Курс Умры', s: 'Умра шаг за шагом' },
      { icon: '🌙', t: 'Рамадан 2026', s: 'Изучайте 30 дней шаг за шагом' }
    ]}
  ]
  return (
    <div className="relative w-full h-full bg-neutral-950 text-white overflow-y-auto">
      <StatusBar />
      <div className="px-5">
        <button onClick={() => nav(-1)} className="w-9 h-9 flex items-center justify-center -ml-2 mt-1"><ChevronLeft size={22} /></button>
        <h1 className="text-[34px] font-bold mt-1 mb-4">Академия</h1>
        {sections.map((sec) => (
          <div key={sec.title} className="mb-6">
            <div className="text-white/50 text-[13px] font-semibold tracking-wider uppercase mb-2">{sec.title}</div>
            <div className="rounded-card bg-surface-2 overflow-hidden">
              {sec.items.map((it: any, i) => (
                <button
                  key={it.t}
                  onClick={() => it.to && nav(it.to)}
                  className={`w-full flex items-center gap-3 px-4 py-3 ${i > 0 ? 'border-t border-white/5' : ''}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl">{it.icon}</div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold">{it.t}</div>
                    <div className="text-white/60 text-sm">{it.s}</div>
                  </div>
                  {it.badge && <span className="px-2 py-0.5 rounded-md bg-blue-500 text-[10px] font-bold">{it.badge}</span>}
                  {it.play && <Play size={18} className="text-red-500 fill-red-500" />}
                  <ChevronRight size={16} className="text-white/40" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
