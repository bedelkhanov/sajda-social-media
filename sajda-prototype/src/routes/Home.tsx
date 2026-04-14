import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { Navigation, User, Moon } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { GradientBg } from '../components/GradientBg'
import { PrayerCard } from '../components/PrayerCard'
import { BottomNav } from '../components/BottomNav'
import { BottomSheet } from '../components/BottomSheet'
import { SwipeUpContent } from './SwipeUp'

export default function Home() {
  const nav = useNavigate()
  const [moreOpen, setMoreOpen] = useState(false)
  const [swipeOpen, setSwipeOpen] = useState(false)
  const y = useMotionValue(0)

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.y < -80) setSwipeOpen(true)
  }

  return (
    <div className="relative w-full h-full overflow-hidden text-white">
      <GradientBg>
        <motion.div
          className="relative w-full h-full"
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0.4, bottom: 0 }}
          onDragEnd={handleDragEnd}
          style={{ y }}
        >
          <StatusBar />

          {/* Top row */}
          <div className="px-6 flex items-start justify-between mt-2">
            <button
              onClick={() => nav('/profile')}
              className="w-11 h-11 rounded-full glass-light flex items-center justify-center"
            >
              <User size={20} />
            </button>
            <button
              onClick={() => nav('/profile/location')}
              className="text-right"
            >
              <div className="flex items-center justify-end gap-1 text-white text-[15px] font-medium">
                <Navigation size={12} className="fill-current -rotate-12" />
                <span>Алматы</span>
              </div>
              <div className="text-white/60 text-[13px] mt-0.5">15 Апрель, 2026</div>
            </button>
          </div>

          {/* Prayer card */}
          <div className="mt-[22%]">
            <PrayerCard />
          </div>

          {/* What's new */}
          <button
            onClick={() => nav('/whats-new')}
            className="absolute left-1/2 -translate-x-1/2 bottom-[190px] flex items-center gap-2 text-white/90 text-[15px]"
          >
            Что нового <Moon size={14} />
          </button>

          {/* Swipe up hint */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-28 w-24 h-1 rounded-full bg-white/40" />

          <BottomNav onMore={() => setMoreOpen(true)} />
        </motion.div>
      </GradientBg>

      <BottomSheet open={moreOpen} onClose={() => setMoreOpen(false)}>
        <MoreMenu close={() => setMoreOpen(false)} />
      </BottomSheet>

      <BottomSheet open={swipeOpen} onClose={() => setSwipeOpen(false)} height="92%">
        <SwipeUpContent close={() => setSwipeOpen(false)} />
      </BottomSheet>
    </div>
  )
}

function MoreMenu({ close }: { close: () => void }) {
  const nav = useNavigate()
  const items = [
    { icon: '📕', title: 'Академия', sub: 'Намаз, Рамадан 2026', badge: 'НОВОЕ', to: '/academy', color: '#b64242' },
    { icon: '🟢', title: '99 имён Аллаха', sub: 'Асма Аль-Хусна', to: '/academy/99-names', color: '#2ecc71' },
    { icon: '🌅', title: 'Зикр', sub: 'Читайте утренние азкары', badge: 'НОВОЕ', to: '/dhikr', color: '#8b5cf6' },
    { icon: '📅', title: 'Календарь', sub: 'Новый хиджра-календарь', to: '/calendar', color: '#3b82f6' }
  ]
  return (
    <div className="px-4 pb-4">
      {items.map((it) => (
        <button
          key={it.title}
          onClick={() => { close(); nav(it.to) }}
          className="w-full flex items-center gap-3 py-3 border-b border-white/10 last:border-0"
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ background: it.color + '33' }}>
            {it.icon}
          </div>
          <div className="flex-1 text-left">
            <div className="text-white font-semibold">{it.title}</div>
            <div className="text-white/60 text-sm">{it.sub}</div>
          </div>
          {it.badge && (
            <span className="px-2 py-0.5 rounded-md bg-blue-500 text-white text-[10px] font-bold">{it.badge}</span>
          )}
        </button>
      ))}
    </div>
  )
}
