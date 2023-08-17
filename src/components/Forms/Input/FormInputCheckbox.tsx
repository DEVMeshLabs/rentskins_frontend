import React, { InputHTMLAttributes } from 'react'
import { options } from '../options'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string | React.ReactNode
  labelSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  wrapperClassname?: string
  labelClassName?: string
  checkClassname?: string
  inputClassName?: string

  register: any
  errors?: any
  errorsClassname?: string
}

export function FormInputCheckbox({
  name,
  label,
  labelSize = 'md',
  wrapperClassname,
  labelClassName,
  checkClassname = 'ml-[0.4rem]',
  inputClassName,
  register,
  errors,
  errorsClassname,
  ...rest
}: IProps) {
  return (
    <label
      className={`${wrapperClassname} flex cursor-pointer items-center gap-2 text-lg`}
    >
      <input
        id={name}
        name={name}
        type="checkbox"
        className={`${inputClassName || options.input.className} peer`}
        {...register}
        {...rest}
      />
      <div
        className={`${checkClassname} absolute mt-[-0.2rem] h-2 w-4 -rotate-45
        border-b-2 border-l-2 bg-transparent opacity-0 transition-all peer-checked:opacity-100 peer-disabled:peer-checked:opacity-30`}
      />
      <span
        className={`text-${labelSize} ${
          labelClassName || 'text-white'
        } select-none`}
      >
        {label}
      </span>
      <span
        className={`${errorsClassname || options.input.errors} mt-[3.5rem]`}
      >
        {errors && errors?.message}
      </span>
    </label>
  )
}
