import { Camera, ChevronLeft, ChevronRight, MapPin, Globe, Bell, Image, User, X, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { useAppStore } from '../store/useAppStore'

export default function Profile() {
  const nav = useNavigate()
  const { city } = useAppStore()
  return (
    <div className="relative w-full h-full bg-neutral-950 text-white overflow-y-auto">
      <StatusBar />
      <div className="px-5 pb-24">
        <button onClick={() => nav(-1)} className="w-9 h-9 flex items-center justify-center -ml-2 mt-1"><ChevronLeft size={22} /></button>

        <div className="flex flex-col items-center mt-2 mb-6">
          <div className="relative w-[140px] h-[140px] rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center">
            <User size={72} className="text-white/30" />
            <button className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow">
              <Camera size={16} />
            </button>
          </div>
          <div className="mt-3 text-[20px] font-semibold">Aslanbek</div>
          <div className="text-white/50 text-sm">bedelkhanovaslanbek@gmail.com</div>
        </div>

        <div className="rounded-card bg-surface-2 overflow-hidden mb-3">
          <div className="flex items-center gap-3 px-4 py-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/80 flex items-center justify-center font-bold">S+</div>
            <div className="flex-1">
              <div className="font-semibold">Sajda+</div>
              <div className="text-white/60 text-sm">Активно до 06 мая, 2026</div>
            </div>
            <ChevronRight size={16} className="text-white/40" />
          </div>
          <div className="flex items-center gap-3 px-4 py-4 border-t border-white/5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/80 flex items-center justify-center">📶</div>
            <div className="flex-1">
              <div className="font-semibold flex items-center gap-2">Купить eSIM <span className="px-1.5 py-0.5 rounded bg-blue-500 text-[10px] font-bold">НОВОЕ</span></div>
              <div className="text-white/60 text-sm">Интернет для умры и хаджа</div>
            </div>
            <ChevronRight size={16} className="text-white/40" />
          </div>
        </div>

        <div className="rounded-card bg-surface-2 overflow-hidden">
          <Row icon={<User size={18} />} label="Редактировать профиль" />
          <Row icon={<MapPin size={18} />} label="Текущее местоположение (Авто)" right={city} onClick={() => nav('/profile/location')} />
          <Row icon={<Globe size={18} />} label="Язык" right="Русский" />
          <Row icon={<Clock size={18} />} label="Время намаза" />
          <Row icon={<Bell size={18} />} label="Уведомления & Звуки" />
          <Row icon={<Image size={18} />} label="Оформление" right="Значки приложения, Обои" />
        </div>
      </div>
      <button onClick={() => nav('/')} className="absolute bottom-6 right-6 w-12 h-12 rounded-full glass-light flex items-center justify-center">
        <X size={20} />
      </button>
    </div>
  )
}

function Row({ icon, label, right, onClick }: { icon: React.ReactNode; label: string; right?: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-4 py-4 border-t border-white/5 first:border-t-0 text-left">
      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">{icon}</div>
      <div className="flex-1">{label}</div>
      {right && <span className="text-white/50 text-sm mr-1">{right}</span>}
      <ChevronRight size={16} className="text-white/40" />
    </button>
  )
}
