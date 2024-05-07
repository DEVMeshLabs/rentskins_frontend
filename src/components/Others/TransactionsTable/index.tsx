import { ITransaction } from '@/services/interfaces/transactions.interface'
import ColorRarity, { TItemRarity } from '@/tools/colorRarity.tool'
import Image from 'next/image'

interface IProps {
  data: ITransaction[]
  steamid: string
}

export function TransactionsTable({ data, steamid }: IProps) {
  const treatStatus = (status: string) => {
    const generateElement = (className: string) => {
      return (
        <div className="text-sm 2xl:text-base">
          <span
            className={'rounded-full px-2 py-1 2xl:px-4 2xl:py-2 ' + className}
          >
            {status}
          </span>
        </div>
      )
    }

    switch (status) {
      case 'Concluído':
        return generateElement(
          'bg-mesh-color-rarity-high/10 text-mesh-color-rarity-high',
        )
      case 'Em andamento':
        return generateElement(
          'bg-mesh-color-rarity-medium/10 text-mesh-color-rarity-medium',
        )
      case 'Em análise':
        return generateElement('bg-purple-400/10 text-purple-400')
      case 'Falhou':
        return generateElement(
          'bg-mesh-color-rarity-low/10 text-mesh-color-rarity-low',
        )
    }
  }

  return data.length > 0 ? (
    <div className="max-h-[40rem] min-h-[10rem] scroll-p-24 overflow-y-auto overflow-x-hidden">
      {data.map((item, index) => (
        <div
          key={index}
          className={
            'grid max-h-[8rem] grid-cols-6 items-center py-4 first:rounded-t-md last:rounded-b-md odd:bg-mesh-color-neutral-800 even:bg-mesh-color-neutral-900'
          }
        >
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-between overflow-hidden rounded-md border border-mesh-color-neutral-500 bg-mesh-gradient-black-pattern px-2">
              <div
                className="mb-1 h-1.5 w-5/6 rounded-b-2xl bg-green-500"
                style={{
                  backgroundColor: `#${ColorRarity.transform(
                    item.skin.skin_rarity as TItemRarity,
                  )}`,
                }}
              />
              <Image
                src={`https://steamcommunity-a.akamaihd.net/economy/image/${item.skin.skin_image}`}
                width={112}
                height={64}
                alt="Image"
                draggable={false}
                className="w-20 2xl:w-28"
              />
            </div>
          </div>
          <div className="mr-4 flex flex-col justify-between gap-1 text-ellipsis text-start">
            <span
              className={`overflow-hidden text-ellipsis text-sm font-medium
              2xl:text-base ${
                item.skin.skin_name.includes('StatTrak')
                  ? 'text-mesh-color-secondary-800'
                  : 'text-white'
              } `}
            >
              {item.skin.skin_name.split('(')[0]}
            </span>
            <span className="text-xs text-mesh-color-neutral-300 2xl:text-sm">
              {item.skin.skin_weapon}
            </span>
          </div>
          <div className="flex w-fit flex-col gap-1 text-start">
            <span className="text-sm font-medium text-white 2xl:text-base">
              {item.skin.status_float}
            </span>
            <span className="text-xs text-mesh-color-neutral-300 2xl:text-sm">
              {item.skin.skin_float}
            </span>
          </div>
          {treatStatus(item.status)}
          <div className="text-sm text-white 2xl:text-base">
            {item.skin.skin_price.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2,
            })}
          </div>
          <div className="text-sm text-white 2xl:text-base">
            {item.buyer_id === steamid ? 'Compra' : 'Venda'}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <span className="h-full w-full rounded-md py-3 text-center text-lg text-mesh-color-neutral-400">
      Histórico de transações vazio.
    </span>
  )
}
