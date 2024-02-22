/* eslint-disable camelcase */
'use client'
import Common from '@/components/Common'
import Form from '@/components/Forms'
import ISteamUser from '@/interfaces/steam.interface'

import useSkinsStore from '@/stores/skins.store'
import { Values } from '@/tools/values.tool'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { formResolver } from './info.schema'
import Toast from '@/tools/toast.tool'

type Props = {
  statusFloatText: string
  sale_type?: string
  skin_category: string
  skin_rarity: string
  skin_float: string
  skin_image: string
  skin_link_game: string
  skin_link_steam: string
  skin_name: string
  skin_weapon: string
  status?: string
  status_float: string
  id: string
  isSelected: boolean
  asset_id: string
  recommended_price: number | string
  isPriceLoading: boolean
  isRentable: boolean
  stickers: Array<{ url: string; name: string }>
  apiKey: boolean
  onOpenChange: () => void
}

export function ModalSkinShowcaseInfo({
  sale_type = 'sale',
  onOpenChange,
  apiKey,
  skin_category,
  isRentable,
  skin_rarity,
  skin_float,
  skin_image,
  skin_link_game,
  skin_link_steam,
  skin_name,
  skin_weapon,
  status = 'Pending',
  status_float,
  statusFloatText,
  stickers,
  isPriceLoading,
  recommended_price,
  isSelected,
  asset_id,
  id,
}: Props) {
  const { data: session } = useSession()
  const trueSession = (session as ISteamUser) || {}
  const [disabled, setDisabled] = useState(true)
  const [savePrice, setSavePrice] = useState<null | number>(null)
  const [whatFunctionExecute, setWhatFunctionExecute] = useState<
    'add' | 'change'
  >('add')
  const {
    setSkinsToAdvertise,
    removeSkinToAdvertise,
    changeSkinToAdvertise,
    skinsToAdvertise,
  } = useSkinsStore()

  useEffect(() => {
    const savedSkin = skinsToAdvertise.filter(
      ({ asset_id }) => asset_id && id === asset_id,
    )

    if (savedSkin.length) {
      setSavePrice(savedSkin[0].skin_price)
    }
  }, [])

  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: formResolver,
    defaultValues: {
      value: undefined,
      warning: undefined,
      terms: false,
      rent: false,
      sell: false,
    },
  })
  const watchValue = watch('value')
  const watchTerms = watch('terms')
  const watchSell = watch('sell')
  const watchRent = watch('rent')

  useEffect(() => {
    setDisabled(
      !(
        watchValue &&
        watchValue?.length > 0 &&
        (watchTerms || !isRentable) &&
        (watchRent || watchSell)
      ),
    )
  }, [watchValue, watchTerms, watchSell, watchRent, isRentable])

  const handleAddSkinsToAdvertise = () => {
    if (watchValue && watchValue?.length > 0 && (watchTerms || !isRentable)) {
      setSkinsToAdvertise({
        sale_type: watchRent && isRentable ? 'rent' : 'sale',
        seller_id: trueSession.user?.steam?.steamid as string,
        seller_name: trueSession.user?.name as string,
        skin_category,
        skin_rarity,
        skin_float,
        skin_image,
        skin_link_game,
        skin_link_steam,
        skin_name,
        skin_weapon,
        stickers,
        status,
        status_float,
        asset_id,
        median_price: Number(recommended_price) || 0,
        skin_price: Values.currencyToNumber(String(watchValue))!,
      })
      onOpenChange()
    }
  }

  const handleChangeSkinToAdvertise = () => {
    if (watchValue && watchValue?.length > 0 && (watchTerms || !isRentable)) {
      changeSkinToAdvertise(
        id,
        Values.currencyToNumber(String(watchValue))!,
        !!watchRent,
      )
      onOpenChange()
    }
  }

  const onSubmit = (data: any) => {
    if (whatFunctionExecute === 'add') {
      handleAddSkinsToAdvertise()
    } else {
      handleChangeSkinToAdvertise()
    }
  }

  return (
    <div className="flex h-full w-[70%] flex-col transition-all 2xl:w-[50%]">
      <div>
        <Common.Title color="white" className="text-[28px]" bold={600}>
          {skin_name}
        </Common.Title>
        <p className="-mt-1 font-medium text-mesh-color-neutral-200">
          {skin_weapon} {statusFloatText && `• ${statusFloatText}`}
        </p>
      </div>

      <Form.Root
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex w-full flex-1 flex-col gap-0 rounded-lg bg-mesh-color-others-black p-4"
      >
        <div>
          <div className="mt-2 flex justify-between">
            <Common.Title size="md" bold={500} color="white">
              Preço Recomendado:
            </Common.Title>
            <span className="text-mesh-color-accent-1000">
              {!isPriceLoading ? (
                recommended_price
              ) : (
                <div className="h-6 w-16 animate-pulse rounded-lg bg-mesh-color-neutral-600" />
              )}
            </span>
          </div>
          <p className="w-full pt-2 text-sm leading-tight text-mesh-color-neutral-200">
            Preço que recomendamos com base no mercado do momento.
          </p>
          <div className="mt-6 rounded border-b border-mesh-color-neutral-200" />
        </div>

        {/* ---------INPUT -------------  */}
        <div className="mt-5 flex w-full max-w-[100%] gap-4">
          <div className="w-1/2 max-w-[50%]">
            <Form.Input.Currency
              name="value"
              control={control}
              maxLength={10}
              label="Preço de Venda"
              placeHolder={
                savePrice
                  ? `${Values.currencyToNumber(
                      String(savePrice),
                    )!.toLocaleString('pt-br', {
                      currency: 'BRL',
                      style: 'currency',
                      minimumFractionDigits: 2,
                    })}`
                  : 'R$ 0,00'
              }
              register={register('value')}
              errors={errors.value}
            />
          </div>

          <div className="flex w-1/2 max-w-[50%] flex-col">
            <Common.Title bold={500} color="white" size="lg">
              Você irá receber
            </Common.Title>
            <div
              className="transitions-all max-w-[100%] select-none overflow-hidden text-ellipsis rounded-md
              border-[2px] border-mesh-color-primary-1100/30 bg-mesh-color-others-eerie-black px-1 py-3
                ring-mesh-color-primary-1900 duration-300 placeholder:text-white/70 focus:border-mesh-color-primary-1100"
            >
              <Common.Title
                className="w-max-[200px] relative ml-2 w-fit text-ellipsis opacity-60"
                bold={500}
                color="white"
                size="lg"
              >
                {watchValue || savePrice
                  ? (
                      (Values.currencyToNumber(
                        watchValue ? String(watchValue) : '',
                      )! ||
                        Values.currencyToNumber(
                          savePrice ? String(savePrice) : '',
                        )!) -
                      (Values.currencyToNumber(
                        watchValue ? String(watchValue) : '',
                      )! ||
                        Values.currencyToNumber(
                          savePrice ? String(savePrice) : '',
                        )!) *
                        0.04
                    ).toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                      minimumFractionDigits: 2,
                    })
                  : 'R$ 0,00'}
              </Common.Title>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Form.Input.Checkbox
            name="sell-rent"
            register={register('sell')}
            label="Venda"
            checked={true}
          />
          {isRentable && (
            <Form.Input.Checkbox
              name="sell-rent"
              register={register('rent')}
              label="Aluguel"
              checked={watchRent}
              onChange={() => {
                if (!apiKey) {
                  Toast.Error(
                    'Para alugar um item, é necessário ter a chave adicionada nas configurações.',
                    7000,
                  )
                  setValue('rent', false)
                }
              }}
            />
          )}
        </div>
        {/* ---------INPUT FIM -------------  */}

        <div className="space-y-6">
          {isSelected ? (
            <div className="flex gap-4">
              <Form.Button
                disabled={disabled}
                onClick={() => setWhatFunctionExecute('change')}
                className="mt-4 h-11 w-full border-transparent bg-mesh-color-primary-1400 text-center font-bold disabled:bg-mesh-color-neutral-400"
              >
                <Common.Title bold={600} className="rounded-xl">
                  Alterar
                </Common.Title>
              </Form.Button>
              <Common.Button
                onClick={() => removeSkinToAdvertise(id)}
                className="mt-4 h-11 w-3/5 border-mesh-color-neutral-200"
              >
                <Common.Title bold={600} color="white" className="rounded-xl">
                  Remover
                </Common.Title>
              </Common.Button>
            </div>
          ) : (
            <Form.Button
              disabled={disabled}
              buttonStyle={undefined}
              className="mt-4 h-11 w-full border-transparent bg-mesh-color-primary-1400 font-bold disabled:bg-mesh-color-neutral-400"
            >
              Anunciar
            </Form.Button>
          )}
          {isRentable && (
            <Form.Input.Checkbox
              name="terms"
              wrapperClassname="gap-4"
              labelClassName="text-sm text-justify text-white"
              label="Estou ciente que esta plataforma possui a modalidade de locação, e
            meu item poderá ser disponibilizado em caráter temporário, fazendo
            com que o recebimento pela venda ou locação deste item só seja
            realizado no prazo final da transação."
              register={register('terms')}
              errors={errors.warning}
            />
          )}
        </div>
      </Form.Root>
    </div>
  )
}
