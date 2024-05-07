import Common from '@/components/Common'
import { ModalNotificationPopup } from '@/components/Modal/ModalNotification/ModalNotificationPopup'
import { ButtonHTMLAttributes, ElementType } from 'react'

type ModalType = {
  action: 'Aceito' | 'Recusado'
  type: 'buyer' | 'seller'
  id: string | number
}

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle: 'opaque' | 'full'
  token: string
  icon?: ElementType
  text?: string | number
  modal: boolean
  modalOptions?: ModalType
  onClick?: () => void
}

export function TransactionButton({
  icon: Icon,
  buttonStyle,
  modal = false,
  text,
  onClick,
  modalOptions,
  token,
}: IProps) {
  const withModal = (
    <ModalNotificationPopup
      id={modalOptions?.id}
      type={modalOptions?.type!}
      action={modalOptions?.action}
      token={token}
      activator={
        <Common.Button
          onClick={onClick}
          className={`w-[140px] rounded-md px-4 py-2 opacity-60 transition-all hover:opacity-100 ${
            buttonStyle === 'full' &&
            'border border-mesh-color-primary-1200 bg-mesh-color-primary-1200 font-semibold text-mesh-color-others-black'
          } ${
            buttonStyle === 'opaque' &&
            'border border-mesh-color-neutral-500 bg-transparent text-mesh-color-neutral-300'
          }`}
        >
          {text}
          {Icon && <Icon />}
        </Common.Button>
      }
    />
  )

  const withoutModal = (
    <Common.Button
      onClick={onClick}
      className={`w-[140px] rounded-md px-4 py-2 opacity-60 transition-all hover:opacity-100 ${
        buttonStyle === 'full' &&
        'border border-mesh-color-primary-1200 bg-mesh-color-primary-1200 font-semibold text-mesh-color-others-black'
      } ${
        buttonStyle === 'opaque' &&
        'border border-mesh-color-neutral-500 bg-transparent text-mesh-color-neutral-300'
      }`}
    >
      {text}
      {Icon && <Icon />}
    </Common.Button>
  )

  return <>{modal ? withModal : withoutModal}</>
}
