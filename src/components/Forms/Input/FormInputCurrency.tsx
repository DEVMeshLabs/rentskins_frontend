import { InputHTMLAttributes } from 'react'
import { Controller } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { options } from '../options'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  showCurrencySign?: boolean
  enableDefault?: boolean
  currencySign?: string
  label?: string
  labelClassName?: string
  currencyClassname?: string
  limit?: number
  inputClassName?: string
  placeHolder?: string | number

  register: any
  control: any
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
  currencyClassname,
  placeHolder,
  limit = 0,
  inputClassName,
  register,
  control,
  errors,
  errorsClassname,
  ...rest
}: IProps) {
  return (
    <label className={`${labelClassName} flex flex-col text-lg`}>
      <span className="-mb-4"> {label} </span>
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, ...rest } }: any) => (
          <NumericFormat
            thousandSeparator="."
            decimalSeparator=","
            autoComplete="off"
            prefix="R$ "
            decimalScale={2}
            placeholder={placeHolder}
            getInputRef={ref}
            className={`${inputClassName || options.input.className}`}
            {...register}
            {...rest}
          />
        )}
      />
      <span
        className={errorsClassname || 'absolute mt-[85px] text-sm text-red-500'}
      >
        {errors?.message}
      </span>
    </label>
  )
}
