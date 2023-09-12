import Common from '@/components/Common'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Status da Recarga - RentSkins',
  description: `Rentskins é a melhor plataforma para comprar, vender e alugar skins do CS:GO.
  Encontre skins raras e exclusivas para personalizar seu jogo.`,
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

  const renderSucessMessage = () => (
    <div className="flex h-1/3 flex-col items-center justify-center gap-10">
      <Common.Title className="w-5/6 text-center" size="2xl" bold={600}>
        O seu pagamento está sendo processado com sucesso!
      </Common.Title>

      <Common.Title className="w-fit text-center" size="xl" bold={600}>
        Em breve, o seu saldo será recarregado.
      </Common.Title>

      <Link
        className="flex w-64 items-center justify-center rounded-md border-transparent bg-mesh-color-primary-1200 py-3 text-xl font-bold text-black opacity-70 transition-all hover:opacity-100"
        href={'/'}
      >
        Continuar
      </Link>
    </div>
  )

  const renderCancelMessage = () => (
    <div className="flex h-1/3 flex-col items-center justify-center gap-10">
      <Common.Title className="w-2/3 text-center" size="2xl" bold={600}>
        Pagamento cancelado. Seu saldo não foi recarregado.
      </Common.Title>

      <Link
        className="flex w-64 items-center justify-center rounded-md border-transparent bg-mesh-color-primary-1200 py-3 text-xl font-bold text-black opacity-70 transition-all hover:opacity-100"
        href={'/'}
      >
        Continuar
      </Link>
    </div>
  )

  return (
    <main className="flex h-[40vh] flex-col items-center justify-center bg-mesh-color-others-black text-white">
      {params.status === 'processo' && renderSucessMessage()}
      {params.status === 'cancelado' && renderCancelMessage()}
    </main>
  )
}
