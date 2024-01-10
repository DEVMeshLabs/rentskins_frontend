import IconSteam from '@/assets/IconSteam'
import Common from '@/components/Common'
import IconMagic from '@/components/Icons/IconMagicpen'
import { IconOlho } from '@/components/Icons/IconOlho'
import { ModalEditionItemMain } from '@/components/Modal/ModalEditionItem/ModalEditionItemMain'
import { ModalRemoveItemMain } from '@/components/Modal/ModalRemoveItem/ModalRemoveItemMain'
import { ISkins } from '@/interfaces/ISkins'
import useModalStore from '@/stores/modal.store'
import ColorRarity from '@/tools/colorRarity.tool'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import ColoredLine from '../ColoredLine'

interface Props {
  itsRent?: boolean
  item: ISkins
  userItems?: boolean
}

export function OtherCard({ itsRent, item, userItems }: Props) {
  const customName = item.skin_name.includes('StatTrak™')
    ? item.skin_name.split('™')
    : item.skin_name
  const thereIsFloat = [
    'Sticker',
    'Container',
    'Collectible',
    'Patch',
    'Graffiti',
  ]

  const { setOpenModalReturnSkin, setSkinToReturn } = useModalStore()
  const detailsLink = '/detalhes/' + item.slug

  const stickersElement =
    item?.stickers?.length > 0 &&
    item?.stickers?.map((sticker, index: number) => (
      <>
        <Image
          src={sticker.url}
          alt={sticker.name}
          key={'sticker' + item.asset_id + index}
          width={50}
          height={50}
          draggable={false}
        />
      </>
    ))

  return (
    <article className="relative">
      {item.deletedAt !== null && (
        <div className="absolute left-1/2 top-1/4 z-10 -translate-x-1/2 -translate-y-1/2 transform text-center text-3xl font-semibold text-mesh-color-rarity-lowest">
          ITEM REMOVIDO
        </div>
      )}
      <div
        className={classNames(
          'flex w-72 flex-col gap-3 rounded-lg border-2 border-mesh-color-neutral-600 border-opacity-60 px-3 pb-4 pt-3 text-white',
        )}
      >
        <Link
          href={detailsLink}
          className="flex h-full max-h-[170px] min-h-[170px] w-full select-none flex-col items-center justify-between
          rounded-lg border-2 border-mesh-color-neutral-400
          bg-mesh-gradient-black-pattern transition-all hover:brightness-150"
        >
          <div>
            <div
              className={`top-0 h-2 w-52 rounded-b-full`}
              style={{
                backgroundColor: `#${ColorRarity.transform(item.skin_rarity)}`,
              }}
            />
            <Image
              className="m-auto p-2"
              src={`https://steamcommunity-a.akamaihd.net/economy/image/${item.skin_image}`}
              alt={item.skin_name}
              width={190}
              height={154}
              draggable={false}
            />
            <div className="relative top-5 -mt-[50px] flex justify-center">
              {stickersElement}
            </div>
          </div>
        </Link>

        <div className="flex h-11 flex-col gap-3">
          {typeof customName === 'object' ? (
            <h1>
              <span className="text-mesh-color-secondary-1200 ">
                {customName[0]}
              </span>
              {customName[1].split('(')[0]}
            </h1>
          ) : (
            customName.split('(')[0]
          )}
        </div>
        <div className="flex items-center justify-between">
          <h1 className="h-12 text-sm font-medium opacity-60">
            {item.skin_weapon}
          </h1>
          <div className="flex gap-2">
            {userItems && (
              <ModalEditionItemMain
                activator={
                  <Common.Button color="invisible">
                    <IconMagic />
                  </Common.Button>
                }
                item={item}
              />
            )}
            <Link
              target="_blank"
              rel="noreferrer"
              href={item.skin_link_steam}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-mesh-color-neutral-400 bg-transparent 
              fill-white p-1 text-lg opacity-60 transition hover:opacity-100"
            >
              <IconSteam />
            </Link>
            <Link
              target="_blank"
              rel="noreferrer"
              href={item.skin_link_game}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-mesh-color-neutral-400 bg-transparent 
              fill-white p-1 text-lg opacity-60 transition hover:opacity-100"
            >
              <IconOlho />
            </Link>
          </div>
        </div>
        <div className="flex select-none items-center justify-between">
          <h1 className="text-lg font-semibold">
            {Number(item.skin_price).toLocaleString('pt-br', {
              currency: 'BRL',
              style: 'currency',
              minimumFractionDigits: 2,
            })}
          </h1>
          <h1>
            {!thereIsFloat.includes(item.skin_category) && (
              <>
                <strong>FT / </strong>
                <span className="opacity-60">{item.skin_float}</span>
              </>
            )}
          </h1>
        </div>
        {item.skin_float && !thereIsFloat.includes(item.skin_category) ? (
          <ColoredLine position={item.skin_float} />
        ) : (
          <div className="h-[6px] w-full" />
        )}
        <div className="flex select-none items-center justify-end">
          {itsRent ? (
            <Common.Button
              type="button"
              onClick={() => {
                setSkinToReturn({
                  skinRarity: item.skin_rarity,
                  skinFloat: item.skin_float,
                  skinId: item.id,
                  skinImage: item.skin_image,
                  skinName: item.skin_name,
                  skinPrice: item.skin_price,
                  skinWeapon: item.skin_weapon,
                  statusFloat: item.status_float,
                })
                setOpenModalReturnSkin(true)
              }}
              className="flex h-10 items-center rounded-lg border-transparent bg-mesh-color-neutral-500 px-4 opacity-60 hover:opacity-100"
            >
              Devolução
            </Common.Button>
          ) : userItems ? (
            <ModalRemoveItemMain
              skinId={item.id}
              skinName={item.skin_name}
              activator={
                <Common.Button className="flex h-10 items-center rounded-lg border-transparent bg-mesh-color-neutral-500 px-4 opacity-60 hover:opacity-100">
                  Remover
                </Common.Button>
              }
            />
          ) : (
            <Link
              href={detailsLink}
              className="flex h-10 items-center rounded-lg border-transparent bg-mesh-color-neutral-500 px-4 opacity-60 hover:opacity-100"
            >
              Comprar
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
