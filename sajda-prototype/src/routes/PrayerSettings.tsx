import { ChevronRight, X, AlarmClock, BadgeCheck, Bell } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { BottomSheet } from '../components/BottomSheet'
import AlarmOnboarding from './AlarmOnboarding'
import prayer from '../data/prayerTimes.json'

export default function PrayerSettings() {
  const nav = useNavigate()
  const { key } = useParams()
  const current = prayer.prayers.find((p) => p.key === key) || prayer.prayers[0]
  const prayers = prayer.prayers.filter((p) => p.key !== 'sunrise')
  const idx = prayers.findIndex((p) => p.key === current.key)
  const hasAlarm = current.key === 'fajr' || current.key === 'tahajjud'

  const [notif, setNotif] = useState(true)
  const [alarmOn, setAlarmOn] = useState(false)
  const [onboarding, setOnboarding] = useState(false)
  const [promoOpen, setPromoOpen] = useState(true)

  const onToggleAlarm = () => {
    if (!alarmOn) setOnboarding(true)
    else setAlarmOn(false)
  }

  return (
    <div className="relative w-full h-full text-white overflow-y-auto" style={{ background: 'linear-gradient(180deg,#2d2145 0%,#1a1625 45%,#0f0f12 100%)' }}>
      <StatusBar />
      <div className="flex items-center justify-between px-5 h-12 mt-1">
        <h1 className="text-[26px] font-bold">{current.name}</h1>
        <button onClick={() => nav(-1)} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
          <X size={18} />
        </button>
      </div>

      {/* page dots */}
      <div className="flex justify-center gap-1.5 mt-3 mb-6">
        {prayers.map((p, i) => (
          <button
            key={p.key}
            onClick={() => nav(`/prayer/${p.key}`, { replace: true })}
            className={`w-1.5 h-1.5 rounded-full ${i === idx ? 'bg-white' : 'bg-white/30'}`}
          />
        ))}
      </div>

      <div className="px-5 pb-24">
        <SectionLabel>Звук уведомления</SectionLabel>
        <div className="rounded-card bg-white/5 overflow-hidden mb-6">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-left">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-black/30" />
            </div>
            <div className="flex-1">
              <div className="font-semibold">Азан</div>
              <div className="text-white/60 text-sm">Системный звук</div>
            </div>
            <ChevronRight size={16} className="text-white/40" />
          </button>
        </div>

        <SectionLabel>Уведомления и будильник</SectionLabel>
        <div className="rounded-card bg-white/5 overflow-hidden mb-3">
          <div className="flex items-center px-4 py-3">
            <span className="flex-1">Уведомления</span>
            <Toggle value={notif} onChange={setNotif} />
          </div>
          <button className="w-full flex items-center px-4 py-3 border-t border-white/5 text-left">
            <div className="flex-1">
              <div>Регулировка времени</div>
              <div className="text-white/50 text-sm">Не задано</div>
            </div>
            <ChevronRight size={16} className="text-white/40" />
          </button>
          <button className="w-full flex items-center px-4 py-3 border-t border-white/5 text-left text-accent-green">
            <Bell size={14} className="mr-2" />
            <span>Пример уведомления</span>
          </button>
        </div>

        {hasAlarm && (
          <div className="rounded-card bg-white/5 overflow-hidden mb-4">
            <div className="flex items-center px-4 py-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <AlarmClock size={18} />
              </div>
              <div className="flex-1 ml-3">
                <div className="font-semibold flex items-center gap-2">
                  Будильник
                  <span className="px-1.5 py-0.5 rounded-full bg-accent-green text-[10px] font-bold">S+</span>
                </div>
                <div className="text-white/60 text-sm">Время {current.name}</div>
              </div>
              <Toggle value={alarmOn} onChange={() => onToggleAlarm()} />
            </div>
          </div>
        )}

        {hasAlarm && promoOpen && (
          <div className="relative rounded-card overflow-hidden mb-6">
            <div className="relative h-[180px]">
              <ArcBg />
              <div className="absolute top-3 right-3">
                <button onClick={() => setPromoOpen(false)} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <X size={14} />
                </button>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-[48px] font-bold text-white/90 drop-shadow-lg tabular-nums">03:52</div>
              </div>
            </div>
            <div className="bg-neutral-900 px-4 py-4">
              <div className="text-[20px] font-bold leading-tight">Просыпайтесь на Фаджр с умным будильником</div>
              <button onClick={() => nav('/paywall')} className="mt-1 text-white/60 text-sm">Попробуйте бесплатно</button>
            </div>
          </div>
        )}

        <SectionLabel>Время намаза</SectionLabel>
        <div className="rounded-card bg-white/5 overflow-hidden">
          <button className="w-full flex items-center px-4 py-3 text-left">
            <div className="flex-1">
              <div className="flex items-center gap-2 font-semibold">
                Источник время намаза
                <BadgeCheck size={14} className="text-accent-green" />
              </div>
              <div className="text-white/60 text-sm">ДУМК</div>
            </div>
            <ChevronRight size={16} className="text-white/40" />
          </button>
        </div>
      </div>

      <BottomSheet open={onboarding} onClose={() => setOnboarding(false)} height="100%" className="!rounded-none">
        <AlarmOnboarding
          prayerName={current.name}
          timeRange={{ prev: 'Иша 19:58', target: `${current.name} ${current.time}`, next: 'Восход 05:08' }}
          onClose={() => setOnboarding(false)}
          onComplete={() => { setAlarmOn(true); setOnboarding(false) }}
          onPaywall={() => nav('/paywall')}
        />
      </BottomSheet>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-white/50 text-[12px] font-semibold tracking-widest uppercase mb-2 mt-2">{children}</div>
}

export function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`w-[52px] h-[30px] rounded-full p-0.5 transition ${value ? 'bg-accent-green' : 'bg-white/15'}`}
    >
      <div className={`w-[26px] h-[26px] rounded-full bg-white shadow transition ${value ? 'translate-x-[22px]' : ''}`} />
    </button>
  )
}

function ArcBg() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 110% at 50% 130%, #ffd58a 0%, #ff9fbd 25%, #b37fdb 55%, #1a1040 90%)' }} />
      <div className="absolute left-4 top-8 text-white text-xs tracking-widest font-bold">FAJR ☾</div>
      <div className="absolute left-4 bottom-4 text-white text-xs tracking-widest font-bold">SUNRISE ○</div>
    </div>
  )
}
