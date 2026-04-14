import { X } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import stories from '../data/stories.json'
import { StatusBar } from '../components/StatusBar'

export default function Story() {
  const nav = useNavigate()
  const { id } = useParams()
  const story = stories.find((s) => s.id === id) || stories[0]
  return (
    <div className="relative w-full h-full bg-neutral-900 text-white overflow-y-auto">
      <StatusBar />
      <div className="flex items-center justify-between px-5 h-12">
        <span className="text-white/80">История</span>
        <button onClick={() => nav(-1)} className="w-9 h-9 rounded-full glass-light flex items-center justify-center">
          <X size={18} />
        </button>
      </div>
      <div className="px-6 pb-24">
        <div className="text-[11px] tracking-widest font-semibold text-white/60 mt-4 mb-3">{story.caption}</div>
        <h1 className="text-[34px] font-bold leading-tight mb-6">{story.title}</h1>
        {story.body.map((p, i) => (
          <p key={i} className="text-[17px] leading-relaxed text-white/90 mb-4">{p}</p>
        ))}
      </div>
    </div>
  )
}
