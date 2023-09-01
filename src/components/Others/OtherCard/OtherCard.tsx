import IconSteam from '@/assets/IconSteam'
import Common from '@/components/Common'
import IconMagic from '@/components/Icons/IconMagicpen'
import { IconOlho } from '@/components/Icons/IconOlho'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import ColoredLine from '../ColoredLine'

interface Props {
  id: string
  sellerName: string
  skinPrice: string
  skinFloat: string
  skinWeapon: string
  skinColor: string
  skinImage: string
  deletedAt: string | null
  itsRent?: boolean
}

export function OtherCard({
  id,
  sellerName,
  skinColor,
  skinImage,
  skinFloat,
  skinPrice,
  skinWeapon,
  deletedAt,
  itsRent,
}: Props) {
  const titleSkinWeapon = (
    <h1 className="text-sm font-medium opacity-60">{skinWeapon}</h1>
  )
  const customName = sellerName.includes('StatTrak™')
    ? sellerName.split('™')
    : sellerName

  return (
    <article className="relative">
      {deletedAt !== null && (
        <div className="absolute left-1/2 top-1/3 z-10 -translate-x-1/2 -translate-y-1/2 transform text-center text-3xl font-semibold text-mesh-color-rarity-lowest">
          ITEM REMOVIDO
        </div>
      )}
      <div
        className={classNames(
          'flex w-72 flex-col gap-3 rounded-lg border-2 border-mesh-color-neutral-600 border-opacity-60 px-3 pb-4 pt-3 text-white',
        )}
      >
        <Link
          href={`/detalhes/${id}`}
          className={classNames(
            'flex select-none flex-col items-center justify-center rounded-lg border-2 border-mesh-color-neutral-400 bg-mesh-gradient-black-pattern transition-all hover:brightness-150',
            {
              'border-mesh-color-secondary-1400 shadow-stattrak-glow':
                typeof customName === 'object',
            },
          )}
        >
          <div
            className={`h-2 w-52 rounded-b-full`}
            style={{ backgroundColor: `#${skinColor}` }}
          />
          <Image
            src={`https://steamcommunity-a.akamaihd.net/economy/image/${skinImage}`}
            className="h-[154px] w-[206px]"
            alt={sellerName}
            width={206}
            height={154}
            draggable={false}
          />
        </Link>

        <div className="flex h-11 flex-col gap-3">
          {typeof customName === 'object' ? (
            <h1>
              <span className="text-mesh-color-secondary-1200 ">
                {customName[0]}
              </span>
              {customName[1]}
            </h1>
          ) : (
            customName
          )}
          {sellerName.length < 15 && titleSkinWeapon}
        </div>
        <div
          className={`flex items-center ${
            sellerName.length < 15 ? 'justify-end' : 'justify-between'
          }`}
        >
          {sellerName.length >= 15 && titleSkinWeapon}
          <div className="flex gap-2">
            {itsRent && (
              <Common.Button color="invisible">
                <IconMagic />
              </Common.Button>
            )}
            <Common.Button color="invisible" className="h-9 w-9">
              <IconSteam />
            </Common.Button>
            <Common.Button color="invisible" className="h-9 w-9">
              <IconOlho />
            </Common.Button>
          </div>
        </div>
        <div className="flex select-none items-center justify-between">
          <h1 className="text-lg font-semibold">
            {Number(skinPrice).toLocaleString('pt-br', {
              currency: 'BRL',
              style: 'currency',
              minimumFractionDigits: 2,
            })}
          </h1>
          <h1>
            <strong>FT / </strong>
            <span className="opacity-60">{skinFloat}</span>
          </h1>
        </div>
        <ColoredLine position={skinFloat} />
        <div className="flex select-none items-center justify-end">
          <Link
            href={`/detalhes/${id}`}
            className="flex h-10 items-center rounded-lg border-transparent bg-mesh-color-neutral-500 px-4 opacity-60 hover:opacity-100"
          >
            Comprar
          </Link>
        </div>
      </div>
    </article>
  )
}
