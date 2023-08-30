import Common from '@/components/Common'
import { IconCarrinho } from '@/components/Icons'
import CartService from '@/services/cart.service'
import SkinService from '@/services/skin.service'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
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
  assetId: string
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
  assetId,
}: PropsTypes) {
  const [wasRaised, setWasRaised] = useState(false)
  const [methodSelected, setMethodSelected] = useState<any>()
  const router = useRouter()

  const {
    data,
    refetch: createCart,
    isLoading,
  } = useQuery({
    queryKey: ['createSkinFromCart', skinId, cartId],
    queryFn: () => {
      return CartService.createSkinFromCart(skinId, cartId)
    },
    enabled: false,
  })

  const {
    refetch: refetchAvailability,
    data: resultAvailability,
    isRefetching: refetchingAvailability,
  } = useQuery({
    queryKey: ['checkItemAvailability', assetId, sellerId],
    queryFn: () => SkinService.postCheckItemAvailability(assetId, sellerId),
    enabled: false,
  })

  const { data: deleteResult, refetch: deleteItem } = useQuery({
    queryKey: ['deleteItem', assetId, sellerId],
    queryFn: () => SkinService.deleteById(skinId),
    enabled: false,
  })

  console.log(deleteResult)

  const successToast = (message: string) => {
    setMethodSelected(undefined)
    return toast.success(message, {
      duration: 4000,
      position: 'bottom-right',
      icon: undefined,
      style: {
        background: '#AFD734',
        color: 'black',
      },
    })
  }

  const errorToast = (message: string) => {
    setMethodSelected(undefined)
    return toast.error(message, {
      duration: 4000,
      position: 'bottom-right',
      style: {
        background: '#E84E6A',
        color: 'white',
      },
    })
  }

  useEffect(() => {
    if (methodSelected !== undefined) {
      refetchAvailability()
    }
  }, [methodSelected, refetchAvailability])

  const proceedItem = useCallback(async () => {
    if (methodSelected !== undefined) {
      const handleCart = async () => {
        await createCart()
        setWasRaised(true)
      }

      const handleBuy = () => {
        console.log('buy')
        return successToast('Indo para a compra.')
      }

      const handleRent = () => {
        console.log('rent')
        return successToast('Indo para o aluguel.')
      }

      console.log(methodSelected)
      const typeFunction = {
        cart: () => handleCart(),
        buy: () => handleBuy(),
        rent: () => handleRent(),
      }
      return typeFunction[methodSelected! as keyof typeof typeFunction]()
    }
  }, [methodSelected, createCart])

  console.log(skinId)

  useEffect(() => {
    console.log(resultAvailability)
    if (resultAvailability?.request && !refetchingAvailability) {
      if (resultAvailability?.request.status === 200) {
        proceedItem()
      } else if (resultAvailability?.request.status === 404) {
        errorToast('Desculpe, o item não se encontra mais disponível.')
        deleteItem()
      } else {
        errorToast('Erro ao verificar o item. Tente novamente mais tarde!')
        router.push('/')
      }
    }
  }, [
    resultAvailability,
    refetchingAvailability,
    proceedItem,
    router,
    deleteItem,
  ])

  useEffect(() => {
    if (wasRaised && !isLoading) {
      if (data && data.request.status === 201) {
        successToast('Item adicionado ao carrinho!')
        setWasRaised(false)
      } else if (data && data.request.status === 409) {
        errorToast('Item já adicionado em seu carrinho.')
        setWasRaised(false)
      }
    }
  }, [wasRaised, isLoading, data])

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
            {Number(skinPrice).toLocaleString('PT-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumIntegerDigits: 2,
            })}
          </Common.Title>
          <p className="text-mesh-color-neutral-200">Preço Total</p>
        </div>

        <div>
          <div className="flex items-center">
            <Common.Title className="text-2xl font-extrabold text-white">
              {(parseFloat(skinPrice) / 10).toLocaleString('PT-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumIntegerDigits: 2,
              })}
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
        <Common.Button
          onClick={() => setMethodSelected('rent')}
          className="h-11 w-[167px] border-none bg-mesh-color-primary-1400 font-semibold text-black"
        >
          Alugar
        </Common.Button>
        <Common.Button
          onClick={() => setMethodSelected('buy')}
          className="h-11 w-[167px] border-none bg-mesh-color-primary-1400 font-semibold text-black"
        >
          Comprar
        </Common.Button>
        <Common.Button
          onClick={() => setMethodSelected('cart')}
          className="h-11 w-11"
        >
          <IconCarrinho />
        </Common.Button>
      </div>
    </div>
  )
}
