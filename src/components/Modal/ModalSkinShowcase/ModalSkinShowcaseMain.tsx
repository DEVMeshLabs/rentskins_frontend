/* eslint-disable camelcase */
'use client'
import Common from '@/components/Common'
import { IconClose } from '@/components/Icons/IconClose'
import SkinService from '@/services/skin.service'
import * as Dialog from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
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
  skinRarity: string
  skinCategory: string
  id: string
  type: string
  isSelected: boolean
  asset_id: string
  linkForPreviewSkin: string
  linkForProfile: string
  isRentable: boolean
  stickers: Array<{ url: string; name: string }>
  apiKey: boolean
  steamId: string
}

export function ModalSkinShowcaseMain({
  activator,
  isEdition,
  skinImage,
  apiKey,
  skinWeapon,
  type,
  isRentable,
  statusFloat,
  float,
  skinCategory,
  marketName,
  skinRarity,
  skinName,
  isSelected,
  asset_id,
  linkForPreviewSkin,
  stickers,
  id,
  steamId,
}: IProps) {
  const [open, setOpen] = useState(false)

  const itemsToCheckAveragePrice = [
    skinName,
    ...stickers.map(
      (sticker) =>
        (type === 'Agent' ? 'Patch' : 'Sticker') + ' | ' + sticker.name,
    ),
  ]

  const { data: averagePrice, isLoading: isLoadingAveragePrice } = useQuery({
    queryKey: ['GetItemAveragePrice', skinName],
    queryFn: () => SkinService.getItemAveragePrice(itemsToCheckAveragePrice),
    enabled: !!itemsToCheckAveragePrice && !!open,
    keepPreviousData: false,
    cacheTime: 0,
  })

  const inspectLink = linkForPreviewSkin
    .replace('%owner_steamid%', steamId)
    .replace('%assetid%', asset_id)

  const { data: skinFloat } = useQuery({
    queryKey: ['skinFloat', inspectLink!],
    queryFn: () => SkinService.getSkinFloat(inspectLink),
    enabled: !!open,
    keepPreviousData: false,
    cacheTime: 0,
  })

  return (
    <Dialog.Root open={open} onOpenChange={() => setOpen((state) => !state)}>
      <Dialog.Trigger asChild>{activator}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 flex bg-black/70 transition-all" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 flex h-fit w-[80%]
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
            <div className="flex h-fit w-full items-center justify-between px-8">
              <ModalSkinShowcaseSkin
                isRentable={isRentable}
                stickers={stickers}
                type={type}
                stickersValue={averagePrice?.data?.slice(1)!}
                stickersLoading={isLoadingAveragePrice}
                icon_url={skinImage}
                weapon={skinWeapon}                
                float={skinFloat?.data.float || ''}
              />
              <ModalSkinShowcaseInfo
                stickers={stickers}
                onOpenChange={() => setOpen((state) => !state)}
                isRentable={isRentable}
                asset_id={asset_id}
                isSelected={isSelected}
                id={id}
                apiKey={apiKey}
                skin_name={skinName}
                skin_weapon={skinWeapon}
                sale_type={'sale'}
                skin_category={skinCategory}
                recommended_price={averagePrice?.data[0] || 'Indisponível'}
                isPriceLoading={isLoadingAveragePrice}
                skin_rarity={skinRarity}
                skin_float={String(skinFloat?.data.float) || ''}
                skin_image={skinImage}
                skin_link_game={inspectLink}
                skin_link_steam={`https://steamcommunity.com/market/listings/730/${marketName}`}
                status_float={statusFloat}
                skin_paintseed={skinFloat?.data.paintseed || 0}
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
