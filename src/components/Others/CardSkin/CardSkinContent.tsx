/* eslint-disable camelcase */
import Common from '@/components/Common'

type Props = {
  market_name: string
  primeiroName: string
  float: string
}

export function CardSkinContent({ market_name, primeiroName, float }: Props) {
  return (
    <>
      <div>
        <div className="h-10 text-start">
          <Common.Title
            bold={600}
            size="sm"
            className="flex w-fit flex-col items-start justify-start text-start align-baseline"
          >
            {market_name}
          </Common.Title>
        </div>
        <span className="text-xs font-medium text-mesh-color-neutral-200">
          {primeiroName}
        </span>
      </div>
      <p className="my-4 text-sm font-medium">
        {float !== '' && 'FT / '}
        <span className="text-[13px] font-semibold text-mesh-color-neutral-200">
          {float}
        </span>
      </p>
    </>
  )
}
