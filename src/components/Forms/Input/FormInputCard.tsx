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

export function FormInputCard({
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
    const limitCardNumber = numbers.slice(0, 16)
    const result = limitCardNumber.replace(/(\d{4})(?=\d)/g, '$1 ')
    return result
  }

  return (
    <label className={`${labelClassName} flex flex-col text-lg`}>
      {label && labelSide === 'up' && label}
      <input
        type="text"
        onChange={({ target }) => setState(formatInput(target.value))}
        value={state}
        className={`${inputClassName} ${options.input.className} peer`}
        {...rest}
      />
      {label && labelSide === 'down' && label}
    </label>
  )
}
