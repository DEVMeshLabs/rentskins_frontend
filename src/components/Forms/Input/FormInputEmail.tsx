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

export function FormInputEmail({
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
      <span className="-mb-4"> {label} </span>
      <input
        type="email"
        inputMode="email"
        id={name}
        name={name}
        className={`${inputClassName || options.input.className}`}
        {...register}
        {...rest}
      />
      <span className={errorsClassname || options.input.errors}>
        {errors && errors?.message}
      </span>
    </label>
  )
}
