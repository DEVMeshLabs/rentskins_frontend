import Common from '@/components/Common'
import ModalTimeFilter from '@/components/Modal/ModalTimeFilter/ModalTimeFilter'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Estatísticas - RentSkins',
  description: `Rentskins é a melhor plataforma para comprar, vender e alugar skins do CS:GO.
  Encontre skins raras e exclusivas para personalizar seu jogo.`,
}

export default function AdminStatisticsPage() {
  return (
    <div className="flex h-full w-full flex-col gap-8">
      <div className="-mb-4 flex items-center justify-between">
        <Common.Title size="2xl" bold={600} className="text-white">
          Estatísticas de Usuários
        </Common.Title>
        <ModalTimeFilter
          activator={
            <button className="rounded-lg bg-mesh-color-primary-1200 px-3 py-1 text-sm font-semibold">
              1 Mês
            </button>
          }
        />
      </div>

      {/* TOP */}
      <div className="flex h-2/3 w-full gap-8 overflow-hidden rounded-lg">
        <div className="flex w-7/12 flex-col gap-8 rounded-lg bg-mesh-color-neutral-700 p-4">
          <Common.Title bold={600} size="xl" className="text-white">
            Estatísticas de Conversão de Usuários
          </Common.Title>
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-mesh-color-primary-1200">
            <span className="text-5xl font-bold text-black">
              GRAPH PLACEHOLDER
            </span>
          </div>
        </div>
        <div className="flex w-5/12 rounded-lg bg-mesh-color-neutral-700 p-4 text-white">
          <div className="flex h-4/6 flex-col justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-md">Usuários online atualmente</span>
              <span className="text-4xl font-bold">23.021</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-md">Taxa de churn</span>
              <span className="text-4xl font-bold">12%</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-md">Número de usuários vendendo</span>
              <span className="text-4xl font-bold">81.842</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-md">Número de usuários comprando</span>
              <span className="text-4xl font-bold">452.923</span>
            </div>
          </div>
        </div>
      </div>
      {/* BOTTOM */}
      <div className="flex h-1/3 w-full flex-col justify-between gap-2 overflow-hidden rounded-lg bg-mesh-color-neutral-700 p-4 text-white">
        <Common.Title bold={600} size="xl">
          Número Médio de Transações por Usuário
        </Common.Title>
        <span className="text-5xl font-bold">R$ 24.000,00</span>
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-mesh-color-primary-1200">
          <span className="text-5xl font-bold text-black">
            GRAPH PLACEHOLDER
          </span>
        </div>
      </div>
    </div>
  )
}
