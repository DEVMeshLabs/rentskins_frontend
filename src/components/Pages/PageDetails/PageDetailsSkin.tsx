import Common from '@/components/Common'
import { IconCarrinho } from '@/components/Icons'
import { ModalBuyMain } from '@/components/Modal/ModalBuy/ModalBuyMain'
import { ModalConnectInventoryMain } from '@/components/Modal/ModalConnectInventory/ModalConnectInventoryMain'
import { IOptionalConfig } from '@/interfaces/IConfig'
import CartService from '@/services/cart.service'
import SkinService from '@/services/skin.service'
import useSkinsStore from '@/stores/skins.store'
import ColorRarity, { TItemRarity } from '@/tools/colorRarity'
import Toast from '@/tools/toast.tool'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { signIn } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
//

type PropsTypes = {
  userStatus: 'authenticated' | 'loading' | 'unauthenticated'
  userConfiguration: IOptionalConfig
  skinName: string
  skinImage: string
  skinPrice: number
  skinFloat: string
  skinCategory: string
  skinWeapon: string
  skinRarity: TItemRarity
  sellerId: string
  statusFloat: string
  itemAveragePrice: number
  defaultID: string
  skinId: string
  cartId: string
  assetId: string
  ownerSkin: string
  userId: string
  userName: string
  token: string
  saleType: 'sale' | 'rent'
}

export function PageDetailsSkin({
  userStatus,
  userConfiguration,
  skinName,
  skinImage,
  itemAveragePrice,
  skinPrice,
  skinFloat,
  skinCategory,
  skinWeapon,
  sellerId,
  statusFloat,
  skinRarity,
  defaultID,
  skinId,
  cartId,
  assetId,
  ownerSkin,
  userId,
  saleType,
  token,
}: PropsTypes) {
  const [wasRaised, setWasRaised] = useState(false)
  const [rentPercentage, setRentPercentage] = useState(10)
  const [methodSelected, setMethodSelected] = useState<
    'rent' | 'buy' | 'cart' | undefined
  >()
  const [loading, setLoading] = useState(false)
  const [selectedRentTime, setSelectedRentTime] = useState(false)
  const [userIsntOwnerSkin, setUserIsntOwnerSkin] = useState(true)
  const [stateRentTime, setStateRentTime] = useState(0)
  const [rent, setRent] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const {
    setOpenModalBuySkin,
    setWhatModalOpenToBuySkin,
    setSkinToBuy,
    setRentTime,
    itemAvailable,
    setItemAvailable,
  } = useSkinsStore()
  const thereIsFloat = !(
    skinCategory === 'Graffiti' ||
    skinCategory === 'Container' ||
    skinCategory === 'Sticker' ||
    skinCategory === 'Collectible'
  )

  const skinToBuy = {
    skinId,
    skinPrice,
    skinRarity,
    skinFloat,
    skinImage,
    skinName,
    skinWeapon,
    statusFloat,
  }

  useEffect(() => {
    if (ownerSkin === userId) {
      setUserIsntOwnerSkin(false)
    }
  }, [ownerSkin, userId])

  const hasConfigurations =
    userConfiguration &&
    userConfiguration?.owner_email !== undefined &&
    userConfiguration?.owner_phone !== undefined &&
    userConfiguration?.owner_cpf !== undefined &&
    userConfiguration?.agreed_with_terms !== false &&
    userConfiguration?.url_trade !== undefined

  useEffect(() => {
    if (loading && userStatus === 'authenticated' && hasConfigurations) {
      Toast.Loading(
        'Aguarde enquanto verificamos a disponibilidade do item.',
        2000,
      )
    }
  }, [loading, userStatus, hasConfigurations])

  useEffect(() => {
    let toastWhileLoading

    if (userStatus !== 'loading') {
      toast.dismiss(toastWhileLoading)
    } else {
      toastWhileLoading = Toast.Loading('Carregando...', 10000)
    }
  }, [userStatus])

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

  const renderButton = (child: ReactNode) => {
    if (hasConfigurations === true) {
      return child
    }
    if (userStatus === 'authenticated') {
      return (
        <ModalConnectInventoryMain
          activator={child}
          userConfig={userConfiguration}
        />
      )
    } else {
      return child
    }
  }

  useEffect(() => {
    setRentTime(stateRentTime)
    switch (String(stateRentTime)) {
      case '7':
        return setRentPercentage(10)
      case '14':
        return setRentPercentage(18)
      case '21':
        return setRentPercentage(23)
    }
  }, [stateRentTime])

  useEffect(() => {
    if (deleteResult) {
      Toast.Error('Desculpe, o item não se encontra mais disponível.', 7000)
      router.push('/')
    }
  }, [deleteResult, router])

  useEffect(() => {
    if (methodSelected !== undefined && !itemAvailable) {
      setLoading(true)
      refetchAvailability()
    } else {
      setLoading(false)
    }
  }, [methodSelected, refetchAvailability, hasConfigurations])

  useEffect(() => {
    console.log(resultAvailability)
    if (methodSelected === 'buy' && resultAvailability?.status === 200) {
      setLoading(false)
      setRentTime(stateRentTime!)
      setWhatModalOpenToBuySkin(0)
      setItemAvailable(true)
    } else if (
      methodSelected === 'rent' &&
      resultAvailability?.status === 200
    ) {
      setLoading(false)
      setRentTime(stateRentTime!)
      setWhatModalOpenToBuySkin(1)
      setItemAvailable(true)
    } else if (
      resultAvailability?.request.status === 404 ||
      resultAvailability?.request.status === 409
    ) {
      setLoading(false)
      setItemAvailable(false)
      Toast.Error(
        'Desculpe, infelizmente esse item não está mais disponível.',
        7000,
      )
    }
  }, [resultAvailability])

  const proceedItem = useCallback(async () => {
    console.log(methodSelected !== undefined)
    if (methodSelected !== undefined) {
      console.log(wasRaised)
      if (userStatus === 'authenticated') {
        if (hasConfigurations) {
          const handleCart = async () => {
            setMethodSelected(undefined)
            await createCart()
            setWasRaised(true)
          }

          const handleBuy = () => {
            setMethodSelected('buy')
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
        }
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
  }, [
    methodSelected,
    createCart,
    userStatus,
    pathname,
    hasConfigurations,
    wasRaised,
  ])

  useEffect(() => {
    if (resultAvailability?.request && !refetchingAvailability) {
      if (resultAvailability?.request?.status === 200) {
        proceedItem()
      } else if (resultAvailability?.request?.status === 404) {
        deleteItem()
        setOpenModalBuySkin(false)
      } else if (resultAvailability?.request?.status === 500) {
        if (resultAvailability?.request?.response?.includes('HTTP error 429')) {
          Toast.Error(
            'Problemas de conexão com a Steam. Tente novamente mais tarde!',
          )
          router.push('/')
          setOpenModalBuySkin(false)
        } else {
          deleteItem()
          setOpenModalBuySkin(false)
        }
      } else {
        Toast.Error('Erro ao verificar o item. Tente novamente mais tarde!')
        router.push('/')
        setOpenModalBuySkin(false)
      }
    }
  }, [
    methodSelected,
    resultAvailability,
    setOpenModalBuySkin,
    refetchingAvailability,
    proceedItem,
    router,
    deleteItem,
  ])

  useEffect(() => {
    console.log(data)
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

  const items = [
    { label: '7 Dias', value: 7 },
    { label: '14 Dias', value: 14 },
    { label: '21 Dias', value: 21 },
  ]

  return (
    <div className="flex flex-col justify-between rounded-lg border-2 border-mesh-color-neutral-600 px-4 py-3">
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
              minimumFractionDigits: 2,
            })}
          </Common.Title>
          <p className="text-mesh-color-neutral-200">Preço Total</p>
        </div>

        {saleType === 'rent' && stateRentTime > 0 && (
          <div
            className={`transition-all duration-500 ${
              stateRentTime > 0 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex items-center">
              <Common.Title className="text-2xl font-extrabold text-white">
                {(
                  parseFloat(String(skinPrice)) *
                  (rentPercentage / 100)
                ).toLocaleString('PT-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                })}
              </Common.Title>
              <span className="ml-4 flex h-[24px] w-[42px] items-center justify-center rounded-full border border-none bg-mesh-color-others-green text-mesh-color-accent-600">
                {rentPercentage}%
              </span>
            </div>
            <p className="text-mesh-color-neutral-200">Preço do Aluguel</p>
          </div>
        )}
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between">
          <Common.Title className="text-mesh-color-neutral-200">
            Tendências de Mercado
          </Common.Title>
          <p className="text-white">
            {itemAveragePrice.toLocaleString('pt-br', {
              currency: 'BRL',
              style: 'currency',
              minimumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="flex justify-between">
          <Common.Title className="text-mesh-color-neutral-200">
            Paint Seed
          </Common.Title>
          <p className="text-white">{defaultID}</p>
        </div>

        {thereIsFloat && (
          <div className="flex justify-between">
            <Common.Title className="text-mesh-color-neutral-200">
              Float
            </Common.Title>
            <div className="flex items-center">
              <p className="text-white">{skinFloat}</p>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <Common.Title className="text-mesh-color-neutral-200">
            Tipo
          </Common.Title>
          <p className="text-white">{skinCategory}</p>
        </div>

        <div className="flex justify-between">
          <Common.Title className="text-mesh-color-neutral-200">
            Raridade
          </Common.Title>
          <div className="flex items-center justify-center">
            <div
              className={`ml-2 h-[17px] w-[17px] rounded-[3px] border-[1px]`}
              style={{ background: `#${ColorRarity.transform(skinRarity)}` }}
            />
          </div>
        </div>
      </div>

      <div
        className={classNames(
          'mt-6 flex h-32 flex-col justify-end gap-4 transition-all',
          {
            'justify-between': rent,
          },
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {saleType === 'rent' &&
              renderButton(
                <Common.Button
                  disabled={
                    (loading && hasConfigurations) || userStatus === 'loading'
                  }
                  onClick={() => {
                    Toast.Error('A opção de aluguel ainda não está disponível.')
                    setRent(false)
                  }}
                  className="h-11 w-[167px] cursor-pointer border-none bg-mesh-color-primary-1400 font-semibold text-black opacity-100 disabled:opacity-10"
                >
                  Alugar
                </Common.Button>,
              )}
            <ModalBuyMain
              createTransaction={{
                skinPrice: Number(skinPrice),
                skinId,
                token,
                userId,
                sellerId,
              }}
            />
            {renderButton(
              <Common.Button
                onClick={async () => {
                  if (userIsntOwnerSkin) {
                    if (hasConfigurations) {
                      setMethodSelected('buy')
                      setSkinToBuy(skinToBuy)
                      setWhatModalOpenToBuySkin(0)
                      setOpenModalBuySkin(true)
                    } else {
                      Toast.Blank(
                        'Você deve adicionar seus dados antes de proceder.',
                      )
                    }
                  } else {
                    Toast.Error('Você não pode comprar o seu próprio item.')
                  }
                }}
                disabled={
                  (loading && hasConfigurations) || userStatus === 'loading'
                }
                className={
                  'h-11 w-[167px] cursor-pointer border-none bg-mesh-color-primary-1400 font-semibold text-black opacity-100 disabled:opacity-10'
                }
              >
                Comprar
              </Common.Button>,
            )}
            {renderButton(
              <Common.Button
                onClick={() => {
                  console.log('OnClick')
                  if (userIsntOwnerSkin) {
                    console.log('Entrou dentro do if')
                    setMethodSelected('cart')
                  } else {
                    Toast.Error(
                      'Você não pode adicionar o seu próprio item no carrinho.',
                    )
                  }
                }}
                disabled={
                  (loading && hasConfigurations) || userStatus === 'loading'
                }
                className="h-11 w-11 cursor-pointer border-mesh-color-neutral-400 opacity-100 disabled:opacity-10"
              >
                <IconCarrinho />
              </Common.Button>,
            )}
          </div>
        </div>
        <div
          className={`h-0 transition-all ${rent ? 'visible h-20' : 'hidden'}`}
        >
          {saleType === 'rent' && rent && (
            <>
              <Common.Title className="font-semibold text-white">
                Selecione o período de Aluguel
              </Common.Title>
              <div className="flex gap-2">
                {items.map(({ label, value }) => (
                  <Common.Button
                    key={label}
                    className={classNames(
                      'w-20 cursor-pointer rounded-lg border-2 border-mesh-color-neutral-400 p-2 font-medium text-white transition-all hover:bg-mesh-color-neutral-600 peer-checked:bg-mesh-color-primary-1200 peer-checked:text-black peer-disabled:opacity-10',
                      {
                        'bg-mesh-color-rarity-lowest text-white':
                          selectedRentTime,
                      },
                    )}
                    onMouseOver={() => setStateRentTime(value)}
                    onClick={() => {
                      setStateRentTime(value)
                      setSelectedRentTime(false)
                      if (userIsntOwnerSkin) {
                        setMethodSelected('rent')
                        setSkinToBuy(skinToBuy)
                        setWhatModalOpenToBuySkin(1)
                        setOpenModalBuySkin(true)
                      } else {
                        Toast.Error('Você não pode alugar o seu próprio item.')
                      }
                    }}
                  >
                    {label}
                  </Common.Button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
