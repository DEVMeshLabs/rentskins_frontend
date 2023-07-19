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

export function FormInputPostalCode({
  label,
  name,
  labelClassName,
  inputClassName,
  register,
  setValue,
  errors,
  errorsClassname,
  ...rest
}: IProps) {
  const formatInput = (value: string): string => {
    let numbers = value.replace(/\D/g, '')

    if (numbers.length > 8) {
      numbers = numbers.slice(0, 8)
    }

    const firstPart = numbers.slice(0, 5)
    const secondPart = numbers.slice(5, 8)

    let result = firstPart + secondPart

    if (firstPart.length === 5 && secondPart.length === 3) {
      result = firstPart + '-' + secondPart
      return result
    }

    setValue(name, result)

    return result
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
