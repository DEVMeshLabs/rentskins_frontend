import Common from '@/components/Common'
import PageAdminUsersTable from '@/components/Pages/PageAdmin/PageAdminUsers/PageAdminUsersTable'
import usersMock from './users.mock'

export default function AdminUsersPage() {
  return (
    <div className="flex h-full w-full flex-col gap-8 overflow-hidden rounded-lg bg-red-400">
      <div className="flex items-center justify-between">
        <Common.Title size="2xl" bold={600}>
          Gerenciamento de Usuários
        </Common.Title>
        <button className="rounded-lg bg-green-400 px-3 py-1 text-sm">
          1 Mês
        </button>
      </div>

      <div className="mb-12 flex h-full w-full flex-col gap-8 overflow-hidden rounded-lg bg-green-500">
        {/* SEARCH BAR */}
        <div className="flex h-1/6 w-full items-center justify-center gap-4 rounded-lg bg-green-400 p-2">
          <div className="flex w-2/12 flex-col">
            <span> Nome </span>
            <span className="h-8 w-full bg-green-600"> </span>
          </div>

          <div className="flex w-2/12 flex-col">
            <span> Email </span>
            <span className="h-8 w-full bg-green-600"> </span>
          </div>

          <div className="flex w-2/12 flex-col">
            <span> Tipo de Usuário </span>
            <span className="h-8 w-full bg-green-600"> </span>
          </div>

          <div className="flex w-2/12 flex-col">
            <span> Status </span>
            <span className="h-8 w-full bg-green-600"> </span>
          </div>

          <div className="mt-6 flex h-fit w-1/12 flex-col rounded-md bg-green-500 py-1">
            <button> Localizar </button>
          </div>
        </div>

        {/* QUERY TABLE */}
        <div className="h-5/6 w-full overflow-hidden rounded-lg bg-green-400">
          <PageAdminUsersTable users={usersMock as any} />
        </div>
      </div>
    </div>
  )
}
