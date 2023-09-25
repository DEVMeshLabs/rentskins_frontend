import PagePaymentWithdraw from '@/components/Pages/PagePayment/PagePaymentWithdraw/PagePaymentWithdraw'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Saque - RentSkins',
  description: `Rentskins é a melhor plataforma para comprar, vender e alugar skins do Counter-Strike. Encontre skins raras e exclusivas para personalizar seu jogo.`,
}

export default function PaymentWithdrawPage() {
  const referer = headers().get('referer')

  if (referer === null) {
    notFound()
  }

  return (
    <main className="flex h-fit flex-col items-center justify-start bg-mesh-color-others-black pb-64 text-white">
      <PagePaymentWithdraw />
    </main>
  )
}
