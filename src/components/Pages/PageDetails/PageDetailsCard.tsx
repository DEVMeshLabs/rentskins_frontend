import { IconSteam } from '@/components/Icons'
import { IconOlho } from '@/components/Icons/IconOlho'
import ColoredLine from '@/components/Others/ColoredLine'
import ColorRarity, { TItemRarity } from '@/tools/colorRarity.tool'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

type PropsType = {
  skinImage: string
  skinName: string
  skinCategory: string
  skinLinkGame: string
  skinLinkSteam: string
  skinRarity: string
  skinFloat: number
  deletedAt: string | null
}

export function PageDetailsCard({
  skinImage,
  skinName,
  skinLinkGame,
  skinLinkSteam,
  skinRarity,
  skinFloat,
  skinCategory,
  deletedAt,
}: PropsType) {
  const thereIsFloat = !(
    skinCategory === 'Graffiti' ||
    skinCategory === 'Container' ||
    skinCategory === 'Sticker' ||
    skinCategory === 'Collectible'
  )

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
        <div
          style={{
            borderColor: `#${ColorRarity.transform(skinRarity as TItemRarity)}`,
          }}
          className="flex h-full w-full flex-col justify-between gap-8 rounded-t-lg border-t-4 bg-opacity-20 bg-mesh-image-details-pattern-2 bg-[length:50%] bg-center bg-no-repeat"
        >
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
            className="m-auto object-cover"
            draggable={false}
          />

          {thereIsFloat && (
            <div className="w-full ">
              {skinFloat && <ColoredLine position={skinFloat} />}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
