'use client'
import Common from '@/components/Common'
import * as Dialog from '@radix-ui/react-dialog'
import React from 'react'

interface IProps {
  activator?: React.ReactNode
  action: 'accept' | 'decline' | undefined
  type: 'buyer' | 'seller'
  id: string | number | undefined
}

export function ModalNotificationPopup({
  activator,
  type,
  action,
  id,
}: IProps) {
  const acceptOption = (
    <div className="flex h-full flex-col justify-between">
      <div className="flex h-full flex-col items-center gap-6">
        <p className="h-full text-center text-xl font-semibold text-white">
          {type === 'buyer' ? (
            <span className="flex h-full flex-col items-center justify-evenly gap-4">
              <p>
                Você está prestes a
                <b className="font-bold text-mesh-color-primary-1200">
                  {' '}
                  confirmar que recebeu o item com sucesso
                </b>
                . Após a confirmação, não será mais possível trocar o status de
                troca do item.
              </p>
              <p>Você tem certeza de que deseja confirmar o recibo do item?</p>
            </span>
          ) : (
            <span className="flex h-full flex-col items-center justify-evenly gap-4">
              <p>
                Você está prestes a
                <b className="font-bold text-mesh-color-primary-1200">
                  {' '}
                  confirmar que enviou o item com sucesso
                </b>
                . Após a confirmação, não será mais possível trocar o status de
                troca do item.
              </p>
              <p>Você tem certeza de que deseja confirmar o envio do item?</p>
              <p className="text-center text-sm text-mesh-color-neutral-300">
                Caso seja comprovado que o item não foi recebido ou enviado,
                <br /> sua conta receberá uma punição.
              </p>
            </span>
          )}
        </p>
      </div>
      <div className="flex gap-8 self-end">
        <Dialog.Close
          className="text-lg font-medium text-mesh-color-neutral-200
        opacity-70 transition-all hover:opacity-100"
        >
          Voltar
        </Dialog.Close>
        <Common.Button className="self-end font-bold" color="green">
          Confirmar
        </Common.Button>
      </div>
    </div>
  )

  const cancelOption = (
    <div className="flex h-full flex-col justify-between">
      <div className="flex h-full flex-col items-center gap-6">
        <p className="h-full text-center text-xl font-semibold text-white">
          {type === 'buyer' ? (
            <span className="flex h-full flex-col items-center justify-evenly gap-4">
              <p>
                Você está prestes a
                <b className="font-bold text-mesh-color-rarity-lowest">
                  {' '}
                  confirmar que não recebeu o item
                </b>
                . Após a confirmação, não será mais possível trocar o status de
                troca do item.
              </p>
              <p>
                Você tem certeza de que deseja confirmar o não recebimento do
                item?
              </p>
            </span>
          ) : (
            <span className="flex h-full flex-col items-center justify-evenly gap-4">
              <p>
                Você está prestes a
                <b className="font-bold text-mesh-color-rarity-lowest">
                  {' '}
                  confirmar que não enviou o item
                </b>
                . Após a confirmação, não será mais possível trocar o status de
                troca do item.
              </p>
              <p>
                Você tem certeza de que deseja confirmar o não envio do item?
              </p>
              <p className="text-center text-sm text-mesh-color-neutral-300">
                Caso seja comprovado que o item não foi recebido ou enviado,
                <br /> sua conta receberá uma punição.
              </p>
            </span>
          )}
        </p>
      </div>
      <div className="flex gap-8 self-end">
        <Dialog.Close
          className="text-lg font-medium text-mesh-color-neutral-200
        opacity-70 transition-all hover:opacity-100"
        >
          Voltar
        </Dialog.Close>
        <Common.Button
          className="border-mesh-color-rarity-lowest
        bg-mesh-color-rarity-lowest
          font-bold text-white"
          color="green"
        >
          Confirmar
        </Common.Button>
      </div>
    </div>
  )

  return (
    <Dialog.Root modal defaultOpen={false}>
      <Dialog.Trigger>{activator}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 flex bg-black/70 transition-all" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-30 flex h-2/5 w-1/3 -translate-x-1/2 -translate-y-1/2 ">
          <div className="flex flex-col justify-between gap-2 rounded-2xl bg-mesh-color-neutral-700 px-8 py-6">
            {action === 'accept' ? acceptOption : cancelOption}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
