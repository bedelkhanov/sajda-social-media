import { ReactNode } from 'react'

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-950">
      <div className="phone-shell bg-black">
        {children}
      </div>
    </div>
  )
}
