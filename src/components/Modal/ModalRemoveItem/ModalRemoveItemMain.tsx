'use client'
import Common from '@/components/Common'
import { IconClose } from '@/components/Icons'
import SkinService from '@/services/skin.service'
import Toast from '@/tools/toast.tool'
import * as Dialog from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'

interface IProps {
  activator: React.ReactNode
  skinId: string
  skinName: string
}

export function ModalRemoveItemMain({ skinId, skinName, activator }: IProps) {
  const [open, setOpen] = useState(false)
  const { data, refetch, isRefetching } = useQuery({
    queryKey: ['deleteItem', skinId],
    queryFn: () => SkinService.deleteById(skinId),
    enabled: false,
  })

  useEffect(() => {
    if (data?.request.status === 204) {
      setOpen(false)
      Toast.Success(
        `O anúncio do item ${skinName} foi removido. Por favor, reinicie a página`,
        7000,
      )
    } else if (data?.request.status === 404) {
      Toast.Error(
        `O anúncio do item ${skinName} já foi removido. Por favor, reinicie a página`,
        7000,
      )
    }
  }, [data])

  return (
    <Dialog.Root open={open} onOpenChange={() => setOpen((state) => !state)}>
      <Dialog.Trigger asChild>{activator}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 flex bg-black/70 transition-all" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-40 w-[80%] max-w-[500px] -translate-x-1/2
        -translate-y-1/2 rounded-2xl bg-[#222723]"
        >
          <div className="flex h-full w-full flex-col items-center justify-between">
            <div className="flex w-full flex-col gap-3 rounded-2xl bg-[#272E29] px-8 py-6">
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
                .
                <span className="block">
                  Tem certeza que deseja remover esse anúncio?{' '}
                </span>
              </div>
              <div
                className={`flex h-12 items-center ${
                  !isRefetching ? 'justify-end' : 'justify-center'
                } gap-5`}
              >
                {!isRefetching ? (
                  <>
                    <Common.Button
                      className="border-none text-mesh-color-neutral-200 hover:text-mesh-color-neutral-0"
                      color="invisible"
                      onClick={() => refetch()}
                    >
                      Remover
                    </Common.Button>

                    <Common.Button
                      onClick={() => setOpen(false)}
                      className="h-11 cursor-pointer border-none bg-mesh-color-primary-1400 px-5 font-semibold text-black opacity-100 disabled:opacity-10"
                    >
                      Cancelar
                    </Common.Button>
                  </>
                ) : (
                  <div className="self-center">
                    <ColorRing
                      width={50}
                      height={50}
                      colors={[
                        '#A6CF2B',
                        '#A6CF2B',
                        '#A6CF2B',
                        '#A6CF2B',
                        '#A6CF2B',
                      ]}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
