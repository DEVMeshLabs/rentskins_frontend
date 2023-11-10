/* eslint-disable camelcase */
'use client'
import Common from '@/components/Common'
import { IconClose } from '@/components/Icons/IconClose'
import * as Dialog from '@radix-ui/react-dialog'
import React, { useState } from 'react'
import { ModalItemShow } from './ModalItemShow'
import { ISkins } from '@/interfaces/ISkins'
import { ModalInfoItem } from './ModalInfoItem'

interface IProps {
  activator: React.ReactNode
  item: ISkins
}

export function ModalEditionItemMain({ activator, item }: IProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const handleOpen = () => setModalOpen((state) => !state)
  const isRentable = ['Sticker', 'Container', 'Collectible']

  console.log(item.skin_category)
  return (
    <Dialog.Root open={modalOpen} onOpenChange={handleOpen}>
      <Dialog.Trigger asChild>{activator}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 flex bg-black/70 transition-all" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 flex h-[75%] w-[80%]
        -translate-x-1/2 -translate-y-1/2 flex-col justify-center rounded-2xl bg-mesh-color-neutral-700"
        >
          <div className="flex h-full w-full flex-col items-center justify-between p-4 ">
            {/* TOP */}
            <div className="flex w-full items-center justify-between">
              <Dialog.Title>
                <Common.Title bold={600} size="2xl" color="white">
                  Edição
                </Common.Title>
              </Dialog.Title>
              <Dialog.Close asChild>
                <Common.Button className="-mb-6 border-transparent outline-none">
                  <IconClose />
                </Common.Button>
              </Dialog.Close>
            </div>
            <div className="flex h-[90%] w-11/12 items-center justify-between">
              <ModalItemShow
                icon_url={item.skin_image}
                weapon={item.skin_weapon}
                float={item.skin_float}
              />
              <ModalInfoItem
                onClick={handleOpen}
                skin_price={item.skin_price}
                sale_type={item.sale_type}
                id={item.id}
                skin_name={item.skin_name}
                skin_weapon={item.skin_weapon}
                statusFloatText={item.status_float}
                isRentable={!isRentable.includes(item.skin_category)}
              />
            </div>
            <div />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
