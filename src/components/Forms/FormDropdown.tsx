import { SelectHTMLAttributes } from 'react'
import { IconDropdownArrow } from '../Icons/IconDropdownArrow'

type TypeItem = {
  label: string
  value: string
}

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  labelSide?: 'up' | 'down'
  labelClassName?: string
  iconColor?: string
  inputClassName?: string
  options: TypeItem[]

  register: any
}

export function FormDropdown({
  label,
  labelSide = 'up',
  labelClassName,
  iconColor,
  inputClassName,
  options,
  register,
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
          className={`${inputClassName} appearance-none rounded-md border-[2px] border-mesh-color-primary-1100/50
          bg-mesh-color-others-eerie-black py-3 pl-3 pr-12 placeholder:text-white/70`}
          {...register}
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
