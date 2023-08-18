'use client'

import Common from '@/components/Common'
import useFilterStore from '@/stores/filters.store'
import { TTypeSort } from '@/stores/interfaces/filters.interface'

export default function ModalFiltersStandard() {
  return (
    <div className="flex h-full w-full flex-col justify-between gap-1">
      <StandardCheckboxItem label="Menor preço" value="lowestPrice" />
      <StandardCheckboxItem label="Maior preço" value="biggestPrice" />
      <StandardCheckboxItem label="Maior float" value="biggestFloat" />
    </div>
  )
}

interface IProps {
  value: TTypeSort
  label: string
}

function StandardCheckboxItem({ value, label }: IProps) {
  const { setTypeFilter } = useFilterStore()
  return (
    <label className="flex cursor-pointer rounded font-semibold text-white hover:bg-zinc-200 hover:bg-opacity-5">
      <input
        type="radio"
        name="standardRadio"
        className="peer"
        value={value}
        onChange={({ target: { value } }) => setTypeFilter(value as TTypeSort)}
      />
      <Common.Title className="w-full rounded p-2 peer-checked:bg-zinc-200 peer-checked:bg-opacity-20">
        {label}
      </Common.Title>
    </label>
  )
}
