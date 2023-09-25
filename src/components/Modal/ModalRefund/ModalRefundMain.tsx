'use client'
import useComponentStore from '@/stores/components.store'
import * as Dialog from '@radix-ui/react-dialog'
import React from 'react'
import { ModalRefundInformationMain } from './ModalRefundInformation/ModalRefundInformationMain'
import ModalRefundKYC from './ModalRefundKYC'
import ModalRefundMethodMain from './ModalRefundMethod/ModalRefundMethodMain'

interface IProps {
  activator: React.ReactNode
  name: string
  nameColor: string
  iconUrl: string
}

export function ModalRefundMain({
  activator,
  name,
  nameColor,
  iconUrl,
}: IProps) {
  const { setRefoundGeneralIndex, refoundGeneralIndex } = useComponentStore()

  return (
    <Dialog.Root modal onOpenChange={() => setRefoundGeneralIndex(0)}>
      <Dialog.Trigger asChild>{activator}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 flex bg-black/70 transition-all" />
        {refoundGeneralIndex === 0 && (
          <ModalRefundInformationMain
            iconUrl={iconUrl}
            name={name}
            nameColor={nameColor}
          />
        )}
        {refoundGeneralIndex === 1 && <ModalRefundMethodMain />}
        {refoundGeneralIndex === 2 && <ModalRefundKYC />}
      </Dialog.Portal>
    </Dialog.Root>
  )
}
