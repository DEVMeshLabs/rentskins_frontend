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
    <div className="h-full">
      {/* QUERY HEADERS */}
      <div className="grid h-16 w-full grid-cols-7 items-center bg-green-600 p-2 text-center text-sm">
        <span>ID do Usuário</span>
        <span>Email</span>
        <span>Data de Início</span>
        <span>Tipo de Usuário</span>
        <span>Status</span>
        <span>Suspender Usuário</span>
        <span>Ação</span>
      </div>
      {/* QUERY RESULTS */}
      <div className="h-full w-full overflow-y-auto overflow-x-hidden">
        {renderTableContent(users)}
      </div>
    </div>
  )
}

function renderTableContent(users: IAdminUserTable[]) {
  return users.map((user, index) => (
    <div
      key={'admin-users-table-' + index}
      className="grid w-full grid-cols-7 py-4 text-center text-sm last:mb-2 odd:bg-lime-400 even:bg-lime-300"
    >
      <span> {user.name} </span>
      <span> {user.email} </span>
      <span> {user.startDay} </span>
      <span> {user.type} </span>
      <span> {user.status} </span>
      <button className="font-semibold text-red-500 underline">
        Suspender
      </button>
      <button className="text-blue-500"> Ação </button>
    </div>
  ))
}
