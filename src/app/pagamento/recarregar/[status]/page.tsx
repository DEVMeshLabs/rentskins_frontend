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
      <Common.Title className="w-2/3 text-center" size="2xl" bold={600}>
        Pagamento concluído! Seu saldo foi recarregado com sucesso!
      </Common.Title>

      <Link
        className="flex w-64 items-center justify-center rounded-md border-transparent bg-mesh-color-primary-1200 py-3 text-xl font-bold text-black opacity-70 transition-all hover:opacity-100"
        href={'/'}
      >
        Continuar
      </Link>

      <span className="text-xs text-white">
        ID da Transação: {searchParams.id || 'Indefinido'}
      </span>
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
