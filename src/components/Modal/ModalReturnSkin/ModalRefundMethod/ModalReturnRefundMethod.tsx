import Common from '@/components/Common'
import CardPaymentMethod from './CardPaymentMethod'
import { IconMastercard } from '@/components/Icons/payment/IconMastercard'
import { IconPayPal } from '@/components/Icons/payment/IconPayPal'
import { IconBankTransfer } from '@/components/Icons/payment/IconBankTransfer'

export default function ModalReturnRefundMethod() {
  return (
    <div className="flex flex-col gap-5">
      <Common.Title bold={600} size="xl" color="white">
        Selecione o método de recebimento
      </Common.Title>
      {
        <CardPaymentMethod
          label={[
            {
              methodImage: <IconMastercard />,
            },
            {
              methodImage: <IconPayPal />,
            },
            {
              methodImage: <IconBankTransfer />,
            },
          ]}
        />
      }
    </div>
  )
}
