import PageUserNotifications from '@/components/Pages/PageUser/PageUserNotification/PageUserNotifications'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notificações - RentSkins',
  description: `RentSkins é a melhor plataforma para comprar, vender e alugar skins do Counter-Strike. Encontre skins raras e exclusivas para personalizar seu jogo.`,
}
export default function NotificationPage() {
  return (
    <main className="mx-auto mt-6 flex min-h-[60vh] w-8/12 flex-col">
      <PageUserNotifications />
    </main>
  )
}
