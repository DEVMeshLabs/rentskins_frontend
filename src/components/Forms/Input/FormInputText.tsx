import { InputHTMLAttributes } from 'react'
import { options } from '../options'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  labelClassName?: string
  inputClassName?: string

  register: any
  errors?: any
  errorsClassname?: string
  complete?: 'on' | 'off'
}

export function FormInputText({
  label,
  name,
  labelClassName,
  inputClassName,
  register,
  errors,
  complete = 'off',
  errorsClassname,
  ...rest
}: IProps) {
  return (
    <label className={`${labelClassName} flex flex-col text-lg`}>
      <text className="-mb-4"> {label} </text>
      <input
        type="text"
        inputMode="text"
        id={name}
        name={name}
        autoComplete={complete}
        className={`${inputClassName || options.input.className}`}
        {...register}
        {...rest}
      />
      <text className={errorsClassname || options.input.errors}>
        {errors && errors?.message}
      </text>
    </label>
  )
}
