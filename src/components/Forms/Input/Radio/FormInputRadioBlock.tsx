import Image, { StaticImageData } from 'next/image'
import React, { Dispatch, InputHTMLAttributes, SetStateAction } from 'react'

export type TypeFormRadioInlineOption = {
  label: string | number | StaticImageData | React.ReactNode
  labelType?: 'node' | 'string' | 'image'
  value: string | number
  disabled?: boolean
  checked?: boolean
  className?: string
}

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  labelSide?: 'up' | 'down'
  labelClassname?: string
  inputClassname?: string
  imageClassname?: string
  containerClassname?: string
  wrapperClassname?: string
  options: TypeFormRadioInlineOption[]
  state?: string | number
  setState?:
    | Dispatch<SetStateAction<number>>
    | Dispatch<SetStateAction<string>>
    | Dispatch<SetStateAction<'mastercard' | 'paypal' | 'banktransfer'>>
}

export function FormInputRadioBlock({
  name,
  label,
  labelSide = 'up',
  labelClassname,
  containerClassname,
  wrapperClassname = 'w-full',
  imageClassname,
  inputClassname,
  options,
  state,
  setState,
  ...rest
}: IProps) {
  const createItems = options.map((item, index) => {
    if (item === null) {
      return null
    }

    return (
      <div key={index} className={`${wrapperClassname || 'flex flex-col'}`}>
        <input
          type="radio"
          id={'form-radio-block-for' + name + '-' + index}
          name={'form-radio-block-' + name}
          className={`peer appearance-none
        transition-all ${
          item.className ||
          inputClassname ||
          'w-full checked:bg-mesh-color-primary-1100'
        }`}
          value={item.value}
          onChange={({ target: { value } }) =>
            setState &&
            setState(
              value as SetStateAction<number> &
                SetStateAction<string> &
                SetStateAction<'mastercard' | 'paypal' | 'banktransfer'>,
            )
          }
          defaultChecked={item.checked}
          disabled={item.disabled}
          {...rest}
        />
        <label
          htmlFor={'form-radio-block-for' + name + '-' + index}
          className={`${
            labelClassname ||
            `flex h-full w-full rounded-md border-2
          border-transparent bg-mesh-color-neutral-500 px-4 py-3 text-lg font-semibold text-mesh-color-neutral-200
          duration-500 hover:bg-mesh-color-neutral-500/50 peer-checked:border-mesh-color-primary-600
          peer-checked:bg-mesh-color-neutral-400 peer-checked:text-white peer-disabled:cursor-default
          peer-disabled:border-mesh-color-neutral-600 peer-disabled:bg-mesh-color-neutral-600`
          } cursor-pointer select-none items-center justify-center transition-all`}
        >
          {(item.labelType === 'node' || item.labelType === 'string') &&
            (item.label as string | React.ReactNode)}
          {item.labelType === 'image' && (
            <Image
              src={item.label as StaticImageData}
              alt={item.value as string}
              className={imageClassname}
            />
          )}
        </label>
      </div>
    )
  })

  return (
    <div className={`${containerClassname || 'w-full'}`}>
      {label && labelSide === 'up' && label}
      {createItems}
      {label && labelSide === 'down' && label}
    </div>
  )
}
