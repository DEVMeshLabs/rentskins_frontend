import Common from '@/components/Common'
import { IconClose } from '@/components/Icons'
import * as Dialog from '@radix-ui/react-dialog'

interface IProps {
  onClick: () => void
  label: string
}

export function ModalTitleSkin({ onClick, label }: IProps) {
  return (
    <div className="flex justify-between ">
      <Common.Title bold={800} color="white" size="2xl">
        {label}
      </Common.Title>
      <Dialog.Close asChild onClick={onClick}>
        <Common.Button className="border-transparent">
          <IconClose />
        </Common.Button>
      </Dialog.Close>
    </div>
  )
}
