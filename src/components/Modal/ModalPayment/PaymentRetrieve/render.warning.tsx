'use client'
import { Button } from '@/components/Button'
import { IconShield } from '@/components/Icons'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CircleLoading from '@/components/CircleLoading'

export function ModalPaymentRetrieveWarning() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleOnProceed = () => {
    router.push('/pagamento/saque')
    setIsLoading(true)
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-evenly gap-7 ">
      <CircleLoading label="Processando..." enabled={isLoading}>
        {/* CHANGE COLOR */}
        <div
          className="mt-7 flex items-center
       gap-2 rounded-lg bg-[#63800d33] px-4 py-2 text-lg font-semibold tracking-wide text-white"
        >
          <IconShield width={18} height={18} stroke="#C5EA56" fill="#C5EA56" />
          <span> Segurança KYC (Conheça seu cliente) </span>
        </div>
        <div className="flex h-full w-4/5 flex-col justify-center gap-8 text-lg font-medium">
          <span className="text-center text-white">
            Para utilizar este método de retirada, solicitamos que você conclua
            o processo de verificação de identidade (KYC)
          </span>
          {/* CHANGE COLOR */}
          <span className="text-center text-[#A7B0A0]">
            Está etapa é necessária como medida de segurança contra atividades
            fraudulentas. O processo geralmente, leva cerca de 10 minutos para
            ser concluído. Após a conclusão bem-sucedida, o KYC será válido para
            todos os pagamentos na RentSkins
          </span>
        </div>
        <div className="mb-8 flex w-full items-end justify-end">
          {/* CHANGE COLOR */}
          <Button
            className="h-14 w-4/12 border-none bg-[#A6CF2B] text-2xl font-bold"
            onClick={() => handleOnProceed()}
          >
            Prosseguir
          </Button>
        </div>
      </CircleLoading>
    </div>
  )
}