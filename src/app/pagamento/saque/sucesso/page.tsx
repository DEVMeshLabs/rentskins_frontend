import Common from '@/components/Common'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Saque - RentSkins',
  description: `Rentskins é a melhor plataforma para comprar, vender e alugar skins do CS:GO.
  Encontre skins raras e exclusivas para personalizar seu jogo.`,
}

export default function PaymentWithdrawSuccessPage() {
  const referer = headers().get('referer')

  const validURLs = [`${process.env.NEXT_PUBLIC_URL}/pagamento/saque`]

  const urlIsValid = validURLs.some((url) => url === referer)

  if (!urlIsValid) {
    notFound()
  }

  return (
    <main className="flex h-screen flex-col items-center justify-start bg-mesh-color-others-black text-white">
      <div className="gap flex h-1/3 flex-col items-center justify-center gap-10">
        <Common.Title className="w-full text-center" size="2xl" bold={600}>
          Saque concluído!
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
