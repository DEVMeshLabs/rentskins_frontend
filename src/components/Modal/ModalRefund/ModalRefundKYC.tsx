'use client'
import Common from '@/components/Common'
import { IconClose } from '@/components/Icons'
import { LayoutLoading } from '@/components/Layout/LayoutLoading'
import * as Dialog from '@radix-ui/react-dialog'
import classNames from 'classnames'
import { useState } from 'react'

export default function ModalRefundKYC() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Dialog.Content
      className={classNames(
        'fixed left-1/2 top-1/2 h-96 w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#222723] px-8 py-6',
        { 'flex items-center justify-center': isLoading === true },
      )}
    >
      <LayoutLoading enabled={isLoading} label="Processando...">
        <div className="mb-5 flex h-full w-full flex-col items-end justify-between">
          <Dialog.Close>
            <Common.Button className="self-end border-none">
              <IconClose />
            </Common.Button>
          </Dialog.Close>

          <Common.Button
            onClick={() => {
              setIsLoading(true)
            }}
            color="green"
            className="h-11 w-80 rounded text-lg font-bold text-black"
          >
            Prosseguir
          </Common.Button>
        </div>
      </LayoutLoading>
    </Dialog.Content>
  )
}
