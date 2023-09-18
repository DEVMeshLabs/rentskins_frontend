/* eslint-disable camelcase */
import classNames from 'classnames'
import Image from 'next/image'

type Props = {
  name_color: string
  icon_url: string
  primeiroName: string
}

export function CardSkinImage({ name_color, icon_url, primeiroName }: Props) {
  const customName = primeiroName.includes('StatTrak™')
    ? primeiroName.split('™')
    : primeiroName

  return (
    <div
      className={classNames(
        'relative mb-4 flex flex-col items-center justify-center rounded-lg border-[1px] border-[#5E675E] bg-mesh-gradient-black-pattern',
        {
          'border-mesh-color-secondary-1400 shadow-stattrak-glow':
            typeof customName === 'object',
        },
      )}
    >
      <div
        className="h-1 w-[80%] rounded-b"
        style={{ background: `#${name_color}` }}
      />
      <Image
        src={`https://steamcommunity-a.akamaihd.net/economy/image/${icon_url}`}
        alt={`${primeiroName}`}
        width={140}
        height={100}
        className="max-h-[100px] max-w-[140px]"
      />
    </div>
  )
}
