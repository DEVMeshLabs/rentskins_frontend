/* eslint-disable camelcase */
'use client'
import Common from '@/components/Common'
import { IconClose } from '@/components/Icons/IconClose'
import * as Dialog from '@radix-ui/react-dialog'
import React from 'react'
import { ModalSkinShowcaseInfo } from './ModalSkinShowcaseInfo'
import { ModalSkinShowcaseSkin } from './ModalSkinShowcaseSkin'

interface IProps {
  activator: React.ReactNode
  isEdition?: boolean
  skinName: string
  float: string
  skinImage: string
  skinWeapon: string
  statusFloat: string
  skinColor: string
  skinCategory: string
  id: string
  isSelected: boolean
}

export function ModalSkinShowcaseMain({
  activator,
  isEdition,
  skinImage,
  skinWeapon,
  statusFloat,
  float,
  skinCategory,
  skinColor,
  skinName,
  isSelected,
  id,
}: IProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{activator}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0  flex bg-black/70" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-40 h-[80%] w-[85%] -translate-x-1/2
        -translate-y-1/2 rounded-2xl bg-mesh-color-neutral-700 pb-10"
        >
          <div className="flex h-full w-full flex-col items-center justify-between pt-8">
            {/* TOP */}
            <div className="flex w-11/12 items-center justify-between">
              <Dialog.Title>
                {isEdition && (
                  <Common.Title bold={600} size="2xl" color="white">
                    Edição
                  </Common.Title>
                )}
              </Dialog.Title>
              <Dialog.Close asChild>
                <Common.Button className="border-transparent outline-none">
                  <IconClose />
                </Common.Button>
              </Dialog.Close>
            </div>
            <div className="flex h-[90%] w-11/12 items-center justify-between">
              <ModalSkinShowcaseSkin
                icon_url={skinImage}
                weapon={skinWeapon}
                float={float}
              />
              <ModalSkinShowcaseInfo
                isSelected={isSelected}
                id={id}
                skin_name={skinName}
                skin_weapon={skinWeapon}
                recommendedPrice={''}
                sale_type={'sale'}
                skin_category={skinCategory}
                skin_color={skinColor}
                skin_float={float}
                skin_image={skinImage}
                skin_link_game={''}
                skin_link_steam={''}
                status_float={statusFloat}
                statusFloatText={statusFloat}
              />
            </div>
            <div />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
