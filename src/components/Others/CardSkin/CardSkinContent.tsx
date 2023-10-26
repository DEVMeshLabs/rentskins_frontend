/* eslint-disable camelcase */
import Common from '@/components/Common'

type Props = {
  market_name: string
  primeiroName: string
  float: string
}

export function CardSkinContent({ market_name, primeiroName, float }: Props) {
  const customName = market_name.includes('StatTrak™')
    ? market_name.split('™')
    : market_name

  return (
    <div className="flex h-[50%] flex-col justify-between">
      <div className="flex h-full flex-col">
        <div className={`h-10 overflow-hidden text-ellipsis text-start`}>
          <Common.Title
            bold={600}
            size="sm"
            className="flex w-fit flex-col items-start justify-start text-start align-baseline"
          >
            {typeof customName === 'object' ? (
              <h1>
                <span className="text-mesh-color-secondary-1200">
                  {customName[0]}
                </span>
                {customName[1]}
              </h1>
            ) : (
              customName
            )}
          </Common.Title>
        </div>
        <span className="mt-2 text-xs font-medium text-mesh-color-neutral-200">
          {primeiroName}
        </span>
      </div>
      <p className={`my-2 text-sm font-medium`}>
        {float !== '' && 'FT / '}
        <span className="text-[13px] font-semibold text-mesh-color-neutral-200">
          {float}
        </span>
      </p>
    </div>
  )
}
