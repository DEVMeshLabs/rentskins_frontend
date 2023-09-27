/* eslint-disable camelcase */
'use client'
import Common from '@/components/Common'
import { IconClose } from '@/components/Icons/IconClose'
import * as Dialog from '@radix-ui/react-dialog'
import React from 'react'
import { ModalItemShow } from './ModalItemShow'
import { ISkins } from '@/interfaces/ISkins'
import { ModalInfoItem } from './ModalInfoItem'

interface IProps {
  activator: React.ReactNode
  item: ISkins
}

export function ModalEditionItemMain({ activator, item }: IProps) {
  return (
    <Dialog.Root>
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
                skin_price={item.skin_price}
                asset_id={item.asset_id}
                id={item.id}
                skin_name={item.skin_name}
                skin_weapon={item.skin_weapon}
                sale_type={'sale'}
                skin_category={item.skin_category}
                skin_color={item.skin_color}
                skin_float={item.skin_float}
                skin_image={item.skin_image}
                skin_link_game={item.skin_link_game}
                skin_link_steam={`${item.skin_link_steam}inventory#730_2_${item.asset_id}`}
                status_float={item.status_float}
                statusFloatText={item.status_float}
              />
            </div>
            <div />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
