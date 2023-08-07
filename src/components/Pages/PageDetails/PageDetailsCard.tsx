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
    <div className="relative min-h-[560px] w-auto rounded-lg bg-mesh-image-details bg-cover bg-no-repeat">
      <div className="absolute bottom-0 w-full">
        <ColoredLine position={skinFloat} />
      </div>
      <div className="flex space-x-4 p-2">
        <div className="flex h-8 w-[300px] items-center gap-2 rounded-lg border border-neutral-600 fill-white p-2 text-white opacity-50  first-line:border-neutral-600">
          <IconSteam />
          <Link href={skinLinkGame}>Visualizar no mercado da Steam</Link>
        </div>

        <div className="flex h-8 w-[200px] items-center gap-2 rounded-lg border border-neutral-600 fill-white p-2 text-white opacity-50">
          <IconOlho />
          <Link target="_blank" href={skinLinkSteam}>
            Inspecionar no jogo
          </Link>
        </div>
      </div>

      <Image
        src={skinImage}
        alt={skinName}
        width={510}
        height={380}
        className="mx-auto my-auto object-cover"
        draggable={false}
      />
    </div>
  )
}
