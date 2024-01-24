/* eslint-disable camelcase */
import HoverCardSticker from '@/components/HoverCard/StickerHoverCard'
import ColoredLine from '@/components/Others/ColoredLine'
import Image from 'next/image'

type Props = {
  icon_url: string
  weapon: string
  float: string | number
  isRentable: boolean
  type: string
  stickers: Array<{ url: string; name: string }>
  stickersValue: Array<string>
  stickersLoading: boolean
}

export function ModalSkinShowcaseSkin({
  icon_url,
  weapon,
  float,
  isRentable,
  stickers,
  type,
  stickersValue,
  stickersLoading,
}: Props) {
  const stickersElement =
    stickers?.length > 0 &&
    stickers?.map((sticker, index: number) => (
      <>
        <HoverCardSticker
          name={sticker.name}
          type={type}
          value={
            stickersValue?.length > 0 && stickersValue[index] !== null
              ? stickersValue[index]
              : 'Indisponível no momento.'
          }
          isValueLoading={stickersLoading}
        >
          <Image
            src={sticker.url}
            alt={sticker.name}
            key={'sticker' + index}
            width={120}
            draggable={false}
            height={120}
          />
        </HoverCardSticker>
      </>
    ))

  return (
    <div className="relative mr-6 mt-2 flex h-[80%] w-[60%] select-none items-center justify-center rounded-t-lg bg-mesh-image-details bg-cover bg-no-repeat 2xl:h-full">
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
