'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { ColorRing } from 'react-loader-spinner'

export function ModalLoadingMain() {
  return (
    <div>
      <Dialog.Root modal open={true} defaultOpen={false}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-30 flex bg-black/70 transition-all" />
          <Dialog.Content
            onOpenAutoFocus={(event) => event.preventDefault()}
            onCloseAutoFocus={(event) => event.preventDefault()}
            onEscapeKeyDown={(event) => event.preventDefault()}
            onPointerDown={(event) => event.preventDefault()}
            onInteractOutside={(event) => event.preventDefault()}
            tabIndex={-1}
            className="fixed left-1/2 top-1/2 z-30 flex h-1/2 w-1/2 -translate-x-1/2
  -translate-y-1/2 items-center justify-center rounded-2xl bg-transparent"
          >
            <ColorRing
              width={100}
              height={100}
              colors={['#A6CF2B', '#A6CF2B', '#A6CF2B', '#A6CF2B', '#A6CF2B']}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
