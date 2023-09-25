import React, { InputHTMLAttributes } from 'react'
import { IconDocumentUpload } from '../Icons/IconDocumentUpload'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  labelSide?: 'up' | 'down'
  labelClassName?: string
  subLabel: string
  inputClassName?: string
  icon?: React.ReactNode
}

export function FormDropzone({
  label,
  labelSide = 'up',
  labelClassName,
  inputClassName,
  subLabel,
  icon = <IconDocumentUpload />,
  ...rest
}: IProps) {
  return (
    <div className="flex w-full items-center justify-center">
      <label
        htmlFor="dropzone-file"
        className="group flex h-80
        w-full cursor-pointer flex-col items-center justify-center rounded-lg
      border-2 border-dashed border-mesh-color-primary-1600/70 opacity-100 transition-all
      duration-300 hover:opacity-50"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <div className="mb-4">{icon}</div>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="text-center text-lg font-semibold">{label}</span>
          </p>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            {subLabel}
          </p>
        </div>
        <div className="w-2/4 rounded-lg border-2 border-mesh-color-primary-1600/70 py-3 text-center text-mesh-color-neutral-100">
          Enviar Arquivo
        </div>
        <input id="dropzone-file" type="file" className="hidden" {...rest} />
      </label>
    </div>
  )
}
