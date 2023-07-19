import { InputHTMLAttributes } from 'react'
import ReactInputMask from 'react-input-mask'
import { options } from '../options'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  showCurrencySign?: boolean
  enableDefault?: boolean
  currencySign?: string
  label?: string
  mask?: string
  maskPlaceholder?: string
  maskChar?: string | null | undefined
  alwaysShowMask?: boolean
  labelClassName?: string
  currencyClassname?: string
  limit?: number
  inputClassName?: string

  register: any
  errors?: any
  errorsClassname?: string
}

export function FormInputCurrency({
  name,
  showCurrencySign = true,
  enableDefault = true,
  currencySign = 'R$',
  label,
  labelClassName = 'text-white',
  mask,
  maskPlaceholder,
  alwaysShowMask = false,
  maskChar = null,
  currencyClassname,
  limit = 0,
  inputClassName,
  register,
  errors,
  errorsClassname,
  ...rest
}: IProps) {
  return (
    <label className={`${labelClassName} flex flex-col text-lg`}>
      {label}
      <ReactInputMask
        mask={mask || 'R$ ?????????????????????????????????????????'}
        formatChars={{ '?': '[0-9/,]' }}
        alwaysShowMask={alwaysShowMask}
        maskChar={maskChar}
        maskPlaceholder={maskPlaceholder}
        className={`${inputClassName || options.input.className}`}
        type="text"
        placeholder={rest.placeholder}
        {...register}
      />
      <text className={errorsClassname || options.input.errors}>
        {errors && errors?.[name as string]?.message}
      </text>
    </label>
  )
}
