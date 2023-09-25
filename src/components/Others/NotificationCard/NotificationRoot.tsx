import React from 'react'

interface IProps {
  children: React.ReactNode
  newCard: boolean
}

export function NotificationRoot({ children, newCard }: IProps) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg bg-mesh-color-neutral-800 px-3 py-3 ease-in-out ${
        !newCard && 'opacity-30'
      }`}
    >
      {children}
    </div>
  )
}
