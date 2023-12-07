import Common from '@/components/Common'
import { IconCarrinho } from '@/components/Icons'
import { ModalBuyMain } from '@/components/Modal/ModalBuy/ModalBuyMain'
import { ModalConnectInventoryMain } from '@/components/Modal/ModalConnectInventory/ModalConnectInventoryMain'
import { IOptionalConfig } from '@/interfaces/IConfig'
import { ISkins } from '@/interfaces/ISkins'
import ISteamUser from '@/interfaces/steam.interface'
import CartService from '@/services/cart.service'
import { IGetUserCart } from '@/services/interfaces/user.interface'
import NotificationServices from '@/services/notifications.service'
import SkinService from '@/services/skin.service'
import useSkinsStore from '@/stores/skins.store'
import ColorRarity from '@/tools/colorRarity.tool'
import Toast from '@/tools/toast.tool'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { signIn } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
//

type PropsTypes = {
  item: ISkins
  userStatus: 'authenticated' | 'loading' | 'unauthenticated'
  userConfiguration: IOptionalConfig
  recommendedPrice: string
  isLoadingRecommendedPrice: boolean
  skinName: string
  defaultID: string
  userCart: IGetUserCart
  session: ISteamUser
}

export function PageDetailsSkin({
  item,
  userStatus,
  userConfiguration,
  skinName,
  defaultID,
  isLoadingRecommendedPrice,
  recommendedPrice,
  session,
  userCart,
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
    item.skin_category === 'Graffiti' ||
    item.skin_category === 'Container' ||
    item.skin_category === 'Sticker' ||
    item.skin_category === 'Collectible' ||
    item.skin_category === 'Patch'
  )

  const skinToBuy = {
    skinId: item.id,
    skinPrice: item.skin_price,
    skinRarity: item.skin_rarity,
    skinFloat: item.skin_float,
    skinImage: item.skin_image,
    skinName,
    skinWeapon: item.skin_weapon,
    statusFloat: item.status_float,
  }

  useEffect(() => {
    if (item.seller_id === session?.user?.steam?.steamid) {
      setUserIsntOwnerSkin(false)
    }
  }, [item.seller_id, session?.user?.steam?.steamid])

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
    queryKey: ['createSkinFromCart', item.id, userCart?.id!],
    queryFn: () => {
      return CartService.createSkinFromCart(item.id, userCart.id)
    },
    enabled: false,
    cacheTime: 0,
  })

  const {
    refetch: refetchAvailability,
    data: resultAvailability,
    isRefetching: refetchingAvailability,
  } = useQuery({
    queryKey: ['checkItemAvailability', item.asset_id, item.seller_id],
    queryFn: () => {
      return SkinService.postCheckItemAvailability(
        item.asset_id,
        item.seller_id,
      )
    },
    enabled: false,
    cacheTime: 0,
  })

  const { data: deleteResult, refetch: deleteItem } = useQuery({
    queryKey: ['deleteItem', item.asset_id, item.seller_id],
    queryFn: () => SkinService.deleteById(item.id),
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
  }, [stateRentTime, setRentTime])

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
  }, [methodSelected, refetchAvailability, hasConfigurations, itemAvailable])

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
      // Toast.Error(
      //   'Desculpe, infelizmente esse item não está mais disponível.',
      //   7000,
      // )
    }
  }, [
    resultAvailability,
    methodSelected,
    stateRentTime,
    setItemAvailable,
    setRentTime,
    setWhatModalOpenToBuySkin,
  ])

  const proceedItem = useCallback(async () => {
    if (methodSelected !== undefined) {
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
  }, [methodSelected, createCart, userStatus, pathname, hasConfigurations])

  useEffect(() => {
    console.log(resultAvailability)
    if (resultAvailability?.request && !refetchingAvailability) {
      if (resultAvailability?.request?.status === 200) {
        proceedItem()
      } else if (resultAvailability?.request?.status === 404) {
        NotificationServices.createNewNotification(
          item.seller_id,
          session?.user?.token!,
          `O anúncio do item ${skinName} foi removido da loja. Durante a compra de um usuário o item não foi encontrado em seu inventário.`,
          item.id,
        )
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
          console.log('Aqui foi 2')
          NotificationServices.createNewNotification(
            item.seller_id,
            session?.user?.token!,
            `O anúncio do item ${skinName} foi removido. Verifique se o seu inventário se encontra público e anuncie novamente.`,
            item.id,
          )
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
    item,
    session,
    skinName,
  ])

  useEffect(() => {
    if (wasRaised && !recreatingCart) {
      if (data && data.request.status === 201) {
        Toast.Success('Item adicionado ao carrinho!')
        setWasRaised(false)
      } else if (data && data.request.status === 409) {
        Toast.Error('Item já adicionado em seu carrinho.')
        setWasRaised(false)
      } else {
        Toast.Error(
          'Infelizmente algo de errado aconteceu. Tente novamente mais tarde.',
        )
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
          <p className="text-mesh-color-neutral-200">{item.status_float}</p>
        </div>

        <div>
          <Common.Title className="text-2xl font-extrabold text-white">
            {Number(item.skin_price).toLocaleString('PT-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2,
            })}
          </Common.Title>
          <p className="text-mesh-color-neutral-200">Preço Total</p>
        </div>

        {item.sale_type === 'rent' && stateRentTime > 0 && (
          <div
            className={`transition-all duration-500 ${
              stateRentTime > 0 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex items-center">
              <Common.Title className="text-2xl font-extrabold text-white">
                {(
                  parseFloat(String(item.skin_price)) *
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
          <div className="text-white">
            {!isLoadingRecommendedPrice ? (
              recommendedPrice
            ) : (
              <div className="h-6 w-16 animate-pulse rounded-lg bg-mesh-color-neutral-600" />
            )}
          </div>
        </div>

        {defaultID && (
          <div className="flex justify-between">
            <Common.Title className="text-mesh-color-neutral-200">
              Paint Seed
            </Common.Title>
            <p className="text-white">{defaultID}</p>
          </div>
        )}

        {thereIsFloat && (
          <div className="flex justify-between">
            <Common.Title className="text-mesh-color-neutral-200">
              Float
            </Common.Title>
            <div className="flex items-center">
              <p className="text-white">{item.skin_float}</p>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <Common.Title className="text-mesh-color-neutral-200">
            Tipo
          </Common.Title>
          <p className="text-white">{item.skin_category}</p>
        </div>

        <div className="flex justify-between">
          <Common.Title className="text-mesh-color-neutral-200">
            Raridade
          </Common.Title>
          <div className="flex items-center justify-center">
            <div
              className={`ml-2 h-[17px] w-[17px] rounded-[3px] border-[1px]`}
              style={{
                background: `#${ColorRarity.transform(item.skin_rarity)}`,
              }}
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
            {item.sale_type === 'rent' &&
              renderButton(
                <Common.Button
                  disabled={
                    (loading && hasConfigurations) || userStatus === 'loading'
                  }
                  onClick={() => {
                    if (userConfiguration.key) {
                      Toast.Error(
                        'A opção de aluguel ainda não está disponível.',
                      )
                      setRent(false)
                    } else {
                      Toast.Error(
                        'Para alugar um item, é necessário ter a chave adicionada nas configurações.',
                        7000,
                      )
                    }
                  }}
                  className="h-11 w-[167px] cursor-pointer border-none bg-mesh-color-primary-1400 font-semibold text-black opacity-100 disabled:opacity-10"
                >
                  Alugar
                </Common.Button>,
              )}
            <ModalBuyMain
              createTransaction={{
                skinPrice: Number(item.skin_price),
                skinId: item.id,
                token: session?.user?.token!,
                userId: session?.user?.steam?.steamid!,
                sellerId: item.seller_id,
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
                  if (userIsntOwnerSkin) {
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
          {item.sale_type === 'rent' && rent && (
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
