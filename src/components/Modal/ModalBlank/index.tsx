import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'

interface IProps {
  activator: ReactNode
  children: ReactNode
  contentClassname?: string
}

export default function ModalBlank({
  activator,
  children,
  contentClassname,
}: IProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild={true}>{activator}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 flex bg-black/70 transition-all">
          <Dialog.Content
            className={`fixed left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 rounded-2xl
            bg-mesh-color-neutral-700 p-4 ${contentClassname}`}
          >
            {children}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
