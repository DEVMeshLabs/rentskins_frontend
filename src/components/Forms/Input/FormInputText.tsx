import { InputHTMLAttributes } from 'react'
import { options } from '../options'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  labelClassName?: string
  inputClassName?: string
  optional?: boolean

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
  optional = false,
  errors,
  complete = 'off',
  errorsClassname,
  ...rest
}: IProps) {
  return (
    <label className={`${labelClassName} flex flex-col text-lg`}>
      <span className="-mb-4">
        {label}
        {optional && (
          <span className="text-xs text-red-500">* Opcional</span>
        )}{' '}
      </span>
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
      <span className={errorsClassname || options.input.errors}>
        {errors && errors?.message}
      </span>
    </label>
  )
}
