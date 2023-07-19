import { InputHTMLAttributes } from 'react'
import { options } from '../options'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  labelClassName?: string
  inputClassName?: string

  register?: any
  setValue?: any
  errors?: any
}

export function FormInputCard({
  label,
  name,
  labelClassName,
  inputClassName,
  register,
  setValue,
  errors,
  ...rest
}: IProps) {
  const formatInput = (value: string): string => {
    const numbers = value.replace(/\D/g, '')
    const limitCardNumber = numbers.slice(0, 16)
    const result = limitCardNumber.replace(/(\d{4})(?=\d)/g, '$1 ')
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
        className={`${inputClassName} ${options.input.className} peer`}
        {...rest}
      />
      <text className="text-sm">
        {errors && errors?.[name as string]?.message}
      </text>
    </label>
  )
}
