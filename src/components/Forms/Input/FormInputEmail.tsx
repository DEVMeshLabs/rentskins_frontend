import { InputHTMLAttributes } from 'react'
import { options } from '../options'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  labelSide?: 'up' | 'down'
  labelClassName?: string
  inputClassName?: string

  register: any
  setValue: any
  errors?: any
  errorsClassname?: string
}

export function FormInputEmail({
  name,
  label,
  labelSide = 'up',
  labelClassName,
  inputClassName,

  register,
  setValue,
  errors,
  errorsClassname,
  ...rest
}: IProps) {
  const formatInput = (value: string): string => {
    const email = value.replace(/[^\w.@+-]/g, '')
    setValue(name, email)
    return email
  }

  return (
    <label className={`${labelClassName} flex flex-col text-lg`}>
      {label}
      <input
        type="email"
        inputMode="email"
        ref={register(name)}
        id={name}
        name={name}
        onChange={(event) =>
          (event.target.value = formatInput(event.target.value))
        }
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
