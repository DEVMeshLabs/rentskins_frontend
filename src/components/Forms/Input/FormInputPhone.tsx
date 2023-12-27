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

export function FormInputPhone({
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
    <label className={`${labelClassName} relative flex flex-col text-lg`}>
      <span className="-mb-4"> {label} </span>
      <ReactInputMask
        mask={mask || '(99) 99999-9999'}
        alwaysShowMask={alwaysShowMask}
        maskChar={maskChar}
        autoComplete="off"
        maskPlaceholder={maskPlaceholder}
        className={`${inputClassName || options.input.className}`}
        type="text"
        placeholder={rest.placeholder}
        {...register}
        {...rest}
      />
      <span className={errorsClassname || options.input.errors}>
        {errors && errors?.message}
      </span>
    </label>
  )
}
