import { Compass, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function BottomNav({ onMore }: { onMore: () => void }) {
  const nav = useNavigate()
  return (
    <div className="absolute left-0 right-0 bottom-8 px-6 flex items-center justify-between z-30">
      <button
        onClick={() => nav('/qibla')}
        className="w-14 h-14 rounded-full flex items-center justify-center glass-light text-white"
        aria-label="Кибла"
      >
        <Compass size={24} />
      </button>
      <button
        onClick={onMore}
        className="w-14 h-14 rounded-full flex items-center justify-center glass-light text-white"
        aria-label="Ещё"
      >
        <MoreHorizontal size={24} />
      </button>
      <button
        onClick={() => nav('/quran')}
        className="h-14 px-7 rounded-full flex items-center justify-center glass-light text-white font-semibold tracking-wider text-sm"
      >
        КОРАН
      </button>
    </div>
  )
}
