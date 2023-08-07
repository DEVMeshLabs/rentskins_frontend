import React from 'react'

interface IProps {
  children: React.ReactNode
  className?: string
}

export function LayoutHeaderRoot({ children, className }: IProps) {
  return (
    <header className={`${className} w-full bg-mesh-color-others-black`}>
      {children}
    </header>
  )
}
