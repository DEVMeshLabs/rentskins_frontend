'use client'
import Common from '@/components/Common'
import Link from 'next/link'

export default function PaymentWithdrawSuccessPage() {
  return (
    <main className="flex h-screen flex-col items-center justify-start bg-mesh-color-others-black text-white">
      <div className="gap- flex h-1/3 flex-col items-center justify-center gap-10">
        <Common.Title className="w-2/3 text-center" size="2xl" bold={600}>
          Pagamento concluído! Seu saldo foi recarregado com sucesso!
        </Common.Title>

        <Link
          className="flex w-2/3 items-center justify-center rounded-md border-transparent bg-mesh-color-primary-1200 py-3 text-xl font-bold text-black opacity-70 hover:opacity-100"
          href={'/'}
        >
          Continuar
        </Link>
      </div>
    </main>
  )
}
