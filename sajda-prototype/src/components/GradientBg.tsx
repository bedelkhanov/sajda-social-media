import { ReactNode } from 'react'

export function GradientBg({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`absolute inset-0 gradient-bg ${className}`}>
      {children}
    </div>
  )
}
