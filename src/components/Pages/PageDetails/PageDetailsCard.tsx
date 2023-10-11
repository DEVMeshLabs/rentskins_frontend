import { IconSteam } from '@/components/Icons'
import { IconOlho } from '@/components/Icons/IconOlho'
import ColoredLine from '@/components/Others/ColoredLine'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

type PropsType = {
  skinImage: string
  skinName: string
  skinLinkGame: string
  skinLinkSteam: string
  skinFloat: number
  deletedAt: string | null
}

export function PageDetailsCard({
  skinImage,
  skinName,
  skinLinkGame,
  skinLinkSteam,
  skinFloat,
  deletedAt,
}: PropsType) {
  return (
    <div className="relative">
      {deletedAt !== null && (
        <div className="absolute left-1/2 top-1/2 z-10 w-fit -translate-x-1/2 -translate-y-1/2 transform text-center text-6xl font-semibold text-mesh-color-rarity-lowest">
          ITEM REMOVIDO
        </div>
      )}
      <div
        className={classNames(
          'h-full min-h-[560px] w-auto rounded-lg bg-mesh-image-details bg-cover bg-no-repeat',
          {
            'opacity-30': deletedAt !== null,
          },
        )}
      >
        <div className="flex h-full w-full flex-col justify-between gap-8">
          {deletedAt === null && (
            <div className="flex select-none space-x-2 p-2">
              <Link href={skinLinkSteam} target="_blank" rel="noreferrer">
                <div className="flex h-8 w-fit items-center gap-2 rounded-lg border border-neutral-600 fill-white p-2 text-white opacity-50 transition-all first-line:border-neutral-600  hover:opacity-100">
                  <IconSteam />
                  Visualizar no Mercado da Steam
                </div>
              </Link>

              <Link target="_blank" href={skinLinkGame} rel="noreferrer">
                <div className="flex h-8 w-fit items-center gap-2 rounded-lg border border-neutral-600 fill-white p-2 text-white opacity-50 transition-all hover:opacity-100">
                  <IconOlho />
                  Inspecionar no Jogo
                </div>
              </Link>
            </div>
          )}

          <Image
            src={`https://steamcommunity-a.akamaihd.net/economy/image/${skinImage}`}
            alt={skinName}
            width={510}
            height={380}
            quality={100}
            className="mx-auto my-auto h-full w-fit object-cover"
            draggable={false}
          />

          <div className="w-full ">
            {skinFloat && <ColoredLine position={skinFloat} />}
          </div>
        </div>
      </div>
    </div>
  )
}
