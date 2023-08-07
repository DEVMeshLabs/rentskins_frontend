import Common from '@/components/Common'

export default function AdminStatisticsPage() {
  return (
    <div className="flex h-full w-full flex-col gap-8 bg-red-400">
      <Common.Title bold={600} size="2xl" className="-mb-8">
        Estatísticas de Usuários
      </Common.Title>

      {/* TOP */}
      <div className="flex h-1/2 w-full gap-8 overflow-hidden rounded-lg bg-purple-500">
        <div className="w-7/12 rounded-lg bg-purple-600 p-2">
          <Common.Title bold={600} size="lg">
            Estatísticas de Conversão de Usuários
          </Common.Title>
        </div>
        <div className="w-5/12 rounded-lg bg-purple-600 p-2"></div>
      </div>
      {/* BOTTOM */}
      <div className="h-1/2 w-full overflow-hidden rounded-lg bg-green-500 p-2">
        <Common.Title bold={600} size="lg">
          Número Médio de Transações por Usuário
        </Common.Title>
      </div>
    </div>
  )
}
