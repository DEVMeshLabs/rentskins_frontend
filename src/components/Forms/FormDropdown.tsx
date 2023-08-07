import React, { SelectHTMLAttributes } from 'react'
import { IconDropdownArrow } from '../Icons/IconDropdownArrow'

type TypeItem = {
  label: string
  value: string
}

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  labelSide?: 'up' | 'down'
  labelClassName?: string
  icon?: boolean
  iconColor?: string
  inputClassName?: string
  options: TypeItem[]
  state: string
  setState: React.Dispatch<React.SetStateAction<string>>
}

export function FormDropdown({
  label,
  labelSide = 'up',
  labelClassName,
  icon = true,
  iconColor,
  inputClassName,
  options,
  state,
  setState,
  ...rest
}: IProps) {
  const createOptions = options?.map((item, index) => (
    <option key={'form-dropdown-for' + label + '-' + index} value={item.value}>
      {item.label}
    </option>
  ))

  return (
    <label className={`${labelClassName} flex text-lg`}>
      <div className="flex w-full flex-1 flex-col">
        {label && labelSide === 'up' && label}
        <select
          value={state}
          onChange={({ target }) => setState(target.value)}
          className={`${inputClassName} appearance-none rounded-md border-[2px] border-mesh-color-primary-1100/50
        bg-mesh-color-others-eerie-black py-3 pl-3 pr-12 placeholder:text-white/70`}
          {...rest}
        >
          {options !== undefined && options.length > 0 && createOptions}
        </select>
      </div>
      <div className="relative -left-4 top-[3.25rem] -ml-4 w-4 select-none">
        <IconDropdownArrow width={14} fill={iconColor || '#AEAEAE'} />
      </div>
      {label && labelSide === 'down' && label}
    </label>
  )
}
