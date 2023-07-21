import { InputHTMLAttributes } from 'react'

interface IItem {
  value: any
  label: any
}

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  labelClassName?: string
  containerClassname?: string
  wrapperClassname?: string
  inputClassName?: string
  items: IItem[]

  register: any
  errors?: any
  errorsClassname?: string
}

export function FormInputRadioDefault({
  name,
  label,
  labelClassName,
  containerClassname,
  inputClassName,
  wrapperClassname,
  register,
  errors,
  errorsClassname,
  items,
  ...rest
}: IProps) {
  const renderItems = items.map((item, index) => (
    <div key={item.value + index} className={wrapperClassname}>
      <input
        type="radio"
        id={item.value}
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
    <div className={containerClassname}>
      {renderItems}
      <text className={errorsClassname}>{errors && errors?.message}</text>
    </div>
  )
}
