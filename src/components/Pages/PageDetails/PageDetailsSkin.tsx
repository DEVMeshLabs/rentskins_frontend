import Common from '@/components/Common'
import { IconCarrinho } from '@/components/Icons'
import CartService from '@/services/cart.service'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

type PropsTypes = {
  skinName: string
  skinPrice: string
  skinFloat: string
  skinCategory: string
  skinWeapon: string
  skinColor: string
  sellerId: string
  statusFloat: string
  skinId: string
  cartId: string
}

export function PageDetailsSkin({
  skinName,
  skinPrice,
  skinFloat,
  skinCategory,
  skinWeapon,
  sellerId,
  statusFloat,
  skinColor,
  skinId,
  cartId,
}: PropsTypes) {
  const [wasRaised, setWasRaised] = useState(false)
  const { data, refetch, isLoading } = useQuery({
    queryKey: ['createSkinFromCart', skinId, cartId],
    queryFn: () => {
      return CartService.createSkinFromCart(skinId, cartId)
    },
    enabled: false,
  })

  useEffect(() => {
    if (wasRaised && !isLoading) {
      if (data && data.request.status === 201) {
        toast.success('Skin adicionada no carrinho', {
          duration: 4000, // Duração em milissegundos
          position: 'bottom-right', // Posição do toast
          icon: undefined,
          style: {
            background: '#AFD734', // Estilo personalizado
            color: 'black',
          },
        })
        setWasRaised(false)
      } else if (data && data.request.status === 409) {
        toast.error('Essa skin já está em seu carrinho', {
          duration: 4000, // Duração em milissegundos
          position: 'bottom-right', // Posição do toast
          style: {
            background: '#E84E6A', // Estilo personalizado
            color: 'white',
          },
        })
        setWasRaised(false)
      }
    }
  }, [wasRaised, isLoading])

  return (
    <div className="rounded-lg border-2 border-mesh-color-neutral-600 px-4 py-3">
      <div className="space-y-4">
        <div>
          <Common.Title className="text-2xl font-extrabold text-white">
            {skinName}
          </Common.Title>
          <p className="text-mesh-color-neutral-200">{statusFloat}</p>
        </div>

        <div>
          <Common.Title className="text-2xl font-extrabold text-white">
            R$: {skinPrice}
          </Common.Title>
          <p className="text-mesh-color-neutral-200">Preço Total</p>
        </div>

        <div>
          <div className="flex items-center">
            <Common.Title className="text-2xl font-extrabold text-white">
              R$: {parseFloat(skinPrice) / 10}
            </Common.Title>
            <span className="ml-4 flex h-[24px] w-[42px] items-center justify-center rounded-full border border-none bg-mesh-color-others-green text-mesh-color-accent-600">
              10%
            </span>
          </div>
          <p className="text-mesh-color-neutral-200">Preço do Aluguel</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between">
          <Common.Title className="text-mesh-color-neutral-200">
            Tendências de mercado
          </Common.Title>
          <p className="text-white">Undefined</p>
        </div>

        <div className="flex justify-between">
          <Common.Title className="text-mesh-color-neutral-200">
            ID Padrão
          </Common.Title>
          <p className="text-white">{sellerId}</p>
        </div>

        <div className="flex justify-between">
          <Common.Title className="text-mesh-color-neutral-200">
            Float
          </Common.Title>
          <div className="flex items-center">
            <p className="text-white">{skinFloat}</p>
            <div
              className={`ml-2 h-[17px] w-[17px] rounded-[3px]`}
              style={{ background: `#${skinColor}` }}
            />
          </div>
        </div>

        <div className="flex justify-between">
          <Common.Title className="text-mesh-color-neutral-200">
            Tipo
          </Common.Title>
          <p className="text-white">{skinCategory}</p>
        </div>

        <div className="flex justify-between">
          <Common.Title className="text-mesh-color-neutral-200">
            Arma
          </Common.Title>
          <p className="text-white">{skinWeapon}</p>
        </div>
      </div>

      <div className="mt-10">
        <Common.Title className="font-semibold text-white">
          Selecione o período de Aluguel
        </Common.Title>
      </div>

      <div className="mt-10 flex gap-2">
        <Common.Button className="h-11 w-[167px] border-none bg-mesh-color-primary-1400 font-semibold text-black">
          Alugar
        </Common.Button>
        <Common.Button className="h-11 w-[167px] border-none bg-mesh-color-primary-1400 font-semibold text-black">
          Comprar agora
        </Common.Button>
        <Common.Button
          onClick={async () => {
            await refetch()
            setWasRaised(true)
          }}
          className="h-11 w-11"
        >
          <IconCarrinho />
        </Common.Button>
      </div>
    </div>
  )
}
