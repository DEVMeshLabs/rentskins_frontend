import PageSuspendedActivities from '@/components/Pages/PageSuspendedActivities/PageSuspendedActivities'
import { Metadata } from 'next'
import { Session, getServerSession } from 'next-auth'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Atividade Suspensa - RentSkins',
  description: `Rentskins é a melhor plataforma para comprar, vender e alugar skins do CS:GO. Encontre skins raras e exclusivas para personalizar seu jogo.`,
}

export default async function AtividadeSuspensaPage() {
  const session = await getServerSession()
  const referer = headers().get('referer')

  if (!referer) {
    notFound()
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-6">
      <PageSuspendedActivities session={session as Session} />
    </main>
  )
}
