/* eslint-disable camelcase */
'use client'
import Common from '@/components/Common'
import InputCheckbox from '@/components/InputCheckboxFilter'
import useFilterStore from '@/stores/filters.store'
import { useState } from 'react'

export default function FilterWear() {
  const [wears, setWears] = useState<string[]>([])

  const {
    selectedFilters,
    setSelectedFilters,
    cleanSelectedFilters,
    setCheckedInputCheckbox,
    checkedInputCheckbox,
  } = useFilterStore()

  const handleClickSetFilterPrice = () => {
    if (wears!.length > 0) {
      setSelectedFilters({ ...selectedFilters, wears: [...wears] })
    }
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-5">
        <Common.Title color="white" size="2xl" bold={600}>
          Desgaste
        </Common.Title>
        <div className="flex w-full items-center gap-5">
          <InputCheckbox
            setValues={setWears}
            values={wears}
            inputValues={[
              'Nova de Fábrica',
              'Pouco Usada',
              'Testada em Campo',
              'Bem Desgastada',
              'Veterana de Guerra',
            ]}
            defaultChecks={
              selectedFilters.wears && selectedFilters.wears?.length > 0
                ? selectedFilters.wears
                : []
            }
          />
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Common.Button
          onClick={() => {
            cleanSelectedFilters({ ...selectedFilters, wears: [] })
            setCheckedInputCheckbox(null)
          }}
          className="h-11 w-32 font-bold text-white"
        >
          Limpar
        </Common.Button>
        <Common.Button
          disable={
            checkedInputCheckbox.filter(({ checked }) => checked).length === 0
          }
          onClick={() => handleClickSetFilterPrice()}
          className="h-11 w-32 border-none bg-mesh-color-primary-1200 font-bold text-black"
        >
          Aplicar
        </Common.Button>
      </div>
    </div>
  )
}
