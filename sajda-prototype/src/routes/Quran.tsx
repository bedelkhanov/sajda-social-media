import { Bookmark, Settings2, List, Play, Search, Globe, ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { StatusBar } from '../components/StatusBar'
import { BottomSheet } from '../components/BottomSheet'
import { useAppStore, ReadingMode } from '../store/useAppStore'
import surahs from '../data/surahs.json'

const SAMPLE_AR = `قَالَتْ لَهُمْ رُسُلُهُمْ إِن نَّحْنُ إِلَّا بَشَرٌ مِّثْلُكُمْ وَلَٰكِنَّ اللَّهَ يَمُنُّ عَلَىٰ مَن يَشَاءُ مِنْ عِبَادِهِ ۖ وَمَا كَانَ لَنَا أَن نَّأْتِيَكُم بِسُلْطَانٍ إِلَّا بِإِذْنِ اللَّهِ ۚ وَعَلَى اللَّهِ فَلْيَتَوَكَّلِ الْمُؤْمِنُونَ`

export default function Quran() {
  const nav = useNavigate()
  const [params, setParams] = useSearchParams()
  const mode = (params.get('mode') as ReadingMode) || useAppStore.getState().readingMode || 'mushaf'
  const [page, setPage] = useState(257)
  const [popup, setPopup] = useState(false)
  const [settings, setSettings] = useState(false)
  const [tajweedInfo, setTajweedInfo] = useState(false)

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -60) setPage((p) => p + 1)
    if (info.offset.x > 60) setPage((p) => Math.max(1, p - 1))
  }

  return (
    <div className="relative w-full h-full bg-black text-white overflow-hidden">
      <StatusBar />
      <div className="flex items-center justify-between px-5 h-12 text-white/80">
        <span>Джуз 13</span>
        <span className="text-white font-semibold">Ибрахим</span>
        <button className="w-8 h-8"><Bookmark size={20} /></button>
      </div>

      {mode === 'mushaf' && (
        <MushafMode page={page} onPage={setPage} onTap={() => setPopup(true)} onDragEnd={handleDragEnd} />
      )}
      {mode === 'page' && (
        <PageMode onLegend={() => setTajweedInfo(true)} onTap={() => setPopup(true)} />
      )}
      {mode === 'sura' && (
        <SuraMode />
      )}

      {/* bottom controls */}
      <div className="absolute left-0 right-0 bottom-6 flex items-center justify-between px-6">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="w-9 h-9 rounded-full glass-light flex items-center justify-center">
          <ChevronLeft size={18} />
        </button>
        <div className="px-4 py-1.5 rounded-full glass-light text-white text-sm font-semibold tabular-nums">{page}</div>
        <div className="flex items-center gap-3">
          <button onClick={() => setSettings(true)} className="w-9 h-9 rounded-full glass-light flex items-center justify-center">
            <Settings2 size={18} />
          </button>
          <button onClick={() => setPage((p) => p + 1)} className="w-9 h-9 rounded-full glass-light flex items-center justify-center">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* centered popup */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute left-6 right-6 top-1/2 -translate-y-1/2 rounded-card glass p-5 z-40"
            onClick={() => setPopup(false)}
          >
            <div className="text-center">
              <div className="text-white/60 text-xs">Ибрахим · Ибрахим</div>
              <div className="text-white text-lg font-semibold">52 Аят · Мекканская</div>
              <div className="flex justify-center gap-3 mt-4">
                <button className="px-3 py-1.5 rounded-full glass-light text-sm"><Bookmark size={14} className="inline mr-1" />Заметки</button>
                <button className="px-3 py-1.5 rounded-full glass-light text-sm"><Globe size={14} className="inline mr-1" />Перевод</button>
                <button className="px-3 py-1.5 rounded-full glass-light text-sm">Aa</button>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <button className="w-10 h-10 rounded-full glass-light flex items-center justify-center"><Play size={16} /></button>
                <button className="w-10 h-10 rounded-full glass-light flex items-center justify-center"><Bookmark size={16} /></button>
                <button className="w-10 h-10 rounded-full glass-light flex items-center justify-center"><Search size={16} /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomSheet open={settings} onClose={() => setSettings(false)}>
        <QuranSettings />
      </BottomSheet>

      <BottomSheet open={tajweedInfo} onClose={() => setTajweedInfo(false)}>
        <TajweedLegend />
      </BottomSheet>

      {/* back swipe */}
      <button onClick={() => nav(-1)} className="absolute top-12 left-2 w-10 h-10 flex items-center justify-center text-white/60"><ChevronLeft size={22} /></button>
    </div>
  )
}

function MushafMode({ page, onPage, onTap, onDragEnd }: any) {
  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={onDragEnd}
      onClick={onTap}
      className="px-6 pt-6 pb-24 h-[calc(100%-48px-48px)] overflow-y-auto no-scrollbar"
    >
      <div dir="rtl" className="font-ar text-[26px] leading-[2.4] text-white text-justify">
        {SAMPLE_AR} {SAMPLE_AR}
      </div>
    </motion.div>
  )
}

function PageMode({ onLegend, onTap }: any) {
  return (
    <div className="px-5 pt-3 pb-24 h-[calc(100%-48px-48px)] overflow-y-auto no-scrollbar">
      <div className="flex gap-2 mb-3">
        <span className="px-3 py-1 rounded-full glass-light text-xs">257 стр.</span>
        <span className="px-3 py-1 rounded-full glass-light text-xs">13 джуз</span>
        <button onClick={onLegend} className="ml-auto px-3 py-1 rounded-full glass-light text-xs">Таджвид</button>
      </div>
      <div dir="rtl" onClick={onTap} className="font-ar text-[28px] leading-[2.3] text-justify">
        <span className="tajweed-mad">قَالَتْ لَهُمْ </span>
        <span>رُسُلُهُمْ إِن </span>
        <span className="tajweed-ghunna">نَّحْنُ </span>
        <span>إِلَّا </span>
        <span className="tajweed-qalqala">بَشَرٌ </span>
        <span>مِّثْلُكُمْ وَ</span>
        <span className="tajweed-silent">لَٰكِنَّ </span>
        <span>اللَّهَ يَمُنُّ عَلَىٰ مَن يَشَاءُ مِنْ عِبَادِهِ</span>
      </div>
      <div className="mt-6 text-white/80 text-[15px] leading-snug">
        «Их посланники говорили им: "Мы — такие же люди, как и вы. Однако Аллах одаряет милостью тех из Своих рабов, кого пожелает…"»
      </div>
      <div className="mt-3 text-white/50 text-[13px] italic">
        Qālat lahum rusuluhum in naḥnu illā basharun mithlukum…
      </div>
    </div>
  )
}

function SuraMode() {
  return (
    <div className="px-6 pt-4 pb-24 h-[calc(100%-48px-48px)] overflow-y-auto no-scrollbar space-y-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="border-b border-white/10 pb-3">
          <div className="flex items-center justify-between text-white/40 text-xs mb-2">
            <span>Аят {i + 1}</span>
            <span className="font-ar text-lg">﴿{i + 1}﴾</span>
          </div>
          <div dir="rtl" className="font-ar text-[24px] leading-[2] text-white">{SAMPLE_AR}</div>
          <div className="mt-2 text-white/70 text-[14px]">«Их посланники говорили им…»</div>
        </div>
      ))}
    </div>
  )
}

function QuranSettings() {
  const { readingMode, setReadingMode, prayerToggles, togglePrayer } = useAppStore()
  const modes: { k: ReadingMode; label: string }[] = [
    { k: 'page', label: 'Страница' },
    { k: 'sura', label: 'Сура' },
    { k: 'mushaf', label: 'Мусхаф' }
  ]
  return (
    <div className="px-4 pb-4 text-white">
      <div className="text-center text-white/60 text-sm mb-3">Режим чтения</div>
      <div className="flex gap-2 mb-5">
        {modes.map((m) => (
          <button
            key={m.k}
            onClick={() => setReadingMode(m.k)}
            className={`flex-1 h-11 rounded-xl text-sm font-medium ${readingMode === m.k ? 'bg-white/15 border border-white' : 'bg-white/5'}`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <Row label="Мусхаф" value="1440 АН, Медина" />
      <Row label="Кира'ат" value="Хафса" />
      <Row label="Перевод 🇷🇺" value="Хузур" />
      <Row label="Арабский шрифт" value="Scheherazade" />
      <Row label="Транскрипция" value="Русский" />
      <Row label="Цветовая тема" value="System" />
      <div className="mt-3 space-y-2">
        {Object.entries(prayerToggles).map(([k, v]) => (
          <label key={k} className="flex items-center justify-between py-2">
            <span className="capitalize text-white/90">{k}</span>
            <button
              onClick={() => togglePrayer(k)}
              className={`w-12 h-7 rounded-full p-0.5 transition ${v ? 'bg-accent-green' : 'bg-white/20'}`}
            >
              <div className={`w-6 h-6 rounded-full bg-white transition ${v ? 'translate-x-5' : ''}`} />
            </button>
          </label>
        ))}
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/10">
      <span className="text-white/80">{label}</span>
      <span className="text-white/60 text-sm">{value} ›</span>
    </div>
  )
}

function TajweedLegend() {
  const items = [
    { k: 'Мад', c: 'tajweed-mad', note: 'удлинение' },
    { k: 'Калькаля / Тафхим', c: 'tajweed-qalqala', note: 'раскатистые' },
    { k: 'Гунна / Ихфа', c: 'tajweed-ghunna', note: 'назальные' },
    { k: 'Тихие буквы', c: 'tajweed-silent', note: 'не читаются' }
  ]
  return (
    <div className="px-5 pb-5">
      <h3 className="text-white font-semibold mb-3">Правила таджвида</h3>
      {items.map((it) => (
        <div key={it.k} className="flex items-center justify-between py-2 border-b border-white/10">
          <span className="font-ar text-2xl w-10 text-center">
            <span className={it.c}>ش</span>
          </span>
          <span className="flex-1 ml-3 text-white">{it.k}</span>
          <span className="text-white/50 text-sm">{it.note}</span>
        </div>
      ))}
    </div>
  )
}
