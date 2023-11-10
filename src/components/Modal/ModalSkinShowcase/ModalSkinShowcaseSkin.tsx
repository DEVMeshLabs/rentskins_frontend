/* eslint-disable camelcase */
import ColoredLine from '@/components/Others/ColoredLine'
import StickerHoverCard from '@/components/Others/StickerHoverCard'
import Image from 'next/image'

type Props = {
  icon_url: string
  weapon: string
  float: string
  isRentable: boolean
  stickers: Array<{ url: string; name: string }>
}

export function ModalSkinShowcaseSkin({
  icon_url,
  weapon,
  float,
  isRentable,
  stickers,
}: Props) {
  const stickersElement =
    stickers?.length > 0 &&
    stickers?.map((sticker, index: number) => (
      <>
        <StickerHoverCard name={sticker.name}>
          <Image
            src={sticker.url}
            alt={sticker.name}
            key={'sticker' + index}
            width={120}
            draggable={false}
            height={120}
          />
        </StickerHoverCard>
      </>
    ))

  return (
    <div className="relative mr-6 mt-2 flex h-full w-[60%] select-none items-center justify-center rounded-t-lg bg-mesh-image-details bg-cover bg-no-repeat">
      <Image
        src={`https://steamcommunity-a.akamaihd.net/economy/image/${icon_url}`}
        alt={weapon}
        width={481}
        height={284}
        draggable={false}
        className="object-cover"
      />
      <div className="absolute bottom-4 flex w-full justify-center gap-2">
        {stickersElement}
      </div>
      {isRentable && (
        <div className="absolute -bottom-1 w-full">
          <ColoredLine position={float} />
        </div>
      )}
    </div>
  )
}
