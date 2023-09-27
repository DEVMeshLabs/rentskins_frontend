import { LayoutLoading } from '@/components/Layout/LayoutLoading'
import TransactionCard from '@/components/Others/TransactionCard'
import { TransactionsTable } from '@/components/Others/TransactionsTable'
import TransactionsService from '@/services/transactions.service'
import { useQuery } from '@tanstack/react-query'
// import TransactionsTable from '../Settings/Transactions/table'

interface IProps {
  steamid: string
}
export default function PageNotificationTransaction({ steamid }: IProps) {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['Transactions', steamid],
    queryFn: () => TransactionsService.getUserTransactions(steamid),
    enabled: !!steamid,
  })

  const renderTransactions = transactions?.data?.map((item, index) => {
    if (item.status === 'Em andamento') {
      return (
        <>
          <TransactionCard.Root key={'transactions-' + index}>
            <div className="flex items-center gap-4">
              <TransactionCard.Image
                image={`https://steamcommunity-a.akamaihd.net/economy/image/${item.skin.skin_image}`}
                alt={item.skin.skin_name}
              />
              <TransactionCard.Label
                name={item.skin.skin_name}
                weapon={item.skin.skin_weapon}
              />
            </div>
            <TransactionCard.Content
              text={item.skin.status_float}
              subtext={item.skin.skin_float}
              textIsCurrency={false}
            />
            <TransactionCard.Content
              text={item.skin.skin_price}
              textIsCurrency
              subtext={item.buyer_id === steamid ? 'Compra' : 'Venda'}
            />
            <TransactionCard.Actions>
              <TransactionCard.Button
                modal
                modalOptions={{ action: 'accept', id: index + 1 }}
                buttonStyle="full"
                text={
                  item.buyer_id === steamid ? 'Item Obtido' : 'Item Enviado'
                }
              />
              <TransactionCard.Button
                modal
                modalOptions={{ action: 'decline', id: index + 1 }}
                buttonStyle="opaque"
                text={item.buyer_id === steamid ? 'Não Obtido' : 'Não Enviado'}
              />
            </TransactionCard.Actions>
          </TransactionCard.Root>
        </>
      )
    }
    return null
  })

  return (
    <div>
      <div className="mb-12 mt-4 pr-4">
        <span className="text-lg font-medium text-mesh-color-neutral-200">
          Pendentes
        </span>
        <div className="mt-4 flex max-h-[24rem] w-full scroll-p-24 flex-col gap-4 overflow-y-scroll pr-2">
          {!isLoading ? (
            renderTransactions
          ) : (
            <TransactionCard.Skeleton quantity={3} />
          )}
        </div>
      </div>
      <div className="my-14 h-1 w-full rounded-full bg-mesh-color-others-black-olive" />
      <div>
        <div className="grid grid-cols-6 rounded-lg bg-mesh-color-neutral-800 py-2 text-lg font-medium text-mesh-color-neutral-100">
          <span className="text-center">Item</span>
          <span className="text-left">Descrição</span>
          <span className="text-left">Características</span>
          <span className="text-center">Status</span>
          <span className="text-center">Preço</span>
          <span className="text-center">Tipo</span>
        </div>
        <div className="mb-16 mt-4 w-full rounded-md text-center">
          {!isLoading ? (
            <TransactionsTable data={transactions?.data!} steamid={steamid} />
          ) : (
            <div className="h-full w-full bg-mesh-color-neutral-800 py-8">
              <LayoutLoading enabled label="Carregando...">
                {null}
              </LayoutLoading>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
