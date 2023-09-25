import React from 'react'

interface IProps {
  children: React.ReactNode | 'string'
}

export function NotificationContent({ children }: IProps) {
  return <span className="text-mesh-color-neutral-200">{children}</span>
}
