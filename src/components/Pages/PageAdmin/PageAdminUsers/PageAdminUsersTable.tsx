import IconEdit from '@/components/Icons/admin/IconEdit'

interface IAdminUserTable {
  name: string
  email: string
  startDay: string
  type: 'Usuário' | 'Administrador'
  status: 'Ativo' | 'Suspenso'
}

interface IProps {
  users: IAdminUserTable[]
}

export default function PageAdminUsersTable({ users }: IProps) {
  return (
    <div className="h-full pb-16">
      {/* QUERY HEADERS */}
      <div className="grid h-16 w-full grid-cols-7 items-center border-b border-mesh-color-neutral-400 p-2 text-center text-sm font-semibold text-white">
        <span>ID do Usuário</span>
        <span>Email</span>
        <span>Data de Início</span>
        <span>Tipo de Usuário</span>
        <span>Status</span>
        <span>Suspender Usuário</span>
        <span>Ação</span>
      </div>
      {/* QUERY RESULTS */}
      <div className="h-full w-full divide-y divide-mesh-color-neutral-400 overflow-y-auto overflow-x-hidden">
        {renderTableContent(users)}
      </div>
    </div>
  )
}

function renderTableContent(users: IAdminUserTable[]) {
  return users.map((user, index) => (
    <div
      key={'admin-users-table-' + index}
      className="grid w-full grid-cols-7 items-center justify-center py-4 text-center text-sm text-white odd:bg-mesh-color-neutral-700"
    >
      <span> {user.name} </span>
      <span> {user.email} </span>
      <span> {user.startDay} </span>
      <span> {user.type} </span>
      <div
        className={`${
          user.status === 'Ativo'
            ? 'bg-mesh-color-rarity-high'
            : 'bg-mesh-color-rarity-low'
        } m-auto w-fit self-center rounded-lg px-2 py-1 font-bold text-black`}
      >
        {user.status}
      </div>
      <button className="text-red-500 underline">Suspender</button>
      <button className="m-auto w-fit">
        <IconEdit />
      </button>
    </div>
  ))
}
