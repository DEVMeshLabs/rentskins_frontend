'use client'
import Common from '@/components/Common'
import IconFilter from '@/components/Icons/IconFilter'
import ModalFiltersMain from '@/components/Modal/ModalFilters/ModalFiltersMain'
import useFilterStore from '@/stores/filters.store'
import { TTypeSort } from '@/stores/interfaces/filters.interface'
import { useEffect, useState } from 'react'
import ContainerFilter from './ContainerFilter'

export default function SkinFilters() {
  const { typeFilter } = useFilterStore()

  const typeLabel = {
    default: 'Padrão',
    biggestPrice: 'Maior Preço',
    lowestPrice: 'Menor Preço',
    biggestFloat: 'Maior Float',
    lowestFloat: 'Menor Float',
  }

  const {
    selectedFilters: { categories, wears, prices },
    setSelectedFilters,
  } = useFilterStore()
  const [thereIsFilters, setThereIsFilters] = useState(false)

  useEffect(() => {
    const thereIsFilters =
      categories?.length! > 0 ||
      wears?.length! > 0 ||
      prices.max !== undefined ||
      prices.min !== undefined

    setThereIsFilters(thereIsFilters)
  }, [categories, wears, prices])

  return (
    <div className="flex justify-between">
      <div className="flex gap-3">
        <ContainerFilter title="Preço" />
        <ContainerFilter title="Desgaste" />
        <ContainerFilter title="Categoria" />
        {thereIsFilters && (
          <Common.Button
            onClick={() => {
              setSelectedFilters({
                wears: [],
                categories: [],
                prices: { min: undefined, max: undefined },
              })
            }}
            className="ml-2 border-none text-mesh-color-neutral-200 hover:text-mesh-color-neutral-100"
          >
            Limpar filtros
          </Common.Button>
        )}
      </div>
      <ModalFiltersMain
        activator={
          <div className="relative z-10 flex cursor-pointer items-center">
            <Common.Button className="flex cursor-pointer items-center gap-2 border-none text-white">
              <IconFilter />
              {typeLabel[typeFilter as TTypeSort] || 'Padrão'}
            </Common.Button>
          </div>
        }
        child="Padrão"
      />
    </div>
  )
}
