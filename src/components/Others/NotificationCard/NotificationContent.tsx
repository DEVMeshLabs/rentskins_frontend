import React from 'react'

interface IProps {
  children: React.ReactNode | 'string'
}

export function NotificationContent({ children }: IProps) {
  return (
    <div className="flex w-full items-center justify-between text-mesh-color-neutral-200">
      {children}
    </div>
  )
}
