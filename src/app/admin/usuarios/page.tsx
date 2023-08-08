import Common from '@/components/Common'
import PageAdminUsersForm from '@/components/Pages/PageAdmin/PageAdminUsers/PageAdminUsersForm'
import PageAdminUsersTable from '@/components/Pages/PageAdmin/PageAdminUsers/PageAdminUsersTable'
import usersMock from './../users.mock'

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
        {/* SEARCH BAR */}
        <div className="flex h-1/6 w-full items-center justify-center gap-4 rounded-lg bg-mesh-color-neutral-700 p-2">
          <PageAdminUsersForm />
        </div>

        {/* QUERY TABLE */}
        <div className="h-full w-full overflow-hidden">
          <PageAdminUsersTable users={usersMock as any} />
        </div>
      </div>
    </div>
  )
}
