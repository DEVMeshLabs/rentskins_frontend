import { InputHTMLAttributes } from 'react'
import ReactInputMask from 'react-input-mask'
import { options } from '../options'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  mask?: string
  maskPlaceholder?: string
  maskChar?: string | null | undefined
  alwaysShowMask?: boolean
  labelClassName?: string
  inputClassName?: string

  register: any
  errors?: any
  errorsClassname?: string
}

export function FormInputCPF({
  label,
  name,
  labelClassName,
  mask,
  maskPlaceholder,
  alwaysShowMask = false,
  maskChar = null,
  inputClassName,
  register,
  errors,
  errorsClassname,
  ...rest
}: IProps) {
  return (
    <label className={`${labelClassName} flex flex-col text-lg`}>
      <span className="-mb-4"> {label} </span>
      <ReactInputMask
        mask={mask || '999.999.999-99'}
        alwaysShowMask={alwaysShowMask}
        maskChar={maskChar}
        maskPlaceholder={maskPlaceholder}
        className={`${inputClassName || options.input.className}`}
        type="text"
        placeholder={rest.placeholder}
        {...rest}
        {...register}
      />
      <span className={errorsClassname || options.input.errors}>
        {errors && errors?.message}
      </span>
    </label>
  )
}
