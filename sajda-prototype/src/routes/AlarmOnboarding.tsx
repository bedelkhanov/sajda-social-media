import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, ChevronRight, X } from 'lucide-react'
import { useEffect, useState } from 'react'

type Step = 'intro1' | 'intro2' | 'permission' | 'time' | 'sound' | 'task' | 'done'

interface Props {
  prayerName: string
  timeRange: { prev: string; target: string; next: string }
  onClose: () => void
  onComplete: () => void
  onPaywall: () => void
}

export default function AlarmOnboarding({ prayerName, timeRange, onClose, onComplete, onPaywall }: Props) {
  const [step, setStep] = useState<Step>('intro1')
  const [permAsked, setPermAsked] = useState(false)

  const order: Step[] = ['time', 'sound', 'task']
  const progressIdx = order.indexOf(step)
  const progress = progressIdx >= 0 ? (progressIdx + 1) / order.length : 0
  const isIntro = step === 'intro1' || step === 'intro2'

  return (
    <div className="w-full h-full bg-neutral-950 text-white flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 h-12 shrink-0">
        {!isIntro && step !== 'permission' ? (
          <button onClick={() => {
            const i = order.indexOf(step)
            if (i > 0) setStep(order[i - 1])
            else setStep('intro2')
          }} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
            <ArrowLeft size={16} />
          </button>
        ) : <div className="w-9 h-9" />}
        <h2 className="text-[15px] font-semibold">{isIntro ? 'Будильник' : 'Настроить будильник'}</h2>
        <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
          <X size={16} />
        </button>
      </div>

      {progressIdx >= 0 && (
        <div className="px-4 pb-2">
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-500 to-amber-700 transition-all" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 'intro1' && (
          <motion.div key="intro1" {...fade} className="flex-1 flex flex-col">
            <div className="relative h-[46%] overflow-hidden">
              <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 85% 120% at 50% 130%, #ffe5a8 0%, #ffb29d 18%, #ff8fc2 35%, #b37fdb 60%, #2d1d5f 85%, #0f0a2a 100%)' }} />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 390 360" preserveAspectRatio="none">
                <path d="M 10 340 Q 195 20 380 340" stroke="rgba(255,255,255,0.45)" strokeWidth="2" fill="none" />
              </svg>
              <div className="absolute top-10 left-5 text-white font-bold tracking-widest text-sm">FAJR <span className="opacity-80">☾</span></div>
              <div className="absolute bottom-8 left-5 text-white font-bold tracking-widest text-sm">SUNRISE <span className="opacity-80">○</span></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="mb-1 opacity-90">⏰</div>
                <div className="text-[68px] font-bold tabular-nums drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">03:52</div>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-between px-6 pt-6 pb-6">
              <div className="text-center">
                <h1 className="text-[26px] font-bold leading-tight">
                  Будильник, синхронизированный со временем {prayerName}
                </h1>
                <p className="mt-4 text-white/70 text-[15px] leading-snug">
                  Будильник Sajda автоматически подстраивается под изменение времени намаза, помогая вам просыпаться точно вовремя.
                </p>
                <div className="flex gap-1.5 mt-6 justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                </div>
              </div>
              <button
                onClick={() => setStep('intro2')}
                className="w-full h-14 rounded-full bg-white/10 text-white font-semibold"
              >
                Следующий
              </button>
            </div>
          </motion.div>
        )}

        {step === 'intro2' && (
          <motion.div key="intro2" {...fade} className="flex-1 flex flex-col items-center justify-between pb-8 px-5">
            <div className="flex-1 flex flex-col items-center justify-center">
              <RotateRings />
              <p className="mt-8 text-center text-white/80 px-8 text-[17px] leading-snug">
                Продолжайте вращать телефон, чтобы остановить будильник
              </p>
              <div className="flex gap-1.5 mt-8">
                <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
            </div>
            <button
              onClick={() => setStep('permission')}
              className="w-full h-14 rounded-full bg-accent-green text-white font-semibold"
            >
              Настроить будильник
            </button>
          </motion.div>
        )}

        {step === 'permission' && (
          <motion.div key="perm" {...fade} className="flex-1 relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <RotateRings />
            </div>
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-6">
              <div className="w-full max-w-[320px] bg-neutral-800/95 rounded-2xl p-5 backdrop-blur-xl">
                <h3 className="text-white text-[17px] font-semibold leading-tight">
                  Разрешить приложению «Sajda» ставить будильники и таймеры?
                </h3>
                <p className="mt-3 text-white/70 text-[14px] leading-snug">
                  Приложение сможет ставить будильники и таймеры, которые будут срабатывать с сигналом и отображаться на экране, даже если включен режим фокусирования.
                </p>
                <p className="mt-3 text-white/50 text-[13px] leading-snug">
                  Sajda uses AlarmKit to schedule and play prayer alarms, even when the app is closed.
                </p>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => { setPermAsked(true); setStep('intro2') }}
                    className="flex-1 h-11 rounded-full bg-white/10 text-white font-medium text-sm"
                  >
                    Не разрешать
                  </button>
                  <button
                    onClick={() => { setPermAsked(true); setStep('time') }}
                    className="flex-1 h-11 rounded-full bg-blue-500 text-white font-semibold text-sm"
                  >
                    Разрешить
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'time' && (
          <StepTime key="time" prayerName={prayerName} range={timeRange} onNext={() => setStep('sound')} />
        )}
        {step === 'sound' && (
          <StepSound key="sound" onNext={() => setStep('task')} />
        )}
        {step === 'task' && (
          <StepTask key="task" onSave={() => { onComplete(); onPaywall() }} />
        )}
      </AnimatePresence>
    </div>
  )
}

const fade = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.2 }
}

function RotateRings() {
  const [n, setN] = useState(1)
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v % 3) + 1), 1400)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="relative w-[220px] h-[220px] flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-white/10"
          style={{ width: 160 + i * 40, height: 160 + i * 40 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute left-1/2 -translate-x-1/2 -top-1.5 w-4 h-3 rounded-full bg-accent-green" />
        </motion.div>
      ))}
      <div className="text-accent-green text-[72px] font-bold tabular-nums">{n}x</div>
    </div>
  )
}

function StepTime({ prayerName, range, onNext }: { prayerName: string; range: { prev: string; target: string; next: string }; onNext: () => void }) {
  const [v, setV] = useState(50)
  return (
    <motion.div {...fade} className="flex-1 flex flex-col px-5 pt-2 pb-6">
      <h1 className="text-[24px] font-bold leading-tight mb-1">Установите время будильника для {prayerName}</h1>
      <p className="text-white/60 text-[14px] mb-6">Двигайте ползунок, чтобы выбрать время пробуждения.</p>
      <div className="rounded-card bg-white/5 p-5">
        <div className="text-center mb-5">
          <div className="text-white text-[17px] font-semibold">Время {prayerName}</div>
          <div className="text-white/60 text-sm">Будильник в {range.target.split(' ').pop()}</div>
        </div>
        <input
          type="range" min={0} max={100} value={v}
          onChange={(e) => setV(Number(e.target.value))}
          className="w-full accent-white"
        />
        <div className="flex items-center justify-between mt-3 text-xs">
          <div className="text-white/50"><div>{range.prev.split(' ')[0]}</div><div className="tabular-nums">{range.prev.split(' ')[1]}</div></div>
          <div className="text-white font-semibold"><div>{range.target.split(' ')[0]}</div><div className="tabular-nums">{range.target.split(' ')[1]}</div></div>
          <div className="text-white/50"><div>{range.next.split(' ')[0]}</div><div className="tabular-nums">{range.next.split(' ')[1]}</div></div>
        </div>
      </div>
      <p className="text-white/50 text-[13px] mt-3">
        Ваш будильник ежедневно обновляется в соответствии со временем Фаджр и Восход.
      </p>
      <div className="flex-1" />
      <button onClick={onNext} className="h-13 h-14 rounded-full bg-accent-green text-white font-semibold">
        Следующий
      </button>
    </motion.div>
  )
}

function StepSound({ onNext }: { onNext: () => void }) {
  const [sel, setSel] = useState('default')
  const sys = [
    { k: 'default', label: 'По умолчанию' },
    { k: 'rooster', label: 'Петух 🐓' },
    { k: 'electro', label: 'Электронный 📢' },
    { k: 'mech', label: 'Механический ⏰' }
  ]
  const azan = [
    'Ahmad Alnufais', 'Raad Mohammad Al Kurdi', 'Abdulbasit Abdussamad', 'Ahmad Alnufais', 'Aknazar', 'Фаджр'
  ]
  return (
    <motion.div {...fade} className="flex-1 flex flex-col px-5 pt-2 pb-6 overflow-hidden">
      <h1 className="text-[24px] font-bold leading-tight mb-1">Выберите звук будильника</h1>
      <p className="text-white/60 text-[14px] mb-4">Звук, который будет проигрываться при срабатывании будильника</p>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="text-white/50 text-[12px] font-semibold tracking-widest uppercase mb-2">Системный звук</div>
        <div className="rounded-card bg-white/5 overflow-hidden mb-5">
          {sys.map((s, i) => (
            <button key={s.k} onClick={() => setSel(s.k)} className={`w-full flex items-center justify-between px-4 py-3 text-left ${i > 0 ? 'border-t border-white/5' : ''}`}>
              <span>{s.label}</span>
              {sel === s.k && <Check size={18} className="text-blue-400" />}
            </button>
          ))}
        </div>
        <div className="text-white/50 text-[12px] font-semibold tracking-widest uppercase mb-2">Азан</div>
        <div className="rounded-card bg-white/5 overflow-hidden">
          {azan.map((a, i) => (
            <button key={i} onClick={() => setSel('a' + i)} className={`w-full flex items-center justify-between px-4 py-3 text-left ${i > 0 ? 'border-t border-white/5' : ''}`}>
              <span className="flex items-center gap-1.5">
                {a}
                {i < 2 && <span className="px-1.5 py-0.5 rounded-full bg-accent-green text-[9px] font-bold">S+</span>}
              </span>
              {sel === 'a' + i && <Check size={18} className="text-blue-400" />}
            </button>
          ))}
        </div>
      </div>
      <button onClick={onNext} className="h-14 rounded-full bg-accent-green text-white font-semibold mt-4">
        Следующий
      </button>
    </motion.div>
  )
}

function StepTask({ onSave }: { onSave: () => void }) {
  const [sel, setSel] = useState('none')
  const tasks = [
    { k: 'none', icon: '🚫', t: 'Без задания', s: '' },
    { k: '99', icon: '📊', t: 'Соотнеси 99 имён Аллаха', s: '5 шагов', s_plus: false },
    { k: 'rotate', icon: '🔄', t: 'Поворот телефона', s: '3x', s_plus: false },
    { k: 'math', icon: '√x', t: 'Тест по математике', s: '3 вопроса, Обычный', s_plus: false }
  ]
  return (
    <motion.div {...fade} className="flex-1 flex flex-col px-5 pt-2 pb-6">
      <h1 className="text-[24px] font-bold leading-tight mb-1">Выбрать задание</h1>
      <p className="text-white/60 text-[14px] mb-4">Добавьте задание, чтобы наверняка проснуться. Выполните его, чтобы отключить будильник.</p>
      <div className="rounded-card bg-white/5 overflow-hidden">
        {tasks.map((t, i) => (
          <button key={t.k} onClick={() => setSel(t.k)} className={`w-full flex items-center gap-3 px-4 py-3 text-left ${i > 0 ? 'border-t border-white/5' : ''}`}>
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-base">{t.icon}</div>
            <div className="flex-1">
              <div>{t.t}</div>
              {t.s && <div className="text-white/50 text-xs">{t.s}</div>}
            </div>
            {sel === t.k ? <Check size={18} className="text-blue-400" /> : <ChevronRight size={16} className="text-white/40" />}
          </button>
        ))}
      </div>
      <p className="text-center text-white/40 text-[12px] mt-3">Нажмите, чтобы настроить и посмотреть, как это работает</p>
      <div className="flex-1" />
      <button onClick={onSave} className="h-14 rounded-full bg-gradient-to-r from-emerald-400 to-amber-400 text-white font-semibold flex items-center justify-center gap-2 relative overflow-hidden">
        <Sparkles />
        Сохранить будильник
        <span className="px-1.5 py-0.5 rounded-full bg-white/30 text-[10px] font-bold">S+</span>
      </button>
    </motion.div>
  )
}

function Sparkles() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-70" viewBox="0 0 200 50">
      <g fill="#fff">
        {Array.from({ length: 10 }).map((_, i) => (
          <circle key={i} cx={i * 22 + 5} cy={(i * 7) % 45 + 5} r={1} />
        ))}
      </g>
    </svg>
  )
}
