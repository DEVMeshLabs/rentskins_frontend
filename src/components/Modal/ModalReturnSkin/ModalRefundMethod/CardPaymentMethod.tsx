import React from 'react'

interface IProps {
  label: {
    methodImage: React.ReactNode
    title?: string
  }[]
}

export default function CardPaymentMethod({ label }: IProps) {
  return (
    <div className="flex gap-5">
      {label.map(({ methodImage, title }, idx) => {
        return (
          <div className="relative" key={`${methodImage}-${idx}-${title}`}>
            <input
              type="radio"
              name="retrieve-method"
              className="peer absolute z-10 h-full w-full cursor-pointer"
            />
            <div className="flex h-full w-full items-center justify-between rounded-md border-2 border-mesh-color-neutral-500 bg-mesh-color-neutral-500 px-8 py-4 transition-all duration-500 peer-checked:border-[#D4F377] peer-hover:bg-mesh-color-neutral-400">
              {methodImage}
            </div>
          </div>
        )
      })}
    </div>
  )
}
