import PagePaymentRecharge from '@/components/Pages/PagePayment/PagePaymentRecharge/PagePaymentRecharge'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Recarga - RentSkins',
  description: `Rentskins é a melhor plataforma para comprar, vender e alugar skins do CS:GO.
  Encontre skins raras e exclusivas para personalizar seu jogo.`,
}

export default function PaymentAddPage() {
  const referer = headers().get('referer')

  if (referer === null) {
    notFound()
  }

  return (
    <main className="flex h-screen w-full flex-col items-center justify-start bg-mesh-color-others-black text-white">
      <PagePaymentRecharge />
    </main>
  )
}
