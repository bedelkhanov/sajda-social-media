import { Crosshair, X, ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { GradientBg } from '../components/GradientBg'
import { QiblaCompass } from '../components/QiblaCompass'

export default function Qibla() {
  const nav = useNavigate()
  return (
    <div className="relative w-full h-full text-white overflow-hidden">
      <GradientBg>
        <StatusBar />
        <button onClick={() => nav(-1)} className="absolute top-12 left-3 w-10 h-10 flex items-center justify-center text-white/80">
          <ChevronLeft size={22} />
        </button>

        <div className="flex items-center justify-center mt-[16%]">
          <QiblaCompass bearing={246} />
        </div>

        <div className="text-center mt-6">
          <div className="text-white text-[15px] tabular-nums">246.0° N <span className="mx-2 opacity-50">·</span> 4 189 км</div>
        </div>

        <h1 className="text-center text-[44px] font-bold tracking-wide mt-2">Qibla</h1>

        <div className="absolute left-0 right-0 bottom-8 px-6 flex items-center justify-between">
          <button className="w-12 h-12 rounded-full glass-light flex items-center justify-center"><Crosshair size={20} /></button>
          <button onClick={() => nav('/qibla/map')} className="px-6 h-12 rounded-full glass-light text-white font-semibold tracking-wide text-sm">
            MAKKAH LIVE
          </button>
          <button onClick={() => nav('/')} className="w-12 h-12 rounded-full glass-light flex items-center justify-center"><X size={20} /></button>
        </div>
      </GradientBg>
    </div>
  )
}
