import Common from '@/components/Common'
import useModalStore from '@/stores/modal.store'
import * as Dialog from '@radix-ui/react-dialog'
import { ModalTitleSkin } from '../ModalBuy/ModalTitleSkin'
import { ModalInfoRent } from './ModalInfoRent'
import { IconShield } from '@/components/Icons'
import ModalReturnRefundMethod from './ModalRefundMethod/ModalReturnRefundMethod'

export default function ModalChoiceRetrievePayment() {
  const { setWhatModalOpenToReturnSkin } = useModalStore()

  return (
    <Dialog.Content
      className="fixed left-1/2 top-1/2 z-30
    flex min-w-[613px] -translate-x-1/2 -translate-y-1/2 flex-col gap-y-16 rounded-xl bg-mesh-color-neutral-800 px-8 pb-8 pt-5"
    >
      <div className="flex flex-col gap-8">
        <ModalTitleSkin
          className="w-full"
          onClick={() => setWhatModalOpenToReturnSkin(0)}
          label="Devolução"
        />

        <div className="flex items-start justify-between">
          <ModalInfoRent
            classNameDivTitles="flex flex-col gap-4"
            classNameTitle="text-[18px]"
            classNameSubtitle="text-white text-[30px]"
            className="gap-2"
            label={[{ title: 'Reembolso', subtitle: 'R$742,50' }]}
          />
          <div className="flex items-center gap-2">
            <IconShield />
            <p className="text-[12px] font-normal text-mesh-color-neutral-200">
              Segurança KYC
            </p>
          </div>
        </div>
        <ModalReturnRefundMethod />
      </div>
      <div className="flex gap-8 self-end">
        <Common.Button
          type="button"
          className="h-11 border-mesh-color-primary-1200 bg-mesh-color-primary-1200 px-14 py-3 text-lg font-bold text-mesh-color-others-black disabled:border-mesh-color-neutral-500 disabled:bg-mesh-color-neutral-500 disabled:text-mesh-color-neutral-300"
          onClick={() => setWhatModalOpenToReturnSkin(3)}
        >
          Pedir devolução
        </Common.Button>
      </div>
    </Dialog.Content>
  )
}
