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
  skinFloat: string | number
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
  skinFloat,
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
        className="group flex h-32 w-full select-none
    justify-center rounded-xl bg-mesh-color-others-eerie-black
    transition-all ease-in-out hover:bg-mesh-color-neutral-500 laptop:h-44"
      >
        <div
          onClick={() => {
            setSelected((state) => !state)
            handleSetSkinToBuy()
          }}
          className="flex w-full cursor-pointer items-center justify-start px-6"
        >
          <div className="flex w-full items-center justify-start gap-2 laptop:gap-6">
            <div className="flex aspect-video w-32 flex-col items-center justify-between rounded-lg border-2 border-mesh-color-neutral-400 bg-mesh-gradient-black-pattern laptop:w-48">
              <div
                className="h-1 w-20 rounded-b-full laptop:w-32"
                style={{ backgroundColor: `#${nameColor}` }}
              />
              <Image
                src={`https://steamcommunity-a.akamaihd.net/economy/image/${iconUrl}`}
                alt="placeholder"
                width={200}
                height={200}
                className="p-4 laptop:w-36"
              />
            </div>
            <div className="flex h-16 flex-col justify-center gap-3">
              <div>
                <Common.Title
                  bold={600}
                  className="text-sm laptop:text-xl"
                  color="white"
                >
                  {customName}
                </Common.Title>
                <Common.Title
                  bold={500}
                  className="text-sm opacity-60 laptop:text-xl"
                  color="cinza"
                >
                  {statusFloat}
                </Common.Title>
              </div>
              <Common.Title
                bold={500}
                size="xl"
                color="cinza"
                className="text-xs opacity-60 laptop:text-lg"
              >
                {skinWeapon}
              </Common.Title>
            </div>
          </div>
          <div>
            <Common.Title
              bold={600}
              className="text-base opacity-60 laptop:text-2xl"
              color="white"
            >
              {formattedNumber}
            </Common.Title>
            <Common.Title
              color="white"
              className="whitespace-nowrap text-xs opacity-60 laptop:text-lg"
              bold={400}
            >
              <strong>FT / </strong>
              <span className="opacity-60">{Number(skinFloat).toFixed(6)}</span>
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
