import Common from '@/components/Common'
import { IconTrash } from '@/components/Icons/IconTrash'
import CartService from '@/services/cart.service'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { MouseEventHandler } from 'react'

interface Props {
  skinPrice: number
  name: string
  skinWeapon: string
  nameColor: string
  iconUrl: string
  modelId: string
  handleOnClick: MouseEventHandler<HTMLButtonElement>
}

export default function CartSkinCard({
  skinPrice,
  name,
  nameColor,
  iconUrl,
  skinWeapon,
  modelId,
  handleOnClick,
}: Props) {
  const { refetch } = useQuery({
    queryKey: ['deleteSkinFromCart', modelId],
    queryFn: () => CartService.deleteSkinFromCart(modelId),
    enabled: false,
  })
  const formattedNumber = parseFloat(String(skinPrice)).toLocaleString(
    'pt-BR',
    {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  )
  return (
    <section
      className="group flex h-44 w-full
    select-none justify-center rounded-xl
    bg-mesh-color-others-eerie-black transition-all ease-in-out hover:bg-mesh-color-neutral-500"
    >
      <div className="pl flex w-full items-center justify-start px-6">
        <div className="flex w-full items-center justify-start gap-6">
          <div className="flex h-32 w-48 flex-col items-center rounded-lg border-2 border-mesh-color-neutral-400 bg-mesh-gradient-black-pattern">
            <div
              className="h-1 w-32 rounded-b-full"
              style={{ backgroundColor: `#${nameColor}` }}
            />
            <Image
              src={`https://steamcommunity-a.akamaihd.net/economy/image/${iconUrl}`}
              alt="placeholder"
              width={138}
              height={103}
            />
          </div>
          <div className="flex h-24 flex-col justify-between gap-3">
            <div>
              <Common.Title
                bold={600}
                className="text-2xl md:text-lg"
                color="white"
              >
                {name}
              </Common.Title>
              <Common.Title
                bold={500}
                className="text-2xl opacity-60 md:text-lg"
                color="cinza"
              >
                Nova de fábrica
              </Common.Title>
            </div>
            <Common.Title
              bold={500}
              size="xl"
              color="cinza"
              className="text-xl opacity-60 md:text-base"
            >
              {skinWeapon}
            </Common.Title>
          </div>
        </div>
        <div>
          <Common.Title
            bold={600}
            className="text-3xl opacity-60 md:text-xl"
            color="white"
          >
            {formattedNumber}
          </Common.Title>
          <Common.Title
            color="white"
            className="whitespace-nowrap text-lg opacity-60 md:text-sm"
            bold={400}
          >
            <strong>FT / </strong>
            <span className="opacity-60">0.0003</span>
          </Common.Title>
        </div>
      </div>
      <Common.Button
        onClick={async (event) => {
          await refetch()
          handleOnClick(event)
        }}
        className="group flex h-full w-0 items-center justify-center
        rounded-l-none rounded-r-xl border-none
        stroke-white transition-[width/color] hover:cursor-pointer
        hover:stroke-mesh-color-rarity-lowest group-hover:w-20 group-hover:bg-mesh-color-others-eerie-black"
      >
        <IconTrash />
      </Common.Button>
    </section>
  )
}
