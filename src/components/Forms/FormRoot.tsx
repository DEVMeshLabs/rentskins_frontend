import React, { FormHTMLAttributes } from 'react'

interface IProps extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode
  className?: string
}

export function FormRoot({ children, className = 'w-full', ...rest }: IProps) {
  return (
    <form className={className} {...rest}>
      {children}
    </form>
  )
}
