import React, { InputHTMLAttributes } from 'react'

type TypeItem = {
  label: string
  value: string
  disabled?: boolean
}

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  labelSide?: 'up' | 'down'
  labelClassname?: string
  options: TypeItem[]
  state: string
  setState: React.Dispatch<React.SetStateAction<string>>
  className?: string
  default: InputHTMLAttributes<HTMLInputElement>
}

export function FormInputRadioInline({
  name,
  label,
  labelSide = 'up',
  labelClassname,
  options,
  state,
  className,
  setState,
  ...rest
}: IProps) {
  const createItems = options.map((item, index) => (
    <div key={index} className="flex w-full items-center gap-2">
      <input
        type="radio"
        id={'form-radio-inline-for' + label + '-' + index}
        name={'form-radio-inline-' + name}
        className={`${labelClassname} peer h-3 w-3 cursor-pointer appearance-none rounded-full border-2
        border-mesh-color-primary-1100 bg-mesh-color-others-eerie-black
        transition-all checked:bg-mesh-color-primary-1100`}
        value={item.value}
        onChange={(event) => setState(event.target.value)}
        defaultChecked={index === 0 && true}
        disabled={item.disabled}
        {...rest}
      />
      <label
        htmlFor={'form-radio-inline-for' + label + '-' + index}
        className="cursor-pointer select-none text-white"
      >
        {item.label}
      </label>
    </div>
  ))

  return (
    <div>
      {label && labelSide === 'up' && label}
      <div className={`${className}`}> {createItems} </div>
      {label && labelSide === 'down' && label}
    </div>
  )
}
