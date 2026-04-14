import { Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { PhoneFrame } from './components/PhoneFrame'
import Home from './routes/Home'
import SwipeUp from './routes/SwipeUp'
import Story from './routes/Story'
import WhatsNew from './routes/WhatsNew'
import Quran from './routes/Quran'
import Qibla from './routes/Qibla'
import QiblaMap from './routes/QiblaMap'
import Academy from './routes/Academy'
import Names99 from './routes/Names99'
import Calendar from './routes/Calendar'
import Profile from './routes/Profile'
import Location from './routes/Location'

export default function App() {
  const loc = useLocation()
  return (
    <PhoneFrame>
      <AnimatePresence mode="wait">
        <motion.div
          key={loc.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full h-full"
        >
          <Routes location={loc}>
            <Route path="/" element={<Home />} />
            <Route path="/swipe-up" element={<SwipeUp />} />
            <Route path="/story" element={<Story />} />
            <Route path="/story/:id" element={<Story />} />
            <Route path="/whats-new" element={<WhatsNew />} />
            <Route path="/quran" element={<Quran />} />
            <Route path="/qibla" element={<Qibla />} />
            <Route path="/qibla/map" element={<QiblaMap />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/academy/99-names" element={<Names99 />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/dhikr" element={<PlaceholderPage title="Зикр" />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/location" element={<Location />} />
            <Route path="*" element={<PlaceholderPage title="Not found" />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </PhoneFrame>
  )
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-950 text-white">
      <div className="text-center">
        <div className="text-2xl font-semibold mb-2">{title}</div>
        <div className="text-white/50">В разработке</div>
      </div>
    </div>
  )
}
