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
}

export function FormInputDate({
  label,
  name,
  labelClassName,
  inputClassName,
  register,
  errors,
  errorsClassname,
  ...rest
}: IProps) {
  return (
    <label className={`${labelClassName} flex flex-col text-lg`}>
      {label}
      <input
        type="text"
        inputMode="numeric"
        id={name}
        name={name}
        className={`${inputClassName || options.input.className}`}
        {...register}
        {...rest}
      />
      <text className={errorsClassname || options.input.errors}>
        {errors && errors?.[name as string]?.message}
      </text>
    </label>
  )
}
