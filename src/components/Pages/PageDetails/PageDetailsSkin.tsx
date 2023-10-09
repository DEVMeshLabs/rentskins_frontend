import Common from '@/components/Common'
import Form from '@/components/Forms'
import { IconCarrinho } from '@/components/Icons'
import { ModalConnectInventoryMain } from '@/components/Modal/ModalConnectInventory/ModalConnectInventoryMain'
import { IOptionalConfig } from '@/interfaces/IConfig'
import CartService from '@/services/cart.service'
import SkinService from '@/services/skin.service'
import Toast from '@/tools/toast.tool'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { signIn } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { formResolver } from './schemas/form.schema'
import useSkinsStore from '@/stores/skins.store'
import { ModalBuyMain } from '@/components/Modal/ModalBuy/ModalBuyMain'
import transformRarityInColor, {
  TItemRarity,
} from '@/utils/transformRarityInColor'

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
  skinMedianPrice: number
  defaultID: string
  skinId: string
  cartId: string
  assetId: string
  ownerSkin: string
  userId: string
  userName: string
  token: string
}

export function PageDetailsSkin({
  userStatus,
  userConfiguration,
  skinName,
  skinImage,
  skinMedianPrice,
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
  userName,
  token,
}: PropsTypes) {
  const [wasRaised, setWasRaised] = useState(false)
  const [rentPercentage, setRentPercentage] = useState(10)
  const [methodSelected, setMethodSelected] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [selectedRentTime, setSelectedRentTime] = useState(false)
  const [userIsntOwnerSkin, setUserIsntOwnerSkin] = useState(true)
  const customName = skinName.split('(')[0]
  const router = useRouter()
  const pathname = usePathname()
  const {
    setOpenModalBuySkin,
    setWhatModalOpenToBuySkin,
    setSkinToBuy,
    setRentTime,
    setItemAvailable,
  } = useSkinsStore()

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
  const { register, watch } = useForm({
    resolver: formResolver,
    defaultValues: {
      'rent-time': undefined,
    },
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

  const watchRentTime = watch('rent-time')

  useEffect(() => {
    switch (String(watchRentTime)) {
      case '7':
        return setRentPercentage(10)
      case '14':
        return setRentPercentage(18)
      case '21':
        return setRentPercentage(23)
    }
  }, [watchRentTime])

  useEffect(() => {
    if (deleteResult) {
      Toast.Error('Desculpe, o item não se encontra mais disponível.', 7000)
      router.push('/')
    }
  }, [deleteResult, router])

  useEffect(() => {
    console.log(methodSelected !== undefined)
    if (methodSelected !== undefined) {
      setLoading(true)
      refetchAvailability()
    } else {
      setLoading(false)
    }
  }, [methodSelected, refetchAvailability, hasConfigurations])

  useEffect(() => {
    console.log(resultAvailability?.data)
    if (methodSelected === 'buy' && resultAvailability?.status === 200) {
      setLoading(false)
      setRentTime(watchRentTime!)
      setWhatModalOpenToBuySkin(0)
      setItemAvailable(true)
    } else if (
      methodSelected === 'rent' &&
      resultAvailability?.status === 200
    ) {
      setLoading(false)
      setRentTime(watchRentTime!)
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
    if (resultAvailability?.request && !refetchingAvailability) {
      if (resultAvailability?.request.status === 200) {
        proceedItem()
      } else if (resultAvailability?.request.status === 404) {
        deleteItem()
        setOpenModalBuySkin(false)
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
            {customName}
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

        <div
          className={`transition-all duration-500 ${
            watchRentTime !== undefined && watchRentTime !== null
              ? 'opacity-100'
              : 'opacity-0'
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
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between">
          <Common.Title className="text-mesh-color-neutral-200">
            Tendências de mercado
          </Common.Title>
          <p className="text-white">
            {skinMedianPrice.toLocaleString('pt-br', {
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

        <div className="flex justify-between">
          <Common.Title className="text-mesh-color-neutral-200">
            Float
          </Common.Title>
          <div className="flex items-center">
            <p className="text-white">{skinFloat}</p>
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
            Raridade
          </Common.Title>
          <div className="flex items-center justify-center">
            <p className="text-white">{skinRarity || 'Consumer grade'}</p>
            <div
              className={`ml-2 h-[17px] w-[17px] rounded-[3px] border-[1px]`}
              style={{ background: `#${transformRarityInColor(skinRarity)}` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <div className="">
          <Common.Title className="font-semibold text-white">
            Selecione o período de Aluguel
          </Common.Title>
          <Form.Input.Radio.Default
            containerClassname="flex gap-2 mt-2"
            disabled={
              (loading && hasConfigurations) || userStatus === 'loading'
            }
            labelClassName={classNames(
              'peer-disabled:opacity-10 peer-checked:bg-mesh-color-primary-1200 transition-all w-full h-full border-2 text-white p-2 rounded-lg border-mesh-color-neutral-400 peer-checked:text-black cursor-pointer hover:bg-mesh-color-neutral-600 font-medium',
              {
                'bg-mesh-color-rarity-lowest text-white': selectedRentTime,
              },
            )}
            onClick={() => {
              setSelectedRentTime(false)
            }}
            name="rent-time"
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
            {renderButton(
              <Common.Button
                onClick={async () => {
                  if (userIsntOwnerSkin) {
                    if (!watchRentTime) {
                      setSelectedRentTime(true)
                      Toast.Error(
                        'Você deve selecionar um período para prosseguir com o aluguel.',
                      )
                    } else {
                      setSkinToBuy(skinToBuy)
                      setRentTime(+watchRentTime)
                      setWhatModalOpenToBuySkin(1)
                      setOpenModalBuySkin(true)
                    }
                  } else {
                    Toast.Error('Você não pode alugar o seu próprio item.')
                  }
                }}
                disabled={
                  (loading && hasConfigurations) || userStatus === 'loading'
                }
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
                    setMethodSelected('buy')
                    setSkinToBuy(skinToBuy)
                    setWhatModalOpenToBuySkin(0)
                    setOpenModalBuySkin(true)
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
      </div>
    </div>
  )
}
