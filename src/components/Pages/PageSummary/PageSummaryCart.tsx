import Common from '@/components/Common'
import LineInfosSummaryh from '@/components/Others/SummaryItem'
import { PageSummaryInfo } from './PageSummaryInfo'

export function PageSummaryCart() {
  return (
    <aside className="sticky top-6 flex w-[378px] flex-col gap-28 rounded-xl bg-[#222723] px-4 py-6">
      <div className="flex flex-col gap-9">
        <Common.Title color="white" size="3xl" bold={600}>
          Resumo
        </Common.Title>
        <div className="flex flex-col gap-5">
          <PageSummaryInfo />
          <div className="flex w-full justify-between">
            <Common.Title color="white">Código promocional</Common.Title>
            <input
              type="text"
              className="w-40 rounded-lg bg-[#3C403C] py-2 text-center uppercase text-white outline-none"
              maxLength={7}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <LineInfosSummaryh
          title="Código promocional"
          value="2.645,75"
          size="lg"
        />
        <Common.Button
          className="w-full flex-1 text-base font-semibold"
          color="green"
        >
          Comprar agora
        </Common.Button>
      </div>
    </aside>
  )
}
