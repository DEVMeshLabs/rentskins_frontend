/* eslint-disable camelcase */
'use client'
import Common from '@/components/Common'
import { IconClose } from '@/components/Icons/IconClose'
import SkinService from '@/services/skin.service'
import * as Dialog from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
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
  marketName: string
  skinColor: string
  skinCategory: string
  id: string
  isSelected: boolean
  asset_id: string
  linkForPreviewSkin: string
  linkForProfile: string
}

export function ModalSkinShowcaseMain({
  activator,
  isEdition,
  skinImage,
  skinWeapon,
  statusFloat,
  float,
  skinCategory,
  marketName,
  skinColor,
  skinName,
  isSelected,
  asset_id,
  linkForPreviewSkin,
  linkForProfile,
  id,
}: IProps) {
  const { data: averagePrice } = useQuery({
    queryKey: ['GetItemAveragePrice', marketName],
    queryFn: () => SkinService.getItemAveragePrice([marketName]),
    enabled: !!marketName,
  })

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
                {isEdition && (
                  <Common.Title bold={600} size="2xl" color="white">
                    Edição
                  </Common.Title>
                )}
              </Dialog.Title>
              <Dialog.Close asChild>
                <Common.Button className="-mb-6 border-transparent outline-none">
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
                asset_id={asset_id}
                isSelected={isSelected}
                id={id}
                skin_name={skinName}
                skin_weapon={skinWeapon}
                recomended_price={averagePrice?.data[0] || 'Não encontrado'}
                sale_type={'sale'}
                skin_category={skinCategory}
                skin_color={skinColor}
                skin_float={float}
                skin_image={skinImage}
                skin_link_game={linkForPreviewSkin}
                skin_link_steam={`${linkForProfile}inventory#730_2_${asset_id}`}
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
