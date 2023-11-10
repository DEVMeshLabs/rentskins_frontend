import { IconSteam } from '@/components/Icons'
import { IconOlho } from '@/components/Icons/IconOlho'
import ColoredLine from '@/components/Others/ColoredLine'
import StickerHoverCard from '@/components/Others/StickerHoverCard'
import { ISkins } from '@/interfaces/ISkins'
import ColorRarity from '@/tools/colorRarity.tool'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

type PropsType = {
  item: ISkins
}

export function PageDetailsCard({ item }: PropsType) {
  const thereIsFloat = !(
    item.skin_category === 'Graffiti' ||
    item.skin_category === 'Container' ||
    item.skin_category === 'Sticker' ||
    item.skin_category === 'Collectible'
  )

  const stickersElement =
    item?.stickers.length > 0 &&
    item?.stickers.map((sticker, index: number) => (
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
    <div className="relative">
      {item.deletedAt !== null && (
        <div className="absolute left-1/2 top-1/2 z-10 w-fit -translate-x-1/2 -translate-y-1/2 transform text-center text-6xl font-semibold text-mesh-color-rarity-lowest">
          ITEM REMOVIDO
        </div>
      )}
      <div
        className={classNames(
          'h-full min-h-[560px] w-auto rounded-lg bg-mesh-image-details bg-cover bg-no-repeat',
          {
            'opacity-30': item.deletedAt !== null,
          },
        )}
      >
        <div
          style={{
            borderColor: `#${ColorRarity.transform(item.skin_rarity)}`,
          }}
          className="flex h-full w-full flex-col justify-between gap-8 rounded-t-lg border-t-4 bg-opacity-20 bg-mesh-image-details-pattern-2 bg-[length:50%] bg-center bg-no-repeat"
        >
          {item.deletedAt === null && (
            <div className="flex select-none space-x-2 p-2">
              <Link
                href={item.skin_link_steam}
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex h-8 w-fit items-center gap-2 rounded-lg border border-neutral-600 fill-white p-2 text-white opacity-50 transition-all first-line:border-neutral-600  hover:opacity-100">
                  <IconSteam />
                  Visualizar no Mercado da Steam
                </div>
              </Link>

              <Link target="_blank" href={item.skin_link_game} rel="noreferrer">
                <div className="flex h-8 w-fit items-center gap-2 rounded-lg border border-neutral-600 fill-white p-2 text-white opacity-50 transition-all hover:opacity-100">
                  <IconOlho />
                  Inspecionar no Jogo
                </div>
              </Link>
            </div>
          )}

          <div>
            <Image
              src={`https://steamcommunity-a.akamaihd.net/economy/image/${item.skin_image}`}
              alt={item.skin_name}
              width={510}
              height={380}
              quality={100}
              className="m-auto object-cover"
              draggable={false}
            />
            <div className="absolute bottom-2 flex w-full justify-center">
              {stickersElement}
            </div>
          </div>

          {thereIsFloat && (
            <div className="w-full ">
              {item.skin_float && <ColoredLine position={item.skin_float} />}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
