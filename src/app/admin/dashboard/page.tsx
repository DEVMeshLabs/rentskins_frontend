import Common from '@/components/Common'
import { faturamentoTotal } from './../dashboard.mock'

export default function AdminDashboardPage() {
  return (
    <div className="flex h-full w-full flex-col gap-8 text-white">
      <Common.Title bold={600} size="2xl" className="-mb-4">
        Estatísticas Principais
      </Common.Title>

      {/* TOP */}
      <div className="flex h-2/3 w-full gap-8 overflow-hidden rounded-lg">
        {/* MAIN TAB */}
        <div className="flex w-8/12 flex-col justify-between gap-8 rounded-lg bg-mesh-color-neutral-700 p-4">
          <div className="flex flex-col gap-2">
            <Common.Title bold={600} size="xl">
              Faturamento Total da Plataforma
            </Common.Title>
            <span className="text-5xl font-bold">R$ 24.000,00</span>
          </div>
          <div className="flex h-2/4 w-full items-center justify-center self-center rounded-lg bg-mesh-color-primary-1200">
            <span className="text-5xl font-bold text-black">
              GRAPH PLACEHOLDER
            </span>
          </div>
          <div className="flex h-2/4 flex-col gap-2 overflow-y-auto overflow-x-hidden">
            <div className="mx-8 flex justify-between text-neutral-400">
              <span>Data</span>
              <span>Valor</span>
            </div>
            {renderMainTab()}
          </div>
        </div>

        <div className="flex w-4/12 flex-col justify-between gap-8 rounded-lg">
          {/* LATERAL TAB - 1 */}
          <div className="flex h-full flex-col gap-6 rounded-lg bg-mesh-color-neutral-700 p-4">
            <div className="flex flex-col gap-2">
              <Common.Title bold={600} size="xl">
                Novos Usuários
              </Common.Title>
              <span className="text-2xl font-bold text-mesh-color-primary-1000">
                +20
              </span>
            </div>
            <div className="flex h-3/4 w-full items-center justify-center self-center rounded-lg bg-mesh-color-primary-1200">
              <span className="text-3xl font-bold text-black">
                GRAPH PLACEHOLDER
              </span>
            </div>
          </div>

          {/* LATERAL TAB - 2 */}
          <div className="flex h-full flex-col gap-6 rounded-lg bg-mesh-color-neutral-700 p-4">
            <div className="flex flex-col gap-2">
              <Common.Title bold={600} size="xl">
                Perda de Usuários
              </Common.Title>
              <span className="text-2xl font-bold text-mesh-color-rarity-low">
                -2
              </span>
            </div>
            <div className="flex h-3/4 w-full items-center justify-center self-center rounded-lg bg-mesh-color-primary-1200">
              <span className="text-3xl font-bold text-black">
                GRAPH PLACEHOLDER
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="grid h-3/6 w-full grid-cols-2 grid-rows-2 gap-4 overflow-hidden rounded-lg">
        {/* GRID TAB - 1 */}
        <div className="flex h-full w-full flex-col gap-2 rounded-lg bg-mesh-color-neutral-700 p-4">
          <Common.Title bold={600} size="xl">
            Total de Usuários
          </Common.Title>
          <span className="text-4xl font-bold">24.000</span>
        </div>
        <div className="flex h-full w-full flex-col gap-2 rounded-lg bg-mesh-color-neutral-700 p-4">
          <Common.Title bold={600} size="xl">
            Faturamento do Último Mês
          </Common.Title>
          <span className="text-4xl font-bold">R$ 25.000,00</span>
        </div>
        <div className="flex h-full w-full flex-col gap-2 rounded-lg bg-mesh-color-neutral-700 p-4">
          <Common.Title bold={600} size="xl">
            Valor Médio de Transação
          </Common.Title>
          <span className="text-4xl font-bold text-mesh-color-primary-1000">
            + 120
          </span>
        </div>
        <div className="flex h-full w-full flex-col gap-2 rounded-lg bg-mesh-color-neutral-700 p-4">
          <Common.Title bold={600} size="xl">
            Total de Transações
          </Common.Title>
          <span className="text-4xl font-bold">321.232</span>
        </div>
      </div>
    </div>
  )
}

function renderMainTab() {
  return faturamentoTotal.map((item, index) => (
    <div
      key={'main-tab-' + index}
      className="mx-8 flex justify-between border-t border-neutral-500 text-white"
    >
      <span>{item.data}</span>
      <span>
        {item.value.toLocaleString('pt-br', {
          currency: 'BRL',
          style: 'currency',
          minimumFractionDigits: 2,
        })}
      </span>
    </div>
  ))
}
