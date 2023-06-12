import React, { MouseEventHandler } from 'react'
import classNames from 'classnames'

type Props = {
  type?: 'button' | 'submit'
  className?: string
  children: React.ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  color?: 'invisible' | 'gray' | 'green'
  textColor?: string
  hoverTextColor?: string
  width?: string
  height?: string
  disable?: boolean
}

export function Button({
  type = 'button',
  className,
  children,
  onClick,
  color,
  width = 'w-[32px]',
  height = 'w-[32px]',
  disable,
}: Props) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disable}
      className={classNames(
        `flex items-center justify-center w-[${width} h-[${height}]
        rounded-md border border-transparent p-1 opacity-60 
        transition enabled:hover:opacity-100`,
        {
          ' border-mesh-color-neutral-400 bg-transparent fill-white text-lg':
            color === 'invisible',
        },
        {
          'h-10 w-48 px-4 py-3 text-lg  text-mesh-color-neutral-0':
            color === 'gray',
        },
        {
          'h-10 w-48 border-mesh-color-primary-1200 bg-mesh-color-primary-1200 px-4 py-3 text-lg text-mesh-color-others-black disabled:border-mesh-color-neutral-500 disabled:bg-mesh-color-neutral-500 disabled:text-[#979797]':
            color === 'green',
        },
        className,
      )}
    >
      {children}
    </button>
  )
}
