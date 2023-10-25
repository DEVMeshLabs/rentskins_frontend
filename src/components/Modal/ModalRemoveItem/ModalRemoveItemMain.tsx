'use client'
import Common from '@/components/Common'
import { IconClose } from '@/components/Icons'
import * as Dialog from '@radix-ui/react-dialog'
import React, { useState } from 'react'

interface IProps {
  activator: React.ReactNode
  skinId: string
  skinName: string
}

export function ModalRemoveItemMain({ skinId, skinName, activator }: IProps) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog.Root open={open} onOpenChange={() => setOpen((state) => !state)}>
      <Dialog.Trigger asChild>{activator}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 flex bg-black/70 transition-all" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-40 w-[50%] -translate-x-1/2
        -translate-y-1/2 rounded-2xl bg-[#222723]"
        >
          <div className="flex h-full w-full flex-col items-center justify-between">
            <div className="w-full rounded-2xl bg-[#272E29] px-8 py-6">
              <div className="mb-5 flex w-full justify-between">
                <Dialog.Title asChild>
                  <Common.Title size="3xl" color="white" bold={800}>
                    Remoção
                  </Common.Title>
                </Dialog.Title>
                <Dialog.Close>
                  <Common.Button className="border-none">
                    <IconClose />
                  </Common.Button>
                </Dialog.Close>
              </div>
              <div
                className="text-mesh-color-neutral-100
              "
              >
                O anúncio do item{' '}
                <span className="text-mesh-color-primary-1200">{skinName}</span>{' '}
                será{' '}
                <span className="font-bold text-mesh-color-rarity-lowest">
                  REMOVIDO
                </span>
                . Tem certeza que deseja remover esse anúncio?{' '}
              </div>
              <div className="flex justify-end gap-5">
                <Common.Button
                  className="border-none text-mesh-color-neutral-200 hover:text-mesh-color-neutral-0"
                  color="invisible"
                >
                  Remover
                </Common.Button>

                <Common.Button
                  onClick={() => setOpen(false)}
                  className="h-11 cursor-pointer border-none bg-mesh-color-primary-1400 px-5 font-semibold text-black opacity-100 disabled:opacity-10"
                >
                  Cancelar
                </Common.Button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
