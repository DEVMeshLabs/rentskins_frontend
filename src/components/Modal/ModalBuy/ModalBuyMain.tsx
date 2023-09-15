'use client'
import useSkinsStore from '@/stores/skins.store'
import * as Dialog from '@radix-ui/react-dialog'
import React from 'react'
import { ModalBuySkin } from './ModalBuySkin'
import { ModalExchangeSkin } from './ModalExchange'
import { ModalProcessing } from '../ModalProcessing'
import ModalPaymentMade from './ModalPamentMade'
import ModalPaymentRefused from './ModalPaymentRefused'

interface IProps {
  children: React.ReactNode
}

export function ModalBuyMain({ children }: IProps) {
  const { openModalBuySkin, setOpenModalBuySkin, whatModalOpenToBuySkin } =
    useSkinsStore()

  const onOpenChange = () => {
    setOpenModalBuySkin(!openModalBuySkin)
  }

  return (
    <Dialog.Root open={openModalBuySkin} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 flex bg-black/70 transition-all">
          {whatModalOpenToBuySkin === 0 && <ModalBuySkin />}
          {whatModalOpenToBuySkin === 1 && <ModalExchangeSkin />}
          {whatModalOpenToBuySkin === 2 && <ModalProcessing />}
          {whatModalOpenToBuySkin === 3 && <ModalPaymentMade />}
          {whatModalOpenToBuySkin === 4 && <ModalPaymentRefused />}
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
