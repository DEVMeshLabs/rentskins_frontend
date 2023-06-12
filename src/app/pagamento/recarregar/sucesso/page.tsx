'use client'
import { Button } from '@/components/Button'
import { LayoutPage } from '@/components/Shared'
import { Title } from '@/components/Title'
import { useRouter } from 'next/navigation'

export default function PaymentAddSuccessPage() {
  const router = useRouter()

  const handleOnContinue = () => {
    router.push('/')
  }

  return (
    <LayoutPage>
      {/* CHANGE COLOR */}
      <main className="flex h-screen flex-col items-center justify-start bg-mesh-color-others-black text-white">
        <div className="gap- flex h-1/3 flex-col items-center justify-center gap-10">
          <Title className="w-2/3 text-center" size="2xl" bold={600}>
            Pagamento concluído! Seu saldo foi recarregado com sucesso!
          </Title>
          {/* CHANGE COLOR */}
          <Button
            className="w-2/3 border-transparent bg-mesh-color-primary-1200 py-3 text-xl font-bold text-black"
            onClick={() => handleOnContinue()}
          >
            Continuar
          </Button>
        </div>
      </main>
    </LayoutPage>
  )
}
