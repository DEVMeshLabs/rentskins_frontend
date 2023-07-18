import React, { InputHTMLAttributes } from 'react'
import { options } from '../options'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  labelSide?: 'up' | 'down'
  labelClassName?: string
  inputClassName?: string

  state?: string
  setState?: React.Dispatch<React.SetStateAction<string>>

  register?: object
}

export function FormInputCPF({
  label,
  labelSide = 'up',
  labelClassName,
  inputClassName,
  state,
  setState,
  register,
  ...rest
}: IProps) {
  const formatInput = (value: string): string => {
    console.log('ok')
    let numbers = value.replace(/\D/g, '')

    if (numbers.length > 11) {
      numbers = numbers.slice(0, 11)
    }

    const result = numbers.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4',
    )

    return result
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
