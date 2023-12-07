import Common from '@/components/Common'
import { IconTrash } from '@/components/Icons/IconTrash'
import CartService from '@/services/cart.service'
import useCartStore from '@/stores/cart.store'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { MouseEventHandler, useState } from 'react'

interface Props {
  skinPrice: number
  name: string
  skinWeapon: string
  statusFloat: string
  nameColor: string
  iconUrl: string
  userId: string | undefined
  sellerId: string
  skinId: string
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
  statusFloat,
  handleOnClick,
  sellerId,
  skinId,
  userId,
}: Props) {
  const { addSkinsToBuy, deleteSkinsToBuy } = useCartStore()
  const [selected, setSelected] = useState(false)
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
  const customName = name.split('(')[0]

  const skinsToBuy = {
    skin_id: skinId,
    buyer_id: userId!,
    seller_id: sellerId,
  }

  const handleSetSkinToBuy = () => {
    if (!selected) {
      addSkinsToBuy(skinsToBuy)
    } else {
      deleteSkinsToBuy(skinId)
    }
  }

  return (
    <div className="relative flex w-full">
      <input
        type="checkbox"
        checked={selected}
        onChange={() => {
          setSelected((state) => !state)
          handleSetSkinToBuy()
        }}
        className="absolute -left-2 -top-2 z-20 h-7 w-7 cursor-pointer rounded-full border-[1px] border-mesh-color-neutral-200 checked:bg-mesh-color-primary-1200"
      />
      <section
        className="group flex h-44 w-full
    select-none justify-center rounded-xl
    bg-mesh-color-others-eerie-black transition-all ease-in-out hover:bg-mesh-color-neutral-500"
      >
        <div
          onClick={() => {
            setSelected((state) => !state)
            handleSetSkinToBuy()
          }}
          className="pl flex w-full cursor-pointer items-center justify-start px-6"
        >
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
                  {customName}
                </Common.Title>
                <Common.Title
                  bold={500}
                  className="text-2xl opacity-60 md:text-lg"
                  color="cinza"
                >
                  {statusFloat}
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
            setSelected(false)
            await refetch()
            deleteSkinsToBuy(skinId)
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
    </div>
  )
}
