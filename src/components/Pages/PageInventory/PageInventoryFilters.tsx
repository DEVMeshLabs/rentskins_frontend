'use client'
import Common from '@/components/Common'
import Form from '@/components/Forms'
import useComponentStore from '@/stores/components.store'
import useFilterStore from '@/stores/filters.store'
import { FormEvent } from 'react'

export function PageInventoryFilters() {
  const { inventoryTypeFilter, setInventoryTypeFilter } = useFilterStore()
  const { isInventoryFetching } = useComponentStore()

  const onCheckboxClick = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    const values = currentTarget.value.split(',')

    if (currentTarget.checked) {
      if (!inventoryTypeFilter.includes(values[0])) {
        setInventoryTypeFilter([...inventoryTypeFilter, ...values])
      }
    } else {
      if (inventoryTypeFilter.includes(values[0])) {
        setInventoryTypeFilter(
          inventoryTypeFilter.filter(
            (filter) =>
              !filter.includes(values[0]) && !filter.includes(values[1]),
          ),
        )
      }
    }
  }

  return (
    <div>
      <div className="border-b border-mesh-color-neutral-200 pb-4">
        <Common.Title color="white" className="text-3xl font-extrabold">
          Inventário
        </Common.Title>
        <p className="mt-8 font-inter text-lg font-semibold text-white">
          Filtros
        </p>
      </div>

      <div className="flex flex-col gap-4 py-6">
        {renderTypeCheckboxes(onCheckboxClick, isInventoryFetching)}
      </div>
    </div>
  )
}

const renderTypeCheckboxes = (
  onCheckboxClick: (event: FormEvent<HTMLInputElement>) => void,
  isInventoryFetching: boolean,
) => {
  const types = [
    { value: 'Knife', label: 'Facas' },
    { value: ['Rifle', 'Sniper Rifle'], label: 'Rifles' },
    { value: 'Pistol', label: 'Pistolas' },
    { value: 'SMG', label: 'SMG' },
    { value: ['Shotgun', 'Machinegun'], label: 'Pesadas' },
    { value: 'Sticker', label: 'Figurinhas' },
    { value: 'Agent', label: 'Agentes' },
  ]

  return types.map((type) => (
    <Form.Input.Checkbox
      key={'filter-' + type.value[0].toLowerCase()}
      wrapperClassname="justify-start"
      checkClassname="ml-[0.23rem] peer-disabled:opacity-0"
      disabled={isInventoryFetching}
      labelClassName="peer-disabled:opacity-30 text-white"
      inputClassName="bg-transparent disabled:opacity-30
      border-2 border-mesh-color-neutral-500
      checked:border-mesh-color-primary-1200 h-6 w-6 rounded-md transition-all"
      value={type.value}
      label={type.label}
      onClick={(event) => onCheckboxClick(event)}
    />
  ))
}
