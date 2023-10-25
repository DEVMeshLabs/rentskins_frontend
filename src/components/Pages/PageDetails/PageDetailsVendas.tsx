import Common from '@/components/Common'
import { IconArrow } from '@/components/Icons'
import { ILatestSales } from '@/interfaces/user.interface'
import moment from 'moment'
import { useState } from 'react'

interface IProps {
  latestSales: ILatestSales[] | undefined
}

export function PageDetailsVendas({ latestSales }: IProps) {
  const [lastSalePage, setLastSalePage] = useState(1)
  console.log(latestSales)
  const mock = [
    { saleAt: '2023-10-24T21:47:55.992Z', value: 1 },
    { saleAt: '2023-10-24T21:47:55.992Z', value: 2 },
    { saleAt: '2023-10-24T21:47:55.992Z', value: 3 },
    { saleAt: '2023-10-24T21:47:55.992Z', value: 4 },
    // { saleAt: '2023-10-24T21:47:55.992Z', value: 5 },
    // { saleAt: '2023-10-24T21:47:55.992Z', value: 6 },
  ]

  const changePage = (type: string) => {
    if (type === 'forward') {
      if (lastSalePage < Math.ceil(mock.length / 4)) {
        setLastSalePage((state: number) => state + 1)
      }
    } else {
      if (lastSalePage > 1) {
        setLastSalePage((state: number) => state - 1)
      }
    }
  }

  const renderLatestSales =
    latestSales && latestSales.length > 0 ? (
      mock.map(({ saleAt, value }, index) => {
        if (index < lastSalePage * 4 && index >= lastSalePage * 4 - 4) {
          const refactorDate = moment(saleAt).format('DD MMM YYYY • HH:mm')
          return (
            <div
              key={`${saleAt}-${index}`}
              className="flex justify-between border-b border-mesh-color-others-black-olive pb-1"
            >
              <Common.Title className="text-mesh-color-neutral-0">
                {refactorDate}
              </Common.Title>
              <span className="text-mesh-color-primary-1400">
                {value.toLocaleString('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          )
        }
        return null
      })
    ) : (
      <Common.Title className="text-base font-normal text-white">
        Nenhuma venda realizada
      </Common.Title>
    )

  return (
    <div className="h-full min-h-[340px] rounded-lg border-2 border-mesh-color-others-black-olive">
      <div className="h-full p-4">
        <Common.Title color="white" className="text-[28px] font-bold">
          Últimas Vendas
        </Common.Title>
        <div className="flex h-[90%] flex-col justify-between">
          <div className="mt-4 space-y-6">{renderLatestSales}</div>
          {mock.length > 4 && (
            <div className="mt-8 flex items-center justify-end space-x-4">
              <Common.Button
                className="flex border-none text-end"
                onClick={() => changePage('backward')}
              >
                <IconArrow />
              </Common.Button>
              <Common.Button
                className="flex rotate-180 items-end border-none text-end"
                onClick={() => changePage('forward')}
              >
                <IconArrow />
              </Common.Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
