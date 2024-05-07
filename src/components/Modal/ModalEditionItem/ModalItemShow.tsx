/* eslint-disable camelcase */
import ColoredLine from '@/components/Others/ColoredLine'
import Image from 'next/image'

type Props = {
  icon_url: string
  weapon: string
  float: string
  floatLine: boolean
}

export function ModalItemShow({ icon_url, weapon, float, floatLine }: Props) {
  return (
    <div className="relative mr-6 mt-2 flex h-full w-[60%] select-none items-center justify-center rounded-lg bg-mesh-image-details bg-cover bg-no-repeat">
      <Image
        src={`https://steamcommunity-a.akamaihd.net/economy/image/${icon_url}`}
        alt={weapon}
        width={481}
        height={284}
        draggable={false}
        className="object-cover"
      />
      {floatLine && (
        <div className="absolute -bottom-2 w-full">
          <ColoredLine position={float} />
        </div>
      )}
    </div>
  )
}
