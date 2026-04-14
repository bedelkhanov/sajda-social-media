import { X, Book, Puzzle, Bell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'

export default function WhatsNew() {
  const nav = useNavigate()
  const items = [
    { icon: <Book />, title: 'Постраничное чтение сур', text: 'Режим сур теперь поддерживает навигацию свайпом — читайте суру как книгу, страница за страницей.', color: 'bg-blue-500/80' },
    { icon: <Puzzle />, title: 'Запоминайте названия сур', text: 'Изучайте названия сур и их порядок в Коране.', color: 'bg-amber-500/80' },
    { icon: <Bell />, title: 'Напоминания об азкарах', text: 'Настройте ежедневные напоминания об азкарах и салаватах.', color: 'bg-emerald-500/80' }
  ]
  return (
    <div className="relative w-full h-full bg-neutral-900 text-white overflow-y-auto">
      <StatusBar />
      <div className="flex items-center justify-between px-5 h-12">
        <h1 className="text-white text-[20px] font-semibold">Новое в 6.6.0</h1>
        <button onClick={() => nav(-1)} className="w-9 h-9 rounded-full glass-light flex items-center justify-center">
          <X size={18} />
        </button>
      </div>
      <div className="px-5 pb-10 space-y-4">
        {items.map((it) => (
          <div key={it.title} className="rounded-card bg-surface-2 overflow-hidden p-5">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${it.color} mb-4`}>{it.icon}</div>
            <h3 className="text-[20px] font-semibold mb-2">{it.title}</h3>
            <p className="text-white/70 text-[15px] leading-snug mb-4">{it.text}</p>
            <div className="h-32 rounded-xl bg-gradient-to-br from-white/5 to-white/0 flex items-center justify-center text-white/30 text-sm">
              [мокап]
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
