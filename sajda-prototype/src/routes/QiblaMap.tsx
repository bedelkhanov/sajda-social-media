import { X, Crosshair, Box } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'

export default function QiblaMap() {
  const nav = useNavigate()
  const [mode, setMode] = useState<'map' | 'sat'>('map')
  return (
    <div className="relative w-full h-full bg-neutral-800 text-white overflow-hidden">
      <StatusBar />
      <div className="absolute inset-0 pt-12">
        <iframe
          title="map"
          className="w-full h-full border-0"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=40%2C10%2C90%2C60&layer=${mode === 'sat' ? 'cyclosm' : 'mapnik'}&marker=21.4225,39.8262`}
        />
        {/* direction line overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 390 780" preserveAspectRatio="none">
          <line x1="195" y1="420" x2="300" y2="120" stroke="#111" strokeWidth="3" strokeDasharray="6 6" />
          <circle cx="195" cy="420" r="8" fill="#1976d2" />
          <rect x="290" y="110" width="20" height="20" fill="#c9a86a" transform="rotate(15 300 120)" />
        </svg>
      </div>

      <div className="absolute right-4 top-20 flex flex-col gap-2">
        <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow"><Box size={18} /></button>
        <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow"><Crosshair size={18} /></button>
        <button onClick={() => nav(-1)} className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow"><X size={18} /></button>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 flex rounded-full bg-white p-1 text-black text-sm">
        <button onClick={() => setMode('map')} className={`px-5 py-1.5 rounded-full ${mode === 'map' ? 'bg-neutral-200' : ''}`}>Карта</button>
        <button onClick={() => setMode('sat')} className={`px-5 py-1.5 rounded-full ${mode === 'sat' ? 'bg-neutral-200' : ''}`}>Спутник</button>
      </div>
    </div>
  )
}
