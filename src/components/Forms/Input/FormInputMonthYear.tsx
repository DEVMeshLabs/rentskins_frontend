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

export function FormInputMonthYear({
  name,
  label,
  labelClassName,
  inputClassName,
  register,
  setValue,
  errors,
  errorsClassname,
  ...rest
}: IProps) {
  const formatInput = (value: string): string => {
    const numbers = value.replace(/\D/g, '')

    const month = numbers.slice(0, 2)
    const year = numbers.slice(2, 4)

    let result

    if (value.length > 2) {
      setValue(name, `${month}/${year}`)
      result = `${month}/${year}`
    } else {
      result = String(month)
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
