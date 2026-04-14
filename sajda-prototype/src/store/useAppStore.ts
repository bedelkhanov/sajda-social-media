import { create } from 'zustand'

export type ReadingMode = 'page' | 'sura' | 'mushaf'

interface AppState {
  locale: 'ru' | 'en'
  city: string
  readingMode: ReadingMode
  favorites99: number[]
  lastReadSurah: number
  prayerToggles: Record<string, boolean>
  setReadingMode: (m: ReadingMode) => void
  toggleFav99: (i: number) => void
  setCity: (c: string) => void
  togglePrayer: (key: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  locale: 'ru',
  city: 'Алматы',
  readingMode: 'mushaf',
  favorites99: [],
  lastReadSurah: 14,
  prayerToggles: { arabic: true, translation: true, transcription: true, tajweed: true },
  setReadingMode: (m) => set({ readingMode: m }),
  toggleFav99: (i) => set((s) => ({
    favorites99: s.favorites99.includes(i)
      ? s.favorites99.filter((x) => x !== i)
      : [...s.favorites99, i]
  })),
  setCity: (c) => set({ city: c }),
  togglePrayer: (key) => set((s) => ({ prayerToggles: { ...s.prayerToggles, [key]: !s.prayerToggles[key] } }))
}))
