import PagePaymentRecharge from '@/components/Pages/PagePayment/PagePaymentRecharge/PagePaymentRecharge'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Status da Recarga - RentSkins',
  description: `RentSkins é a melhor plataforma para comprar, vender e alugar skins do Counter-Strike. Encontre skins raras e exclusivas para personalizar seu jogo.`,
}

interface IProps {
  params: {
    status: string
  }
  searchParams: {
    id: string
  }
}

export default function PaymentAddStatusPage({ params, searchParams }: IProps) {
  const referer = headers().get('referer')

  if (params.status !== 'processo' && params.status !== 'cancelado') {
    notFound()
  }

  const validURLs = `https://checkout.stripe.com/`

  const urlIsValid = referer?.includes(validURLs)

  if (!urlIsValid) {
    notFound()
  }

  return (
    <main className="flex h-[40vh] flex-col items-center justify-center bg-mesh-color-others-black text-white">
      <PagePaymentRecharge type={params.status as 'processo' | 'cancelado'} />
    </main>
  )
}
