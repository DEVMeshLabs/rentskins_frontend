import Common from '@/components/Common'
import { IconClose } from '@/components/Icons'
import * as Dialog from '@radix-ui/react-dialog'
import classNames from 'classnames'

interface IProps {
  onClick: () => void
  label: string
  className?: string
}

export function ModalTitleSkin({ onClick, label, className }: IProps) {
  return (
    <div className={classNames('flex justify-between', className)}>
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
