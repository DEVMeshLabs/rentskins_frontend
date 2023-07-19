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

export function FormInputCPF({
  name,
  label,
  labelClassName,
  inputClassName,
  setValue,
  register,
  errors,
  ...rest
}: IProps) {
  const formatInput = (value: string): string => {
    let numbers = value.replace(/\D/g, '')

    if (numbers.length > 11) {
      numbers = numbers.slice(0, 11)
    }

    const result = numbers.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4',
    )

    setValue(name, result)

    return result
  }

  return (
    <label className={`${labelClassName} flex flex-col text-lg`} htmlFor={name}>
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
      <text className="text-sm">
        {errors && errors?.[name as string]?.message}
      </text>
    </label>
  )
}
