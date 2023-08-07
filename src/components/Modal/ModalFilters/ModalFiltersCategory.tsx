'use client'
import Common from '@/components/Common'
import InputCheckbox from '@/components/InputCheckboxFilter'
import useFilterStore from '@/stores/filters.store'
import { useState } from 'react'

export default function ModalFiltersCategory() {
  const [categories, setCategories] = useState<string[]>([])

  const {
    selectedFilters,
    setSelectedFilters,
    cleanSelectedFilters,
    setCheckedInputCheckbox,
  } = useFilterStore()

  const handleClickSetFilterPrice = () => {
    if (categories!.length > 0) {
      setSelectedFilters({ ...selectedFilters, categories: [...categories] })
    }
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-5">
        <Common.Title color="white" size="2xl" bold={600}>
          Categoria
        </Common.Title>
        <div className="flex w-full items-center gap-5">
          <InputCheckbox
            setValues={setCategories}
            values={categories}
            inputValues={['Adesivos', 'StatTrak']}
          />
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Common.Button
          onClick={() => {
            cleanSelectedFilters({ ...selectedFilters, categories: [] })
            setCheckedInputCheckbox(null)
          }}
          className="h-11 w-32 font-bold text-white"
        >
          Limpar
        </Common.Button>
        <Common.Button
          onClick={handleClickSetFilterPrice}
          className="h-11 w-32 border-none bg-mesh-color-primary-1200 font-bold text-black"
        >
          Aplicar
        </Common.Button>
      </div>
    </div>
  )
}
