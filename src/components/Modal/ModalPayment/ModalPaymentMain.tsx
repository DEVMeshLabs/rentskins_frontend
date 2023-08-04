'use client'
import useComponentStore from '@/stores/components.store'
import * as Dialog from '@radix-ui/react-dialog'
import React from 'react'
import { ModalPaymentAdd } from './ModalPaymentAdd'
import { ModalPaymentCheck } from './ModalPaymentCheck'
import { ModalPaymentRetrieveMain } from './ModalPaymentRetrieve/ModalPaymentRetrieveMain'

interface IProps {
  children: React.ReactNode
}

export function ModalPaymentMain({ children }: IProps) {
  const {
    paymentGeneralIndex,
    setPaymentGeneralIndex,
    setPaymentRetrieveIndex,
  } = useComponentStore()

  const onOpenChange = () => {
    setPaymentGeneralIndex(0)
    setPaymentRetrieveIndex(0)
  }

  return (
    <Dialog.Root defaultOpen={false} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 flex bg-black/70 transition-all" />
        {paymentGeneralIndex === 0 && <ModalPaymentCheck />}
        {paymentGeneralIndex === 1 && <ModalPaymentAdd />}
        {paymentGeneralIndex === 2 && <ModalPaymentRetrieveMain />}
      </Dialog.Portal>
    </Dialog.Root>
  )
}
