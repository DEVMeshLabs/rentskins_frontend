import Common from '@/components/Common'
import IconSecurity from '@/components/Icons/IconSecurity'
import useComponentStore from '@/stores/components.store'
import { ModalRefundMethodInformationPayment } from './ModalRefundMethodInformationPayment'

export default function ModalRefundMethodInformationMain() {
  const { setRefoundGeneralIndex } = useComponentStore()

  return (
    <section className="flex flex-col gap-11">
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full justify-between">
          <Common.Title className="text-mesh-light-2" bold={600} size="lg">
            Reembolso
          </Common.Title>
          <h1 className="flex items-center gap-2">
            <IconSecurity />
            <span className="text-mesh-light-2 text-sm font-normal">
              Segurança KYC
            </span>
          </h1>
        </div>
        <Common.Title color="white" bold={700} size="3xl">
          R$742,50
        </Common.Title>
      </div>
      <ModalRefundMethodInformationPayment />
      <Common.Button
        onClick={() => setRefoundGeneralIndex(2)}
        color="green"
        className="h-11 w-80 self-end rounded-sm text-lg font-bold text-black"
      >
        Pedir devolução
      </Common.Button>
    </section>
  )
}
