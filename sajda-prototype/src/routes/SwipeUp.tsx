import { Bookmark, X, BookOpen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '../components/CircularProgress'
import { CountdownPill } from '../components/CountdownPill'
import stories from '../data/stories.json'
import prayer from '../data/prayerTimes.json'

export default function SwipeUp() {
  const nav = useNavigate()
  return (
    <div className="w-full h-full bg-black/50 backdrop-blur-2xl text-white">
      <SwipeUpContent close={() => nav('/')} />
    </div>
  )
}

export function SwipeUpContent({ close }: { close: () => void }) {
  const nav = useNavigate()
  const story = stories[0]
  return (
    <div className="px-5 pt-2 pb-6 h-full overflow-y-auto no-scrollbar text-white">
      <div className="flex justify-center mb-4">
        <CountdownPill label={prayer.next.name} iso={prayer.next.iso} />
      </div>

      <h2 className="text-[22px] font-semibold mb-3">История дня</h2>
      <div className="relative rounded-card overflow-hidden p-5 glass mb-3">
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_20%_20%,#fff3,transparent_40%),radial-gradient(circle_at_80%_80%,#fff3,transparent_40%)]" />
        <div className="relative">
          <div className="text-[11px] tracking-wider text-white/70 font-semibold mb-2">{story.caption}</div>
          <p className="text-white text-[15px] leading-snug line-clamp-4">{story.preview}</p>
        </div>
      </div>
      <button
        onClick={() => nav('/story')}
        className="w-full h-12 rounded-full glass-light text-white font-semibold mb-6"
      >
        Читать историю
      </button>

      <h2 className="text-[22px] font-semibold mb-3">Дела дня</h2>
      <div className="grid grid-cols-2 gap-3">
        <TaskTile
          title="Аль-Фатиха, 1"
          sub="6 дней назад"
          bg="bg-surface"
          icon={<BookOpen size={26} />}
          corner={<Bookmark size={16} className="fill-white/80" />}
          onClick={() => nav('/quran')}
        />
        <TaskTile
          title="Утренние азкары"
          sub="0 / 14"
          bg="bg-gradient-to-br from-pink-300 via-pink-400 to-violet-500"
          icon={<CircularProgress value={0} size={40} color="#fff" />}
        />
        <TaskTile
          title="Салават"
          sub="0 / 33 (2)"
          bg="bg-surface"
          icon={<CircularProgress value={0} size={40} />}
        />
        <TaskTile
          title="Коллекция"
          sub="8 / 454"
          bg="bg-surface"
          icon={<div className="font-ar text-3xl">ﷴ</div>}
        />
      </div>

      <div className="flex justify-end mt-6">
        <button onClick={close} className="w-11 h-11 rounded-full glass-light flex items-center justify-center">
          <X size={20} />
        </button>
      </div>
    </div>
  )
}

function TaskTile({ title, sub, bg, icon, corner, onClick }: any) {
  return (
    <button onClick={onClick} className={`relative rounded-card p-4 h-[150px] flex flex-col justify-between text-left ${bg}`}>
      <div className="flex items-start justify-between text-white">
        <div>{icon}</div>
        {corner && <div>{corner}</div>}
      </div>
      <div>
        <div className="text-white font-semibold text-[15px]">{title}</div>
        <div className="text-white/60 text-[13px]">{sub}</div>
      </div>
    </button>
  )
}
