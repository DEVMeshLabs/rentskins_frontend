import React, { ButtonHTMLAttributes } from 'react'

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle: 'opaque' | 'full'
  children: React.ReactNode
  className?: string
}

export function FormButton({
  buttonStyle,
  children,
  className,
  ...rest
}: IProps) {
  return (
    <button
      className={`${className} w-full rounded-md border-2 px-2 py-2 opacity-50 
      transition-all hover:opacity-100 disabled:opacity-50
      ${
        buttonStyle === 'opaque' &&
        `border-mesh-color-neutral-400 bg-transparent font-normal text-neutral-400`
      }
      ${
        buttonStyle === 'full' &&
        `border-mesh-color-primary-1400 bg-mesh-color-primary-1400 font-semibold text-mesh-color-others-black
        disabled:border-mesh-color-neutral-400 disabled:bg-mesh-color-neutral-400 disabled:text-white`
      }`}
      {...rest}
    >
      {children}
    </button>
  )
}
