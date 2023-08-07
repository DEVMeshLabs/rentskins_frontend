import React, { InputHTMLAttributes } from 'react'
import { options } from '../options'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  labelSide?: 'up' | 'down'
  labelClassName?: string
  inputClassName?: string
  state?: string
  setState?: React.Dispatch<React.SetStateAction<string>>
}

export function FormInputEmail({
  label,
  labelSide = 'up',
  labelClassName,
  inputClassName,
  state,
  setState,
  ...rest
}: IProps) {
  const formatInput = (value: string): string => {
    const email = value.replace(/[^\w.@+-]/g, '')
    return email
  }

  return (
    <label className={`${labelClassName} flex flex-col text-lg`}>
      {label && labelSide === 'up' && label}
      <input
        type="email"
        onChange={({ target }) =>
          setState && setState(formatInput(target.value))
        }
        value={state}
        className={`${inputClassName || options.input.className}`}
        {...rest}
      />
      {label && labelSide === 'down' && label}
    </label>
  )
}
