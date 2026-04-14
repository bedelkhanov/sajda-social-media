import { useEffect, useState } from 'react'

export function useCountdown(targetISO: string) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const target = new Date(targetISO).getTime()
  let diff = Math.max(0, target - now)
  const h = Math.floor(diff / 3_600_000); diff -= h * 3_600_000
  const m = Math.floor(diff / 60_000); diff -= m * 60_000
  const s = Math.floor(diff / 1000)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}
