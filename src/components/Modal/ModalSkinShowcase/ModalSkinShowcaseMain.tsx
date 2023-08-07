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
  image: string
  name: string
  statusFloatText: string
  float: string
  weapon: string
  preco: string
}

export function ModalSkinShowcaseMain({
  activator,
  isEdition,
  image,
  weapon,
  preco,
  statusFloatText,
  float,
  name,
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
                icon_url={image}
                weapon={weapon}
                float={float}
              />
              <ModalSkinShowcaseInfo
                name={name}
                weapon={weapon}
                preco={preco}
                statusFloatText={statusFloatText}
              />
            </div>
            <div />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
