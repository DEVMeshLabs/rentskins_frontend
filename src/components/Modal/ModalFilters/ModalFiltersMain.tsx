'use client'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import React, { useState } from 'react'
import ModalFiltersCategory from './ModalFiltersCategory'
import ModalFiltersPrice from './ModalFiltersPrice'
import ModalFiltersStandard from './ModalFiltersStandard'
import ModalFiltersWear from './ModalFiltersWear'

interface IProps {
  activator: React.ReactNode
  child: 'Preço' | 'Desgaste' | 'Categoria' | 'Padrão'
}

export default function ModalFiltersMain({ activator, child }: IProps) {
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => {
    setOpenModal((state) => !state)
  }

  return (
    <DropdownMenu.Root onOpenChange={setOpenModal} open={openModal}>
      <DropdownMenu.Trigger asChild>{activator}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          <div
            className={`absolute top-4 ${
              child === 'Padrão'
                ? '-right-10 top-1 w-[184px] py-4'
                : 'h-64 w-[497px]'
            } ${child === 'Desgaste' && 'h-[325px]'}
              rounded-lg bg-mesh-color-neutral-800 p-4`}
          >
            {child === 'Preço' && (
              <ModalFiltersPrice handleOpen={handleOpenModal} />
            )}
            {child === 'Desgaste' && (
              <ModalFiltersWear handleOpen={handleOpenModal} />
            )}
            {child === 'Categoria' && (
              <ModalFiltersCategory handleOpen={handleOpenModal} />
            )}
            {child === 'Padrão' && (
              <ModalFiltersStandard handleOpen={handleOpenModal} />
            )}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
