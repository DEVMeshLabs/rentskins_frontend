/* eslint-disable camelcase */
import ColoredLine from '@/components/Others/ColoredLine'
import Image from 'next/image'

type Props = {
  icon_url: string
  weapon: string
  float: string
  isRentable: boolean
}

export function ModalSkinShowcaseSkin({
  icon_url,
  weapon,
  float,
  isRentable,
}: Props) {
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
      {isRentable && (
        <div className="absolute -bottom-1 w-full">
          <ColoredLine position={float} />
        </div>
      )}
    </div>
  )
}
