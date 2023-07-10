import Image, { StaticImageData } from 'next/image'
import React, { InputHTMLAttributes } from 'react'

export type TypeFormRadioInlineOption = {
  label: string | StaticImageData | React.ReactNode
  labelType?: 'node' | 'string' | 'image'
  value: string
  disabled?: boolean
}

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  labelSide?: 'up' | 'down'
  labelClassname?: string
  inputClassname?: string
  compareChecked?: string
  containerClassname?: string
  wrapperClassname?: string
  options: TypeFormRadioInlineOption[]
  state: any
  setState: any
}

export function FormInputRadioBlock({
  name,
  label,
  labelSide = 'up',
  labelClassname,
  containerClassname,
  wrapperClassname = 'w-full',
  inputClassname,
  compareChecked = '',
  options,
  state,
  setState,
  ...rest
}: IProps) {
  const createItems = options.map((item, index) => (
    <div key={index} className={`${wrapperClassname}`}>
      <input
        type="radio"
        id={'form-radio-block-for' + label + '-' + index}
        name={'form-radio-block-' + name}
        className={`peer w-full appearance-none
        transition-all checked:bg-mesh-color-primary-1100 ${inputClassname}`}
        value={item.value}
        onChange={(event) => setState(event.target.value)}
        defaultChecked={
          compareChecked !== '' && compareChecked === item.value
            ? true
            : index === 0 && true
        }
        disabled={item.disabled}
        {...rest}
      />
      <label
        htmlFor={'form-radio-block-for' + label + '-' + index}
        className={`${labelClassname} flex w-full cursor-pointer select-none items-center justify-center gap-4 rounded-md 
          border-2 border-transparent bg-mesh-color-neutral-500 px-4 py-3 text-lg font-semibold text-mesh-color-neutral-200
          transition-all duration-500 hover:bg-mesh-color-neutral-500/50 peer-checked:border-mesh-color-primary-600
          peer-checked:bg-mesh-color-neutral-400 peer-checked:text-white peer-disabled:cursor-default
          peer-disabled:border-mesh-color-neutral-600 peer-disabled:bg-mesh-color-neutral-600`}
      >
        {(item.labelType === 'node' || item.labelType === 'string') &&
          (item.label as string | React.ReactNode)}
        {item.labelType === 'image' && (
          <Image src={item.label as StaticImageData} alt={item.value} />
        )}
      </label>
    </div>
  ))

  return (
    <div className={`${containerClassname} w-full`}>
      {label && labelSide === 'up' && label}
      {createItems}
      {label && labelSide === 'down' && label}
    </div>
  )
}