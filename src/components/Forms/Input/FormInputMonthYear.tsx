import React, { InputHTMLAttributes } from 'react'
import { options } from '../options'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  labelSide?: 'up' | 'down'
  labelClassName?: string
  inputClassName?: string
  state: string
  setState: React.Dispatch<React.SetStateAction<string>>
}

export function FormInputMonthYear({
  label,
  labelSide = 'up',
  labelClassName,
  inputClassName,
  state,
  setState,
  ...rest
}: IProps) {
  const formatInput = (value: string): string => {
    const numbers = value.replace(/\D/g, '')

    const month = numbers.slice(0, 2)
    const year = numbers.slice(2, 4)

    if (value.length > 2) {
      return `${month}/${year}`
    }
    return String(month)
  }

  return (
    <label className={`${labelClassName} flex flex-col text-lg`}>
      {label && labelSide === 'up' && label}
      <input
        type="text"
        onChange={({ target }) => setState(formatInput(target.value))}
        value={state}
        className={`${inputClassName} ${options.input.className}`}
        {...rest}
      />
      {label && labelSide === 'down' && label}
    </label>
  )
}
