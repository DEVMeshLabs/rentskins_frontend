'use client'
import useModalStore from '@/stores/modal.store'
import * as Dialog from '@radix-ui/react-dialog'
import React from 'react'
import { ModalReturnSkin } from './ModalReturnSkin'
import ModalLeftToSteam from './ModalLeftToSteam'

export function ModalReturnMain() {
  const {
    whatModalOpenToReturnSkin,
    setWhatModalOpenToReturnSkin,
    setOpenModalReturnSkin,
    openModalReturnSkin,
  } = useModalStore()
  const onOpenChange = () => {
    setOpenModalReturnSkin(false)
  }

  return (
    <Dialog.Root open={openModalReturnSkin} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 flex bg-black/70 transition-all">
          {whatModalOpenToReturnSkin === 0 && (
            <ModalReturnSkin onClick={() => setWhatModalOpenToReturnSkin(1)} />
          )}
          {whatModalOpenToReturnSkin === 1 && <ModalLeftToSteam />}
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
