import Common from '@/components/Common'
import { IconArrow } from '@/components/Icons'

export function PageDetailsVendas() {
  return (
    <div className="mt-8 min-h-[484px] rounded-lg border-2 border-mesh-color-others-black-olive">
      <div className="p-4">
        <Common.Title color="white" className="text-[28px] font-bold">
          Últimas vendas
        </Common.Title>
        <div className="mt-4 space-y-6">
          <div className="flex justify-between border-b border-mesh-color-others-black-olive pb-2">
            <Common.Title className="text-mesh-color-neutral-0">
              30 Jun 2021 • 4:30H
            </Common.Title>
            <span className="text-mesh-color-primary-1400">R$840</span>
          </div>

          <div className="flex justify-between border-b border-mesh-color-others-black-olive pb-2">
            <Common.Title className="text-mesh-color-neutral-0">
              29 Jun 2021 • 23:21H
            </Common.Title>
            <span className="text-mesh-color-primary-1400">R$832,21</span>
          </div>

          <div className="flex justify-between border-b border-mesh-color-others-black-olive pb-2">
            <Common.Title className="text-mesh-color-neutral-0">
              29 Jun 2021 • 23:21H
            </Common.Title>
            <span className="text-mesh-color-primary-1400">R$832,21</span>
          </div>

          <div className="flex justify-between border-b border-mesh-color-others-black-olive pb-2">
            <Common.Title className="text-mesh-color-neutral-0">
              27 Jun 2021 • 9:59H
            </Common.Title>
            <span className="text-mesh-color-primary-1400">R$792</span>
          </div>

          <div className="flex justify-between border-b border-mesh-color-others-black-olive pb-2">
            <Common.Title className="text-mesh-color-neutral-0">
              27 Jun 2021 • 9:59H
            </Common.Title>
            <span className="text-mesh-color-primary-1400">R$792</span>
          </div>

          <div className="flex justify-between border-b border-mesh-color-others-black-olive pb-2">
            <Common.Title className="text-mesh-color-neutral-0">
              27 Jun 2021 • 9:59H
            </Common.Title>
            <span className="text-mesh-color-primary-1400">R$792</span>
          </div>
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
  )
}
