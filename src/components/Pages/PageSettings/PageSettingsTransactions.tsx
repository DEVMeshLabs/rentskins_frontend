import { transactionsMock } from '@/Mock/notification.transaction.mock'
import Common from '@/components/Common'
import { TransactionsTable } from '@/components/Others/TransactionsTable'

export function PageSettingsTransactions() {
  return (
    <div className="flex w-2/3 flex-col gap-8 overflow-hidden">
      <div className="flex h-4/6 flex-col gap-10 rounded-2xl bg-mesh-color-neutral-800 py-6">
        <Common.Title bold={700} size={'2xl'} color="white" className="px-4">
          Transações
        </Common.Title>

        <div className="h-full">
          <div className="mr-2 grid grid-cols-6 rounded-lg bg-mesh-color-neutral-800 py-2 text-lg font-medium text-mesh-color-neutral-100">
            <span className="text-center">Item</span>
            <span className="text-left">Descrição</span>
            <span className="text-left">Características</span>
            <span className="text-center">Status</span>
            <span className="text-center">Preço</span>
            <span className="text-center">Tipo</span>
          </div>
          <div className="h-full w-full overflow-y-auto rounded-b-2xl bg-mesh-color-neutral-800 text-center">
            {<TransactionsTable data={transactionsMock.finished} />}
          </div>
        </div>
      </div>
    </div>
  )
}
