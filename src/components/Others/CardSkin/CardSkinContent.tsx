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
            {market_name.length <= 45
              ? market_name
              : market_name.slice(0, 40) + '...'}
          </Common.Title>
        </div>
        <span className="text-xs font-medium text-mesh-color-neutral-200">
          {primeiroName}
        </span>
      </div>
    </>
  )
}
