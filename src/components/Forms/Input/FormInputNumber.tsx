import React, { InputHTMLAttributes } from 'react'
import { options } from '../options'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  labelSide?: 'up' | 'down'
  labelClassName?: string
  limit?: number
  inputClassName?: string
  state?: string
  setState?: React.Dispatch<React.SetStateAction<string>>
  register?: object
}

export function FormInputNumber({
  label,
  labelSide = 'up',
  labelClassName,
  limit = 0,
  inputClassName,
  state,
  setState,
  register,
  ...rest
}: IProps) {
  const formatInput = (value: string): string => {
    const numbers = value.replace(/\D/g, '')

    if (limit > 0) {
      return numbers.slice(0, limit)
    }

    return numbers
  }

  return (
    <label className={`${labelClassName} flex flex-col text-lg`}>
      {label && labelSide === 'up' && label}
      <input
        type="text"
        onChange={({ target }) =>
          setState && setState(formatInput(target.value))
        }
        value={state}
        className={`${inputClassName} ${options.input.className}`}
        {...register}
        {...rest}
      />
      {label && labelSide === 'down' && label}
    </label>
  )
}
