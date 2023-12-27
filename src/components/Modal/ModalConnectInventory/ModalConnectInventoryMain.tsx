'use client'
import Common from '@/components/Common'
import { IconClose } from '@/components/Icons/IconClose'
import * as Dialog from '@radix-ui/react-dialog'
import React, { useState } from 'react'
import { ModalConnectInventoryForm } from './ModalConnectInventoryForm'

interface IProps {
  activator: React.ReactNode
  userConfig: any
  open?: boolean
}

export function ModalConnectInventoryMain({
  activator,
  userConfig,
  open,
}: IProps) {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const onFormSubmit = (isLoading: boolean) => {
    setFormSubmitted(isLoading)
  }

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger asChild>{activator}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 flex bg-black/70" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-30 w-6/12 -translate-x-1/2 -translate-y-1/2
        overflow-auto rounded-2xl bg-mesh-color-neutral-700 md:h-[90vh]"
          onPointerDownOutside={(event) => {
            if (formSubmitted) {
              event.preventDefault()
            }
          }}
        >
          <div className="flex h-full w-full flex-col items-center py-8 ">
            {/* TOP */}
            <div className="flex w-11/12 items-center justify-between">
              <Dialog.Title>
                <Common.Title bold={800} size="2xl" color="white">
                  Conectar Inventário à Steam
                </Common.Title>
              </Dialog.Title>
              <Dialog.Close asChild disabled={formSubmitted}>
                <Common.Button
                  className={`border-none ${
                    formSubmitted ? 'invisible' : 'visible'
                  }`}
                >
                  <IconClose />
                </Common.Button>
              </Dialog.Close>
            </div>
            {/* MIDDLE */}
            <ModalConnectInventoryForm
              userConfig={userConfig}
              onFormSubmit={onFormSubmit}
            />
            {/* DIVISOR */}
            <div />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
