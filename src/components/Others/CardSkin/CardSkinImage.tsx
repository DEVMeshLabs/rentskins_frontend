/* eslint-disable camelcase */
import ColorRarity, { TItemRarity } from '@/tools/colorRarity.tool'
import Image from 'next/image'

type Props = {
  rarity: string
  icon_url: string
  primeiroName: string
  stickers: Array<{ url: string; name: string }>
}

export function CardSkinImage({
  rarity,
  icon_url,
  primeiroName,
  stickers,
}: Props) {
  const stickersElement =
    stickers.length > 0 &&
    stickers.map((sticker, index: number) => (
      <>
        <Image
          src={sticker.url}
          alt={sticker.name}
          key={'sticker' + index}
          width={30}
          height={30}
          draggable={false}
        />
      </>
    ))

  return (
    <div className="relative mb-4 flex flex-col items-center justify-center rounded-lg border-[1px] border-[#5E675E] bg-mesh-gradient-black-pattern">
      <div
        className="h-1 w-[80%] rounded-b"
        style={{
          background: `#${ColorRarity.transform(rarity as TItemRarity)}`,
        }}
      />
      <Image
        src={`https://steamcommunity-a.akamaihd.net/economy/image/${icon_url}`}
        alt={`${primeiroName}`}
        width={140}
        height={100}
        className="max-h-[100px] max-w-[140px]"
      />

      <div className="absolute bottom-1 flex justify-center">
        {stickersElement}
      </div>
    </div>
  )
}
