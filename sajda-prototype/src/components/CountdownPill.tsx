import { Moon } from 'lucide-react'
import { useCountdown } from '../hooks/useCountdown'

export function CountdownPill({ label, iso, active = false }: { label: string; iso: string; active?: boolean }) {
  const t = useCountdown(iso)
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${active ? 'bg-accent-green text-white' : 'glass-light text-white'}`}>
      <span>{label}</span>
      <Moon size={14} className="opacity-80" />
      <span className="tabular-nums">{t}</span>
    </div>
  )
}
