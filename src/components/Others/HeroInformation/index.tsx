import React from 'react'

type Props = {
  className?: string
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}

export function HeroInformation({ children, icon, className, title }: Props) {
  return (
    <div className="flex w-1/5 items-center justify-center gap-2">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-mesh-color-neutral-500">
        {icon}
      </div>
      <span className="w-2/3 text-white">
        <strong className="text-md">{title}</strong>
        <p className="text-xs">{children}</p>
      </span>
    </div>
  )
}
