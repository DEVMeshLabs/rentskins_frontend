import Common from '@/components/Common'
import Form from '@/components/Forms'
import { IconCarrinho } from '@/components/Icons'
import CartService from '@/services/cart.service'
import SkinService from '@/services/skin.service'
import Toast from '@/tools/toast.tool'
import { useQuery } from '@tanstack/react-query'
import { signIn } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ColorRing } from 'react-loader-spinner'
import { formResolver } from './schemas/form.schema'

type PropsTypes = {
  userStatus: 'authenticated' | 'loading' | 'unauthenticated'
  skinName: string
  skinPrice: string
  skinFloat: string
  skinCategory: string
  skinWeapon: string
  skinColor: string
  sellerId: string
  statusFloat: string
  defaultID: string
  skinId: string
  cartId: string
  assetId: string
}

export function PageDetailsSkin({
  userStatus,
  skinName,
  skinPrice,
  skinFloat,
  skinCategory,
  skinWeapon,
  sellerId,
  statusFloat,
  skinColor,
  defaultID,
  skinId,
  cartId,
  assetId,
}: PropsTypes) {
  const [wasRaised, setWasRaised] = useState(false)
  const [methodSelected, setMethodSelected] = useState<any>()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const {
    data,
    refetch: createCart,
    isRefetching: recreatingCart,
  } = useQuery({
    queryKey: ['createSkinFromCart', skinId, cartId],
    queryFn: () => {
      return CartService.createSkinFromCart(skinId, cartId)
    },
    enabled: false,
    cacheTime: 0,
  })

  const {
    refetch: refetchAvailability,
    data: resultAvailability,
    isRefetching: refetchingAvailability,
  } = useQuery({
    queryKey: ['checkItemAvailability', assetId, sellerId],
    queryFn: () => SkinService.postCheckItemAvailability(assetId, sellerId),
    enabled: false,
    cacheTime: 0,
  })

  const { data: deleteResult, refetch: deleteItem } = useQuery({
    queryKey: ['deleteItem', assetId, sellerId],
    queryFn: () => SkinService.deleteById(skinId),
    enabled: false,
    cacheTime: 0,
  })
  const { register, watch } = useForm({
    resolver: formResolver,
    defaultValues: {
      'rent-time': undefined,
    },
  })

  const watchRentTime = watch('rent-time')

  useEffect(() => {
    if (deleteResult) {
      Toast.Error('Desculpe, o item não se encontra mais disponível.')
      router.push('/')
    }
  }, [deleteResult, router])

  useEffect(() => {
    if (methodSelected !== undefined) {
      setLoading(true)
      refetchAvailability()
    } else {
      setLoading(false)
    }
  }, [methodSelected, refetchAvailability])

  const proceedItem = useCallback(async () => {
    if (methodSelected !== undefined) {
      if (userStatus === 'authenticated') {
        const handleCart = async () => {
          await createCart()
          setWasRaised(true)
          setMethodSelected(undefined)
        }

        const handleBuy = () => {
          setMethodSelected(undefined)
          return Toast.Success(
            'Sucesso! Porém o método de compra ainda está em desenvolvimento.',
          )
        }

        const handleRent = () => {
          setMethodSelected(undefined)
          return Toast.Success(
            'Sucesso! Porém o método de aluguel ainda está em desenvolvimento.',
          )
        }

        const typeFunction = {
          cart: () => handleCart(),
          buy: () => handleBuy(),
          rent: () => handleRent(),
        }
        return typeFunction[methodSelected! as keyof typeof typeFunction]()
      } else if (userStatus === 'unauthenticated') {
        Toast.Blank('Você deve estar logado em sua conta para prosseguir.')
        Toast.Loading('Estamos te direcionando para a tela de login da Steam.')

        return setTimeout(
          () => signIn('steam', { callbackUrl: pathname }),
          2000,
        )
      } else if (userStatus === 'loading') {
        setMethodSelected(undefined)
        return Toast.Error('Tente novamente após alguns segundos.')
      }
    }
  }, [methodSelected, createCart, userStatus, pathname])

  useEffect(() => {
    if (resultAvailability?.request && !refetchingAvailability) {
      if (resultAvailability?.request.status === 200) {
        proceedItem()
      } else if (resultAvailability?.request.status === 404) {
        deleteItem()
      } else {
        Toast.Error('Erro ao verificar o item. Tente novamente mais tarde!')
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
    if (wasRaised && !recreatingCart) {
      if (data && data.request.status === 201) {
        Toast.Success('Item adicionado ao carrinho!')
        setWasRaised(false)
      } else if (data && data.request.status === 409) {
        Toast.Error('Item já adicionado em seu carrinho.')
        setWasRaised(false)
      }
    }
  }, [wasRaised, data, recreatingCart])

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
              {(parseFloat(skinPrice) * 0.1).toLocaleString('PT-BR', {
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
          <p className="text-white">{defaultID}</p>
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

      <div className="mt-6 flex flex-col gap-4">
        <div className="">
          <Common.Title className="font-semibold text-white">
            Selecione o período de Aluguel
          </Common.Title>
          <Form.Input.Radio.Default
            wrapperClassname="select-none"
            containerClassname="flex gap-2 mt-1"
            labelClassName={`peer-checked:bg-mesh-color-primary-1200 peer-disabled
              peer:opacity-100 peer-disabled:opacity-10 peer-checked:border-mesh-color-primary-1200
              w-full h-full border text-white p-2 rounded-lg border-mesh-color-neutral-400
              peer-checked:text-black cursor-pointer hover:bg-mesh-color-neutral-600
              font-medium`}
            name="rent-time"
            disabled={loading}
            items={[
              { label: '7 Dias', value: 7 },
              { label: '14 Dias', value: 14 },
              { label: '21 Dias', value: 21 },
            ]}
            register={register('rent-time')}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Common.Button
              onClick={() => {
                if (!watchRentTime) {
                  Toast.Error(
                    'Você deve selecionar um período para prosseguir com o aluguel.',
                  )
                } else {
                  setMethodSelected('rent')
                }
              }}
              disabled={loading}
              className="h-11 w-[167px] border-none bg-mesh-color-primary-1400 font-semibold text-black opacity-100 disabled:opacity-10"
            >
              Alugar
            </Common.Button>
            <Common.Button
              onClick={() => setMethodSelected('buy')}
              disabled={loading}
              className="h-11 w-[167px] border-none bg-mesh-color-primary-1400 font-semibold text-black opacity-100 disabled:opacity-10"
            >
              Comprar
            </Common.Button>
            <Common.Button
              onClick={() => setMethodSelected('cart')}
              disabled={loading}
              className="h-11 w-11 border-mesh-color-neutral-400 opacity-100 disabled:opacity-10"
            >
              <IconCarrinho />
            </Common.Button>
          </div>
          {loading && <ButtonLoading />}
        </div>
      </div>
    </div>
  )
}

function ButtonLoading() {
  return (
    <div className="-my-1 flex flex-col justify-end">
      <ColorRing
        width={48}
        height={'90%'}
        colors={['#95BC1E', '#95BC1E', '#95BC1E', '#95BC1E', '#95BC1E']}
      />
    </div>
  )
}
