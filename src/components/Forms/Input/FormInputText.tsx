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

export function FormInputText({
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
    return value
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
        className={`${inputClassName || options.input.className}`}
        {...register}
        {...rest}
      />
      {label && labelSide === 'down' && label}
    </label>
  )
}
