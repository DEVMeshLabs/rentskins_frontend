import Common from '@/components/Common'
import PageAdminUsersTable from '@/components/Pages/PageAdmin/PageAdminUsers/PageAdminUsersTable'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Usuários - RentSkins',
  description: `Rentskins é a melhor plataforma para comprar, vender e alugar skins do CS:GO.
  Encontre skins raras e exclusivas para personalizar seu jogo.`,
}

export default function AdminUsersPage() {
  return (
    <div className="flex h-full w-full flex-col gap-8 overflow-hidden">
      <div className="-mb-4 flex items-center justify-between">
        <Common.Title size="2xl" bold={600} className="text-white">
          Gerenciamento de Usuários
        </Common.Title>
        <button className="rounded-lg bg-mesh-color-primary-1200 px-3 py-1 text-sm font-semibold">
          1 Mês
        </button>
      </div>

      <div className="flex h-full w-full flex-col gap-8 overflow-hidden">
        <PageAdminUsersTable />
      </div>
    </div>
  )
}
