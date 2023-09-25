import Common from '@/components/Common'
import { IconShield } from '@/components/Icons'
import { LayoutLoading } from '@/components/Layout/LayoutLoading'

interface IProps {
  isLoading: boolean
  handleOnProceed: () => void
}

export default function KYCMessage({ isLoading, handleOnProceed }: IProps) {
  return (
    <LayoutLoading label="Processando..." enabled={isLoading}>
      <div className="mb-8 flex h-full flex-col items-center justify-end gap-28">
        <div className="flex flex-col items-center justify-center gap-4">
          <div
            className="flex items-center
       gap-2 rounded-lg bg-mesh-color-primary-1900/20 px-4 py-2 text-lg font-semibold tracking-wide text-white"
          >
            <IconShield
              width={18}
              height={18}
              stroke="#C5EA56"
              fill="#C5EA56"
            />
            <span> Segurança KYC (Conheça seu cliente) </span>
          </div>
          <div className="flex w-4/5 flex-col justify-center gap-8 text-lg font-medium">
            <span className="text-center text-white">
              Para utilizar este método de retirada, solicitamos que você
              conclua o processo de verificação de identidade (KYC)
            </span>
            <span className="text-center text-mesh-color-neutral-200">
              Está etapa é necessária como medida de segurança contra atividades
              fraudulentas. O processo geralmente, leva cerca de 10 minutos para
              ser concluído. Após a conclusão bem-sucedida, o KYC será válido
              para todos os pagamentos na RentSkins
            </span>
          </div>
        </div>
        <div className="flex w-full items-end justify-end">
          <Common.Button
            className="h-14 w-4/12 border-transparent bg-mesh-color-primary-1200 text-2xl font-bold"
            onClick={() => handleOnProceed()}
          >
            Prosseguir
          </Common.Button>
        </div>
      </div>
    </LayoutLoading>
  )
}
