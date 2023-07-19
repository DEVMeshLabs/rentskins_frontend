import { InputHTMLAttributes } from 'react'
import { options } from '../options'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  labelClassName?: string
  limit?: number
  inputClassName?: string

  register: any
  setValue: any
  errors?: any
  errorsClassname?: string
}

export function FormInputNumber({
  name,
  label,
  labelClassName,
  limit = 0,
  inputClassName,
  register,
  setValue,
  errors,
  errorsClassname,
  ...rest
}: IProps) {
  const formatInput = (value: string): string => {
    const numbers = value.replace(/\D/g, '')

    if (limit > 0) {
      return numbers.slice(0, limit)
    }

    setValue(name, numbers)

    return numbers
  }

  return (
    <label className={`${labelClassName} flex flex-col text-lg`}>
      {label}
      <input
        type="text"
        inputMode="numeric"
        ref={register(name)}
        id={name}
        name={name}
        onChange={(event) =>
          (event.target.value = formatInput(event.target.value))
        }
        className={`${inputClassName} ${options.input.className}`}
        {...register}
        {...rest}
      />
      <text className={errorsClassname || options.input.errors}>
        {errors && errors?.[name as string]?.message}
      </text>
    </label>
  )
}
