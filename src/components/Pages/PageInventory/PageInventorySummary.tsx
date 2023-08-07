import Common from '@/components/Common'

export function PageInventorySummary() {
  return (
    <div className="flex min-h-[400px] flex-col justify-between rounded-xl bg-mesh-color-others-eerie-black px-6 py-6">
      <div className="text-white">
        <Common.Title color="white" className="text-[28px] font-bold">
          Resumo
        </Common.Title>
        <div className="mt-5 flex justify-between ">
          <Common.Title>Itens selecionados</Common.Title>
          <span>0</span>
        </div>

        <div className="mt-5 flex justify-between ">
          <Common.Title>Subtotal</Common.Title>
          <span>R$0</span>
        </div>

        <div className="mt-5 flex justify-between ">
          <Common.Title>Taxa</Common.Title>
          <span>R$0</span>
        </div>
      </div>
      <div className="flex flex-col justify-between space-y-4 text-white">
        <div className="flex justify-between">
          <Common.Title>Total</Common.Title>
          <span>R$0</span>
        </div>
        <Common.Button className="h-[53px]">Vender</Common.Button>
      </div>
    </div>
  )
}
