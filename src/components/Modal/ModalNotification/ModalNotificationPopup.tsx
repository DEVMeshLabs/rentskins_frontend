'use client'
import Common from '@/components/Common'
import { IconClose } from '@/components/Icons'
import * as Dialog from '@radix-ui/react-dialog'
import React from 'react'

interface IProps {
  activator?: React.ReactNode
  type: 'accept' | 'decline' | undefined
  id: string | number | undefined
}

export function ModalNotificationPopup({ activator, type, id }: IProps) {
  const acceptOption = (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col items-center gap-6">
        <Dialog.Close className="self-end">
          <IconClose />
        </Dialog.Close>
        <h2 className="text-center text-xl font-semibold text-white">
          Você está prestes a ser redirecionado para a plataforma Steam para
          finalizar a troca com o comprador. Certifique-se de seguir as etapas
          necessárias na Steam para concluir a transação de troca da skin
          vendida.
        </h2>
      </div>
      <Common.Button className="self-end font-bold" color="green">
        Ir para Steam
      </Common.Button>
    </div>
  )

  const cancelOption = (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col items-center gap-6">
        <Dialog.Close className="self-end">
          <IconClose />
        </Dialog.Close>
        <h2 className="text-center text-xl font-semibold text-white">
          Tem certeza de que deseja cancelar esta transação? <br /> Ao cancelar,
          a troca com o comprador será interrompida e a skin não será
          transferida. Esta ação não pode ser desfeita.
        </h2>
      </div>
      <div className="flex gap-8 self-end">
        <Dialog.Close
          className="text-lg font-medium text-mesh-color-neutral-200
        opacity-70 transition-all hover:opacity-100"
        >
          Voltar
        </Dialog.Close>
        <Common.Button
          className="w-fit border-mesh-color-rarity-lowest
        bg-mesh-color-rarity-lowest px-6 
          font-bold text-white"
          color="green"
        >
          Desejo cancelar a troca
        </Common.Button>
      </div>
    </div>
  )

  return (
    <Dialog.Root modal defaultOpen={false}>
      <Dialog.Trigger>{activator}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 flex bg-black/70 transition-all" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-30 flex h-2/6 w-1/3 -translate-x-1/2 -translate-y-1/2 ">
          <div className="flex flex-col justify-between gap-2 rounded-2xl bg-mesh-color-neutral-700 px-8 py-6">
            {type === 'accept' ? acceptOption : cancelOption}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
