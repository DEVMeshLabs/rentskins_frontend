'use client'

import Common from '@/components/Common'

export default function ModalFiltersStandard() {
  return (
    <div className="flex h-full w-full flex-col justify-between gap-1">
      <StandardCheckboxItem value="Menor preço" />
      <StandardCheckboxItem value="Maior Preço" />
      <StandardCheckboxItem value="Maior float" />
    </div>
  )
}

interface IProps {
  value: string
}

function StandardCheckboxItem({ value }: IProps) {
  return (
    <label className="flex cursor-pointer rounded font-semibold text-white hover:bg-zinc-200 hover:bg-opacity-5">
      <input type="radio" name="standardRadio" className="peer" />
      <Common.Title className="w-full rounded p-2 peer-checked:bg-zinc-200 peer-checked:bg-opacity-20">
        {value}
      </Common.Title>
    </label>
  )
}
