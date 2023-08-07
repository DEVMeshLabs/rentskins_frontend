import Image, { StaticImageData } from 'next/image'

interface IData {
  image: StaticImageData
  name: string
  weapon: string
  condition: string
  float: number
  value: number
  status: string
  type: string
}

interface IProps {
  data: IData[]
}

export function TransactionsTable({ data }: IProps) {
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
    <div>
      {data.map((item, index) => (
        <div
          key={index}
          className={
            'grid grid-cols-6 items-center py-4 last:rounded-b-lg odd:bg-mesh-color-neutral-800 even:bg-mesh-color-neutral-900'
          }
        >
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-between overflow-hidden rounded-md border border-mesh-color-neutral-500 bg-mesh-gradient-black-pattern px-2">
              <div className="mb-1 h-1.5 w-5/6 rounded-b-2xl bg-green-500" />
              <Image
                src={item.image}
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
              <p className="rounded-lg bg-mesh-color-neutral-300 px-2 shadow-md">
                {item.name}
              </p>
            </div>
            <p
              className={`group w-40 overflow-hidden text-ellipsis text-lg
          font-medium ${
            item.name.includes('StatTrak')
              ? 'text-mesh-color-secondary-800'
              : 'text-white'
          } `}
            >
              {item.name}
            </p>
            <p className="text-mesh-color-neutral-300 "> {item.weapon} </p>
          </div>
          <div className="w-48 text-start">
            <p className="text-lg font-medium text-white">{item.condition}</p>
            <p className="text-mesh-color-neutral-300">{item.float}</p>
          </div>
          {treatStatus(item.status)}
          <div className="text-white">
            {item.value.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2,
            })}
          </div>
          <div className="text-white"> {item.type} </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex h-5/6 items-center justify-center text-mesh-color-neutral-400">
      Histórico de transações vazio.
    </div>
  )
}
