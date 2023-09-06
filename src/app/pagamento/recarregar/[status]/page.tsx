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
}

export default function PaymentAddStatusPage({ params }: IProps) {
  console.log(params.status)
  const referer = headers().get('referer')

  if (
    params.status !== 'sucesso' &&
    params.status !== 'falha' &&
    params.status !== 'cancelado'
  ) {
    notFound()
  }

  console.log(referer)

  // const validURLs = [
  //   `${process.env.NEXT_PUBLIC_URL}/pagamento/recarregar/mastercard`,
  //   `${process.env.NEXT_PUBLIC_URL}/pagamento/recarregar/pix`,
  //   `${process.env.NEXT_PUBLIC_URL}/pagamento/recarregar/boleto`,
  // ]

  // const urlIsValid = validURLs.some((url) => url === referer)

  // if (!urlIsValid) {
  //   notFound()
  // }

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
    </div>
  )

  const renderFailedMessage = () => (
    <div className="flex h-1/3 flex-col items-center justify-center gap-10">
      <Common.Title className="w-2/3 text-center" size="2xl" bold={600}>
        Pagamento cancelado. Tivemos um problema na verificação do pagamento,
        tente novamente mais tarde.
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
      {params.status === 'falha' && renderFailedMessage()}
      {params.status === 'sucesso' && renderSucessMessage()}
      {params.status === 'cancelado' && renderCancelMessage()}
    </main>
  )
}
