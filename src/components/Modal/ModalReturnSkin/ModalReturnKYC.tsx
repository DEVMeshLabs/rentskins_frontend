'use client'
import Common from '@/components/Common'
import IconShieldGreen from '@/components/Icons/IconShieldGreen'
import useModalStore from '@/stores/modal.store'
import * as Dialog from '@radix-ui/react-dialog'
import { ModalTitleSkin } from '../ModalBuy/ModalTitleSkin'

export default function ModalReturnKYC() {
  const { setWhatModalOpenToReturnSkin } = useModalStore()

  return (
    <Dialog.Content className="fixed left-1/2 top-1/2 w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#222723] px-8 pb-7 pt-6">
      <div className="flex h-full w-full flex-col items-end justify-between gap-5">
        <ModalTitleSkin
          className="w-full"
          onClick={() => setWhatModalOpenToReturnSkin(0)}
          label="Devolução"
        />

        <div className="flex h-full w-full flex-col items-center gap-4">
          <div className="flex items-center gap-2 rounded-lg bg-[#333F24] p-2">
            <IconShieldGreen />
            <Common.Title color="white" size="lg" bold={600}>
              Segurança KYC (conheça seu cliente)
            </Common.Title>
          </div>
          <p className="w-3/4 text-center text-lg font-medium text-white">
            Para utilizar este método de retirada, solicitamos que você conclua
            o processo de verificação de identidade (KYC)
          </p>
          <p className="w-3/4 text-center text-lg font-medium text-mesh-color-neutral-200">
            Está etapa é necessária como medida de segurança contra atividades
            fraudulentas. O processo geralmente, leva cerca de 10 minutos para
            ser concluído. Após a conclusão bem-sucedida, o KYC será válido para
            todos os pagamentos na RentSkins
          </p>
        </div>

        <Common.Button
          color="green"
          className="h-11 rounded text-lg font-bold text-black"
          onClick={() => setWhatModalOpenToReturnSkin(4)}
        >
          Prosseguir
        </Common.Button>
      </div>
    </Dialog.Content>
  )
}
