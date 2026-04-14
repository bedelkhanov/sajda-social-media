import { motion, PanInfo } from 'framer-motion'
import { ChevronLeft, Play, Star, Share2, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import names from '../data/names99.json'
import { useAppStore } from '../store/useAppStore'

export default function Names99() {
  const nav = useNavigate()
  const [idx, setIdx] = useState(3)
  const [tab, setTab] = useState<'all' | 'fav' | 'grid'>('all')
  const [bannerOpen, setBannerOpen] = useState(true)
  const { favorites99, toggleFav99 } = useAppStore()
  const item = names[idx]

  const onDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -60) setIdx((i) => Math.min(names.length - 1, i + 1))
    if (info.offset.x > 60) setIdx((i) => Math.max(0, i - 1))
  }

  return (
    <div className="relative w-full h-full bg-neutral-950 text-white overflow-hidden">
      <StatusBar />
      <div className="flex items-center px-3 h-12">
        <button onClick={() => nav(-1)} className="w-9 h-9 flex items-center justify-center"><ChevronLeft size={22} /></button>
      </div>

      <div className="flex justify-center gap-2 mb-3 px-5 text-sm">
        {[
          { k: 'all', label: '99 ИМЁН' },
          { k: 'fav', label: `ИЗБРАННЫЕ (${favorites99.length})` },
          { k: 'grid', label: '✦' }
        ].map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k as any)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider ${tab === t.k ? 'bg-white text-black' : 'bg-white/10 text-white/70'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {bannerOpen && (
        <div className="mx-4 mb-3 rounded-2xl bg-blue-500/15 border border-blue-400/20 p-3 flex items-center gap-3">
          <div className="flex-1">
            <div className="text-white font-semibold text-sm">Попробуйте виджет 😉</div>
            <div className="text-white/60 text-xs">Добавьте виджет 99 имён на главный экран</div>
            <button className="mt-2 px-3 py-1.5 rounded-full bg-blue-500 text-white text-xs flex items-center gap-1"><Play size={12} />Смотреть видео</button>
          </div>
          <button onClick={() => setBannerOpen(false)} className="w-7 h-7 flex items-center justify-center text-white/60"><X size={16} /></button>
        </div>
      )}

      <motion.div
        key={idx}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={onDragEnd}
        className="mx-4 rounded-card bg-white text-black p-6"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="flex items-center justify-between text-black/50 text-xs">
          <span>{item.n} / 99</span>
          <div className="flex gap-3">
            <button><Play size={16} /></button>
            <button onClick={() => toggleFav99(item.n)}>
              <Star size={16} className={favorites99.includes(item.n) ? 'fill-amber-400 text-amber-400' : ''} />
            </button>
            <button><Share2 size={16} /></button>
          </div>
        </div>
        <div className="text-center my-6">
          <div className="font-ar text-[64px] leading-none" dir="rtl">{item.ar}</div>
          <div className="mt-4 text-[24px] font-semibold">{item.translit}</div>
          <div className="text-black/60">{item.ru}</div>
        </div>
        <p className="text-[15px] leading-snug text-black/80 mb-2">{item.desc}</p>
        <p className="text-[15px] leading-snug text-black/80">{item.desc2}</p>
      </motion.div>

      <div className="flex justify-center gap-2 mt-4 text-white/50 text-xs">
        ← свайп для следующего →
      </div>
    </div>
  )
}
