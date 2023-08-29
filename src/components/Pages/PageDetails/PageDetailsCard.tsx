import { IconSteam } from '@/components/Icons'
import { IconOlho } from '@/components/Icons/IconOlho'
import ColoredLine from '@/components/Others/ColoredLine'
import Image from 'next/image'
import Link from 'next/link'

type PropsType = {
  skinImage: string
  skinName: string
  skinLinkGame: string
  skinLinkSteam: string
  skinFloat: number
}

export function PageDetailsCard({
  skinImage,
  skinName,
  skinLinkGame,
  skinLinkSteam,
  skinFloat,
}: PropsType) {
  return (
    <div className="h-full max-h-[560px] min-h-[560px] w-auto rounded-lg bg-mesh-image-details bg-cover bg-no-repeat">
      <div className="flex h-full w-full flex-col justify-between gap-8 bg-green-500">
        <div className="flex space-x-4 bg-blue-500 p-2">
          <div className="flex h-8 w-[300px] items-center gap-2 rounded-lg border border-neutral-600 fill-white p-2 text-white opacity-50  first-line:border-neutral-600">
            <IconSteam />
            <Link href={skinLinkSteam}>Visualizar no mercado da Steam</Link>
          </div>

          <div className="flex h-8 w-[200px] items-center gap-2 rounded-lg border border-neutral-600 fill-white p-2 text-white opacity-50">
            <IconOlho />
            <Link target="_blank" href={skinLinkGame}>
              Inspecionar no jogo
            </Link>
          </div>
        </div>

        <Image
          src={`https://steamcommunity-a.akamaihd.net/economy/image/${skinImage}`}
          alt={skinName}
          width={510}
          height={380}
          className="mx-auto my-auto h-full w-fit bg-red-500 object-cover"
          draggable={false}
        />

        <div className="w-full ">
          <ColoredLine position={skinFloat} />
        </div>
      </div>
    </div>
  )
}
