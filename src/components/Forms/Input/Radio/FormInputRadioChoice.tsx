import Common from '@/components/Common'
import React, { InputHTMLAttributes } from 'react'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  checked: boolean
  title: string
  setState: (checked: boolean) => void
}

export function FormInputRadioChoice({
  name,
  checked,
  setState,
  title,
  ...rest
}: IProps) {
  return (
    <label className="relative">
      <div className="flex flex-col items-center gap-6">
        <input
          type="radio"
          checked={checked}
          onChange={({ target: { checked } }) => setState(checked)}
          name={`input-radio-choice-` + name}
          className="peer absolute"
          {...rest}
        />
        <Common.Title
          bold={600}
          color="white"
          size="3xl"
          className="cursor-pointer"
        >
          {title}
        </Common.Title>
        <div className="w-0 rounded-md transition-all duration-300 peer-checked:h-1 peer-checked:w-full peer-checked:bg-mesh-color-accent-1400" />
      </div>
    </label>
  )
}
