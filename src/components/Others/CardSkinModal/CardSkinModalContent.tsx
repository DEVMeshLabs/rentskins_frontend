/* eslint-disable camelcase */
import Common from '@/components/Common'
import classNames from 'classnames'
import Image from 'next/image'

interface Props {
  skinName: string
  skinImage: string
  statusFloat: string
  skinFloat: string
  skinWeapon: string
  skinColor: string
}

export function CardSkinModalContent({
  skinName,
  statusFloat,
  skinFloat,
  skinWeapon,
  skinImage,
  skinColor,
}: Props) {
  const customName = skinName.includes('StatTrak™')
    ? skinName.split('™')
    : skinName
  return (
    <div className="flex items-center justify-between rounded-t-xl bg-mesh-color-neutral-800 pb-4 pl-4 pt-4">
      <div className="flex gap-3">
        <div
          className={classNames(
            'flex select-none flex-col items-center justify-center rounded-lg border-2 border-mesh-color-neutral-400 bg-mesh-gradient-black-pattern px-3 transition-all hover:brightness-150',
            {
              'border-mesh-color-secondary-1400 shadow-stattrak-glow':
                typeof customName === 'object',
            },
          )}
        >
          <div
            className={`h-1 w-4/5 rounded-b-full`}
            style={{ backgroundColor: `#${skinColor}` }}
          />
          <Image
            src={
              'https://steamcommunity-a.akamaihd.net/economy/image/' + skinImage
            }
            width={155}
            height={112}
            alt={skinName}
          />
        </div>
        <div className="flex flex-col justify-center">
          <Common.Title
            size="xl"
            color="white"
            bold={600}
            className="font-medium"
          >
            {skinName}
          </Common.Title>
          <Common.Subtitle
            size="lg"
            bold={600}
            className="text-mesh-color-neutral-200"
            label={skinWeapon}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center px-3 text-right">
        <Common.Title
          size="2xl"
          color="white"
          bold={600}
          className="font-medium"
        >
          {statusFloat}
        </Common.Title>
        <p className="text-sm font-medium text-white">
          {skinFloat !== '' && 'FT / '}
          <span className="text-[13px] font-semibold text-mesh-color-neutral-200">
            {skinFloat}
          </span>
        </p>
      </div>
    </div>
  )
}
