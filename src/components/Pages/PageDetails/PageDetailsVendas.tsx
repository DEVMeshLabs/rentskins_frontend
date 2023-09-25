import Common from '@/components/Common'
import { IconArrow } from '@/components/Icons'
import { ILatestSales } from '@/interfaces/user.interface'
import moment from 'moment'

interface IProps {
  latestSales: ILatestSales[] | undefined
}

export function PageDetailsVendas({ latestSales }: IProps) {
  return (
    <div className="min-h-[484px] rounded-lg border-2 border-mesh-color-others-black-olive">
      <div className="h-full p-4">
        <Common.Title color="white" className="text-[28px] font-bold">
          Últimas Vendas
        </Common.Title>
        <div className="flex h-[90%] flex-col justify-between">
          <div className="mt-4 space-y-6">
            {latestSales && latestSales.length > 0 ? (
              latestSales.map(({ saleAt, value }, idx) => {
                const refactorDate = moment(saleAt).format(
                  'DD MMM YYYY • HH:mm[H]',
                )
                return (
                  <div
                    key={`${saleAt}-${idx}`}
                    className="flex justify-between border-b border-mesh-color-others-black-olive pb-2"
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
              })
            ) : (
              <Common.Title className="text-base font-normal text-white">
                Nenhuma venda realizada
              </Common.Title>
            )}
          </div>
          <div className="mt-8 flex items-center justify-end space-x-4">
            <Common.Button className="flex border-none text-end">
              <IconArrow />
            </Common.Button>
            <Common.Button className="flex rotate-180 items-end border-none text-end">
              <IconArrow />
            </Common.Button>
          </div>
        </div>
      </div>
    </div>
  )
}
