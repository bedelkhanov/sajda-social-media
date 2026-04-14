import { AlarmClock, ChevronRight, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'

export default function Paywall() {
  const nav = useNavigate()
  const [plan, setPlan] = useState<'year' | 'month'>('year')
  return (
    <div className="relative w-full h-full bg-neutral-950 text-white overflow-hidden">
      <StatusBar />

      <div className="relative h-[50%] overflow-hidden rounded-b-[28px]">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 120% at 50% 130%, #ffe5a8 0%, #ffb29d 18%, #ff8fc2 35%, #b37fdb 60%, #2d1d5f 85%, #0f0a2a 100%)' }} />
        {/* arc */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 390 420" preserveAspectRatio="none">
          <path d="M 20 400 Q 195 40 370 400" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" />
        </svg>
        <div className="absolute top-16 left-6 text-white font-bold tracking-widest text-sm">FAJR ☾</div>
        <div className="absolute bottom-10 left-6 text-white font-bold tracking-widest text-sm">SUNRISE ○</div>
        <div className="absolute inset-0 flex flex-col items-center justify-center mt-8">
          <AlarmClock size={28} className="mb-1" />
          <div className="text-[72px] font-bold tabular-nums drop-shadow-lg">03:52</div>
        </div>
        <button onClick={() => nav(-1)} className="absolute top-14 right-5 w-9 h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
          <X size={18} />
        </button>
      </div>

      <div className="px-5 mt-5">
        <h1 className="text-[34px] font-bold leading-tight">Будильник Sajda</h1>
        <p className="mt-2 text-white/70 text-[15px] leading-snug">
          Просыпайтесь на фаджр, тахаджжуд и сухур с умными будильниками. Получите Sajda+.
        </p>
        <button className="mt-3 flex items-center gap-1 text-white text-[15px] font-medium">
          Все функции Sajda+ <ChevronRight size={16} />
        </button>

        <div className="grid grid-cols-2 gap-3 mt-5">
          <button
            onClick={() => setPlan('year')}
            className={`rounded-2xl p-4 text-left ${plan === 'year' ? 'bg-white/10 border-2 border-white' : 'bg-white/5 border-2 border-transparent'}`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">Ежегодно</span>
              <span className="px-1.5 py-0.5 rounded bg-blue-500 text-[10px] font-bold">-27 %</span>
            </div>
            <div className="text-white/70 text-sm">12 990.00 ₸/год</div>
          </button>
          <button
            onClick={() => setPlan('month')}
            className={`rounded-2xl p-4 text-left ${plan === 'month' ? 'bg-white/10 border-2 border-white' : 'bg-white/5 border-2 border-transparent'}`}
          >
            <div className="font-semibold mb-1">Ежемесячно</div>
            <div className="text-white/70 text-sm">1 490.00 ₸/месяц</div>
          </button>
        </div>

        <p className="text-center text-white/50 text-[13px] mt-4">
          7 дней бесплатно, затем {plan === 'year' ? '12 990.00 ₸/год' : '1 490.00 ₸/месяц'}
        </p>

        <button
          onClick={() => nav(-1)}
          className="w-full h-14 rounded-full mt-2 bg-gradient-to-r from-emerald-400 to-amber-400 text-white font-semibold flex items-center justify-center gap-2 relative overflow-hidden"
        >
          Бесплатно (7 дней)
          <span className="px-1.5 py-0.5 rounded-full bg-white/30 text-[10px] font-bold">S+</span>
        </button>

        <div className="flex justify-center gap-8 mt-3 text-white/50 text-sm">
          <button>Условия</button>
          <button>Восстановить</button>
        </div>
      </div>
    </div>
  )
}
