import Common from '@/components/Common'
import useFilterStore from '@/stores/filters.store'
import { TTypeSort } from '@/stores/interfaces/filters.interface'

interface IProps {
  value: TTypeSort
  title: string
}

export default function StandardCheckboxItem({ value, title }: IProps) {
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
        {title}
      </Common.Title>
    </label>
  )
}
