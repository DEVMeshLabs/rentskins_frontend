import { InputHTMLAttributes } from 'react'

interface IItem {
  value: any
  label: any
  disabled?: boolean
}

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  labelClassName?: string
  containerClassname?: string
  wrapperClassname?: string
  inputClassName?: string
  disabled?: boolean
  items: IItem[]
  onChange?: () => void

  register: any
  errors?: any
  errorsClassname?: string
}

export function FormInputRadioDefault({
  label,
  labelClassName,
  containerClassname,
  inputClassName,
  disabled,
  wrapperClassname,
  register,
  errors,
  errorsClassname,
  items,
  onChange,
}: IProps) {
  const renderItems = items.map((item, index) => (
    <div key={item.value + index} className={`${wrapperClassname} flex`}>
      <input
        type="radio"
        id={item.value}
        disabled={disabled || item.disabled}
        value={item.value}
        className={`peer absolute appearance-none ${inputClassName}`}
        {...register}
      />
      <label htmlFor={item.value} className={labelClassName}>
        {item.label}
      </label>
    </div>
  ))

  return (
    <div className={containerClassname + ' select-none'}>
      {renderItems}
      <span className={errorsClassname}>{errors && errors?.message}</span>
    </div>
  )
}
