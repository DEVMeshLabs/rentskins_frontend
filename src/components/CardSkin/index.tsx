import Image from 'next/image'
import { Button } from '../Button'
import IconSteam from '@/assets/IconSteam'
import IconCart from '@/assets/Cart'
import IconEye from '@/assets/Eye'
import ColoredLine from '../ColoredLine'
import IconMagic from '../Icons/IconMagicpen'

interface Props {
  sellerName: string
  skinPrice: string
  skinFloat: string
  skinCategory: string
  nameColor: string
  skinImage: string
  itsRent?: boolean
}

export function CardSkin({
  sellerName,
  nameColor,
  skinImage,
  skinFloat,
  skinPrice,
  skinCategory,
  itsRent,
}: Props) {
  // const [skinType, skinName] = name.split('|')

  return (
    <article className="flex w-72 flex-col gap-3 rounded-lg border-2 border-mesh-color-neutral-600 border-opacity-60 px-3 pb-4 pt-3 text-white">
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-mesh-color-neutral-400 bg-mesh-gradient-black-pattern">
        <div
          className={`h-2 w-52 rounded-b-full`}
          style={{ backgroundColor: `#${nameColor}` }}
        />
        <div className="flex h-[154px] w-[206px] items-center justify-center">
          <Image
            src={`https://steamcommunity-a.akamaihd.net/economy/image/${skinImage}`}
            alt="placeholder"
            width={206}
            height={154}
            draggable={false}
          />
        </div>
      </div>

      <h1>{sellerName}</h1>
      <div className="flex items-center justify-between">
        <h1 className="text-sm font-medium opacity-60">{skinCategory}</h1>
        <div className="flex gap-2">
          {itsRent && (
            <Button color="invisible">
              <IconMagic />
            </Button>
          )}
          <Button color="invisible" className="h-9 w-9">
            <IconSteam />
          </Button>
          <Button color="invisible" className="h-9 w-9">
            <IconEye />
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">R$: {skinPrice}</h1>
        <h1>
          <strong>FT / </strong>
          <span className="opacity-60">{skinFloat}</span>
        </h1>
      </div>
      <ColoredLine />
      <div className="flex items-center justify-end">
        <div className="flex gap-2">
          <Button color="invisible" className="h-10 w-10 border-2">
            <IconCart />
          </Button>
          <Button className="border-transparent bg-mesh-color-neutral-500 px-4">
            Comprar
          </Button>
        </div>
      </div>
    </article>
  )
}
