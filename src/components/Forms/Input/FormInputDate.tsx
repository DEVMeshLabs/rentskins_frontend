import { InputHTMLAttributes } from 'react'
import { options } from '../options'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  labelClassName?: string
  inputClassName?: string

  register: any
  setValue: any
  errors?: any
  errorsClassname?: string
}

export function FormInputDate({
  label,
  labelClassName,
  inputClassName,
  name,
  register,
  setValue,
  errors,
  errorsClassname,
  ...rest
}: IProps) {
  const formatInput = (value: string): string => {
    let numbers = value.replace(/\D/g, '')

    numbers = numbers.replace(/^(\d{2})(\d{2})(\d{4}).*/, '$1/$2/$3')

    setValue(name, numbers)

    return numbers
  }

  return (
    <label className={`${labelClassName} flex flex-col text-lg`}>
      {label}
      <input
        type="text"
        inputMode="text"
        ref={register(name)}
        id={name}
        name={name}
        onChange={(event) =>
          (event.target.value = formatInput(event.target.value))
        }
        className={`${inputClassName} ${options.input.className}`}
        {...rest}
      />
      <text className={errorsClassname || options.input.errors}>
        {errors && errors?.[name as string]?.message}
      </text>
    </label>
  )
}
