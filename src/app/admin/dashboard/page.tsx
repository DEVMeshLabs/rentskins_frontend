import Common from '@/components/Common'

export default function AdminDashboardPage() {
  return (
    <div className="flex h-full w-full flex-col gap-8 bg-red-400">
      <Common.Title bold={600} size="2xl" className="-mb-8">
        Estatísticas Principais
      </Common.Title>

      {/* TOP */}
      <div className="flex h-1/2 w-full gap-8 overflow-hidden rounded-lg bg-purple-500">
        <div className="w-8/12 rounded-lg bg-purple-600 p-2">
          <Common.Title bold={600} size="lg">
            Faturamento total da plataforma
          </Common.Title>
        </div>
        <div className="flex w-4/12 flex-col justify-between gap-8 rounded-lg bg-purple-600">
          <div className="h-full rounded-lg bg-purple-800 p-2">
            <Common.Title bold={600} size="lg">
              Novos usuários
            </Common.Title>
          </div>
          <div className="h-full rounded-lg bg-purple-800 p-2">
            <Common.Title bold={600} size="lg">
              Perda de usuários
            </Common.Title>
          </div>
        </div>
      </div>
      {/* BOTTOM */}
      <div className="grid h-1/2 w-full grid-cols-2 grid-rows-2 gap-8 overflow-hidden rounded-lg bg-green-500">
        <div className="h-full w-full rounded-lg bg-green-300 p-2">
          <Common.Title bold={600} size="lg">
            Total de Usuários
          </Common.Title>
        </div>
        <div className="h-full w-full rounded-lg bg-green-300 p-2">
          <Common.Title bold={600} size="lg">
            Faturamento do Último Mês
          </Common.Title>
        </div>
        <div className="h-full w-full rounded-lg bg-green-300 p-2">
          <Common.Title bold={600} size="lg">
            Valor Médio de Transação
          </Common.Title>
        </div>
        <div className="h-full w-full rounded-lg bg-green-300 p-2">
          <Common.Title bold={600} size="lg">
            Total de Transações
          </Common.Title>
        </div>
      </div>
    </div>
  )
}
