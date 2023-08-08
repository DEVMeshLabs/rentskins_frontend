import Common from '@/components/Common'

export default function AdminFinancialPage() {
  return (
    <div className="flex h-full w-full flex-col">
      <Common.Title bold={600} size="2xl" className="">
        Dados Financeiros
      </Common.Title>

      <div className="flex h-full w-full gap-8 bg-red-400">
        {/* LEFT SIDE */}
        <div className="flex w-9/12 flex-col">
          <div className="flex h-full w-full flex-col gap-8 overflow-hidden rounded-lg bg-purple-500">
            <div className="h-4/6 rounded-lg bg-purple-600 p-2">
              <Common.Title bold={600} size="lg">
                Faturamento Mensal
              </Common.Title>
            </div>
            <div className="h-2/6 rounded-lg bg-purple-600 p-2">
              <Common.Title bold={600} size="lg">
                Receita Total da Plataforma
              </Common.Title>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="grid h-full w-3/12 grid-rows-4 gap-8 overflow-hidden rounded-lg bg-purple-500">
          <div className="h-full w-full rounded-lg bg-purple-600"></div>
          <div className="h-full w-full rounded-lg bg-purple-600"></div>
          <div className="h-full w-full rounded-lg bg-purple-600"></div>
          <div className="h-full w-full rounded-lg bg-purple-600"></div>
        </div>
      </div>
    </div>
  )
}
