import { LayoutLoading } from '@/components/Layout/LayoutLoading'
import TransactionCard from '@/components/Others/TransactionCard'
import { TransactionsTable } from '@/components/Others/TransactionsTable'
import ConfigService from '@/services/config.service'
import TransactionsService from '@/services/transactions.service'
import useComponentStore from '@/stores/components.store'
import Toast from '@/tools/toast.tool'
import { useQuery } from '@tanstack/react-query'
// import TransactionsTable from '../Settings/Transactions/table'

interface IProps {
  steamid: string
  token: string
}
export default function PageNotificationTransaction({
  steamid,
  token,
}: IProps) {
  const { setRedirectToSteam } = useComponentStore()

  const { data: transactions, isLoading } = useQuery({
    queryKey: ['Transactions', steamid],
    queryFn: () => TransactionsService.getUserTransactions(steamid),
    enabled: !!steamid,
  })

  const renderTransactions = transactions?.data
    ?.filter((item, index) => {
      const isABuyer = item.buyer_id === steamid

      if (item.status === 'Em andamento') {
        if (isABuyer && item.buyer_confirm === 'Pendente') {
          return true
        }

        if (!isABuyer && item.seller_confirm === 'Pendente') {
          return true
        }
      }

      return false
    })
    .map(async (item, index) => {
      const isABuyer = item.buyer_id === steamid

      return (
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
            {isABuyer && (
              <TransactionCard.Button
                modal={false}
                token={token}
                onClick={async () => {
                  Toast.Loading(
                    'Redirecionando para a página de troca da Steam...',
                  )

                  const tradeLink = await ConfigService.findByConfigUserId(
                    item.buyer_id,
                    token,
                  )

                  if (tradeLink.status === 200) {
                    Object.assign(document.createElement('a'), {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      href: tradeLink.data.url_trade,
                    }).click()
                    setRedirectToSteam(false)
                  } else {
                    Toast.Error(
                      'Não foi possível acessar a página de troca da Steam no momento.',
                    )
                  }
                }}
                buttonStyle="full"
                text="Abrir Trade"
              />
            )}
            <TransactionCard.Button
              token={token}
              modal
              modalOptions={{
                action: 'Aceito',
                id: item.id,
                type: isABuyer ? 'buyer' : 'seller',
              }}
              buttonStyle="full"
              text={isABuyer ? 'Item Obtido' : 'Enviar Item'}
            />
            <TransactionCard.Button
              token={token}
              modal
              modalOptions={{
                action: 'Recusado',
                id: item.id,
                type: isABuyer ? 'buyer' : 'seller',
              }}
              buttonStyle="opaque"
              text={isABuyer ? 'Não Obtido' : 'Não Enviar'}
            />
          </TransactionCard.Actions>
        </TransactionCard.Root>
      )
    })

  return (
    <div>
      <div className="mb-12 mt-4 pr-4">
        <span className="text-lg font-medium text-mesh-color-neutral-200">
          Pendentes
        </span>
        <div className="mt-4 flex max-h-[24rem] w-full scroll-p-24 flex-col gap-4 overflow-y-scroll">
          {!isLoading ? (
            renderTransactions && renderTransactions?.length > 0 ? (
              renderTransactions
            ) : (
              <span className="rounded-md bg-mesh-color-neutral-800 py-3 text-center text-lg text-white">
                Sem transações pendentes no momento.
              </span>
            )
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
