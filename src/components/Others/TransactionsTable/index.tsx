import { ITransaction } from '@/services/interfaces/transactions.interface'
import Image from 'next/image'

interface IProps {
  data: ITransaction[]
  steamid: string
}

export function TransactionsTable({ data, steamid }: IProps) {
  const treatStatus = (status: string) => {
    const generateElement = (className: string) => {
      return (
        <div>
          <span className={'rounded-full px-4 py-2 ' + className}>
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
            'grid grid-cols-6 items-center py-4 first:rounded-t-md last:rounded-b-md odd:bg-mesh-color-neutral-800 even:bg-mesh-color-neutral-900'
          }
        >
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-between overflow-hidden rounded-md border border-mesh-color-neutral-500 bg-mesh-gradient-black-pattern px-2">
              <div className="mb-1 h-1.5 w-5/6 rounded-b-2xl bg-green-500" />
              <Image
                src={`https://steamcommunity-a.akamaihd.net/economy/image/${item.skin.skin_image}`}
                width={112}
                height={64}
                alt="Image"
                draggable={false}
                className="w-28"
              />
            </div>
          </div>
          <div className="group text-start">
            <div
              className="invisible relative -left-8 -top-8 z-20 -mb-[5.5rem] w-fit flex-wrap whitespace-nowrap
           px-8 py-8 opacity-0
          transition-all group-hover:visible group-hover:opacity-100"
            >
              <p className="shadow-md rounded-lg bg-mesh-color-neutral-300 px-2 text-sm">
                {item.skin.skin_name}
              </p>
            </div>
            <p
              className={`group h-[80px] w-40 overflow-hidden text-ellipsis text-lg
          font-medium ${
            item.skin.skin_name.includes('StatTrak')
              ? 'text-mesh-color-secondary-800'
              : 'text-white'
          } `}
            >
              {item.skin.skin_name}
            </p>
            <p className="text-mesh-color-neutral-300 ">
              {' '}
              {item.skin.skin_weapon}{' '}
            </p>
          </div>
          <div className="w-48 text-start">
            <p className="text-lg font-medium text-white">
              {item.skin.status_float}
            </p>
            <p className="text-mesh-color-neutral-300">
              {item.skin.skin_float}
            </p>
          </div>
          {treatStatus(item.status)}
          <div className="text-white">
            {item.skin.skin_price.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2,
            })}
          </div>
          <div className="text-white">
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
