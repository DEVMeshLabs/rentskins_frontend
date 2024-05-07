import React from 'react'

type Props = {
  className?: string
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}

export function HeroInformation({ children, icon, className, title }: Props) {
  return (
    <div className="flex w-2/5 items-center justify-center gap-2 laptop:w-1/5">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-mesh-color-neutral-500">
        {icon}
      </div>
      <span className="w-2/3 text-white">
        <strong className="laptop:text-md text-sm">{title}</strong>
        <p className="text-[12px] laptop:text-xs">{children}</p>
      </span>
    </div>
  )
}
