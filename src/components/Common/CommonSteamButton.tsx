import React, { MouseEventHandler } from 'react'
import { IconSteam } from '../Icons'

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  width?: string
  height?: string
  disable?: boolean
}

export function CommonSteamButton({
  onClick,
  height = 'h-[60px]',
  width = 'w-[330px]',
}: Props) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`font-Roboto rounded-md bg-mesh-color-primary-1200 no-underline 
      transition-all duration-300 ease-in-out ${width} ${height} flex 
      items-center justify-center gap-4 transition-all hover:bg-mesh-gradient-steam-button`}
    >
      <IconSteam />
      <span className="text-[22px] font-bold text-mesh-color-neutral-1000">
        {' '}
        Entre com a sua Steam{' '}
      </span>
    </button>
  )
}
