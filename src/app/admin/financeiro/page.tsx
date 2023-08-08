import Common from '@/components/Common'
import IconLinear from '@/components/Icons/admin/IconLinear'
import { faturamentoTotal } from '../dashboard.mock'

export default function AdminFinancialPage() {
  return (
    <div className="flex h-full w-full flex-col gap-8">
      <div className="-mb-4 flex items-center justify-between">
        <Common.Title size="2xl" bold={600} className="text-white">
          Dados Financeiros
        </Common.Title>
        <button className="rounded-lg bg-mesh-color-primary-1200 px-3 py-1 text-sm font-semibold">
          1 Mês
        </button>
      </div>

      <div className="flex h-full w-full gap-8">
        {/* LEFT SIDE */}
        <div className="flex w-9/12 flex-col">
          <div className="flex h-full w-full flex-col gap-8 overflow-hidden rounded-lg">
            <div className="flex h-4/6 flex-col justify-between gap-4 rounded-lg bg-mesh-color-neutral-700 p-4">
              <div className="flex flex-col gap-2 text-white">
                <Common.Title bold={600} size="xl">
                  Faturamento Mensal
                </Common.Title>
                <span className="text-5xl font-bold">R$ 24.000,00</span>
              </div>
              <div className="flex h-2/4 w-full items-center justify-center self-center rounded-lg bg-mesh-color-primary-1200">
                <span className="text-5xl font-bold text-black">
                  GRAPH PLACEHOLDER
                </span>
              </div>
              <div className="flex h-1/4 flex-col gap-2 overflow-y-auto overflow-x-hidden">
                <div className="mx-8 flex justify-between text-neutral-400">
                  <span>Data</span>
                  <span>Valor</span>
                </div>
                {renderMainTab()}
              </div>
            </div>
            <div className="flex h-2/6 flex-col justify-between gap-4 rounded-lg bg-mesh-color-neutral-700 p-4">
              <div className="flex flex-col gap-2 text-white">
                <Common.Title bold={600} size="xl">
                  Receita Total da Plataforma
                </Common.Title>
                <span className="text-5xl font-bold">R$ 24.000,00</span>
              </div>
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-mesh-color-primary-1200">
                <span className="text-5xl font-bold text-black">
                  GRAPH PLACEHOLDER
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="grid h-full w-3/12 grid-rows-4 gap-8 overflow-hidden rounded-lg">
          <div className="flex h-full w-full flex-col justify-between rounded-lg bg-mesh-color-neutral-700 p-4">
            <div>
              <p className="text-4xl font-bold text-white">R$ 823,00</p>
              <p className="text-xl text-neutral-400">
                Receita gerada por item alugado
              </p>
            </div>
            <div className="flex w-full items-center justify-end gap-1 text-xl font-semibold text-mesh-color-primary-1200">
              <IconLinear />
              <span> 12,29% </span>
            </div>
          </div>
          <div className="flex h-full w-full flex-col justify-between rounded-lg bg-mesh-color-neutral-700 p-4">
            <div>
              <p className="text-4xl font-bold text-white">R$ 123.185,00</p>
              <p className="text-xl text-neutral-400">Vendas de skins</p>
            </div>
            <div className="flex w-full items-center justify-end gap-1 text-xl font-semibold text-mesh-color-primary-1200">
              <IconLinear />
              <span> 12,29% </span>
            </div>
          </div>
          <div className="flex h-full w-full flex-col justify-between rounded-lg bg-mesh-color-neutral-700 p-4">
            <div>
              <p className="text-4xl font-bold text-white">R$ 185,00</p>
              <p className="text-xl text-neutral-400">Taxa de comissão</p>
            </div>
            <div className="flex w-full items-center justify-end gap-1 text-xl font-semibold text-mesh-color-primary-1200">
              <IconLinear />
              <span> 12,29% </span>
            </div>
          </div>
          <div className="flex h-full w-full flex-col justify-between rounded-lg bg-mesh-color-neutral-700 p-4">
            <div>
              <p className="text-4xl font-bold text-white">1.849</p>
              <p className="text-xl text-neutral-400">Total de transações</p>
            </div>
            <div className="flex w-full items-center justify-end gap-1 text-xl font-semibold text-mesh-color-primary-1200">
              <IconLinear />
              <span> 12,29% </span>
            </div>
          </div>
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
