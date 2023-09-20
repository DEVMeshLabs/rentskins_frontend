/* eslint-disable camelcase */
'use client'
import Common from '@/components/Common'
import Form from '@/components/Forms'
import ISteamUser from '@/interfaces/steam.interface'
import useSkinsStore from '@/stores/skins.store'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { formResolver } from './info.schema'

type Props = {
  statusFloatText: string
  market_hash_name: string
  sale_type?: string
  skin_category: string
  skin_color: string
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
}

export function ModalSkinShowcaseInfo({
  sale_type = 'sale',
  skin_category,
  skin_color,
  skin_float,
  skin_image,
  skin_link_game,
  skin_link_steam,
  skin_name,
  skin_weapon,
  status = 'Pending',
  status_float,
  statusFloatText,
  market_hash_name,
  isSelected,
  asset_id,
  id,
}: Props) {
  const { data: session } = useSession()
  const trueSession = (session as ISteamUser) || {}
  const [disabled, setDisabled] = useState(true)
  const [savePrice, setSavePrice] = useState('')
  const {
    setSkinsToAdvertise,
    removeSkinToAdvertise,
    changeSkinToAdvertise,
    skinsToAdvertise,
  } = useSkinsStore()

  useEffect(() => {
    const savedSkin = skinsToAdvertise.filter(
      ({ id: skinId }) => skinId && id === skinId,
    )
    console.log(savedSkin)
    if (savedSkin.length) {
      setSavePrice(savedSkin[0].skin_price)
      console.log(savePrice)
    }
  }, [])

  const {
    register,
    watch,
    control,
    handleSubmit,
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
  const watchSell = watch('rent')
  const watchRent = watch('sell')

  const formattedValue = (value: string): number => {
    let newFormattedValue
    newFormattedValue = value.replace(/\./g, '')
    newFormattedValue = newFormattedValue.replace('R$ ', '')
    newFormattedValue = newFormattedValue.replace(',', '.')
    return Number(newFormattedValue)
  }

  useEffect(() => {
    setDisabled(
      !(
        watchValue &&
        watchValue?.length > 0 &&
        watchTerms &&
        (watchRent || watchSell)
      ),
    )
  }, [watchValue, watchTerms, watchSell, watchRent])

  const handleAddSkinsToAdvertise = () => {
    if (watchValue && watchValue?.length > 0 && watchTerms) {
      setSkinsToAdvertise({
        id,
        sale_type,
        seller_id: trueSession.user?.steam?.steamid as string,
        seller_name: trueSession.user?.name as string,
        skin_category,
        skin_color,
        skin_float,
        skin_image,
        skin_link_game,
        skin_link_steam,
        skin_name,
        skin_weapon,
        status,
        status_float,
        asset_id,
        skin_price: String(formattedValue(watchValue)),
      })
    }
  }

  const handleChangeSkinToAdvertise = () => {
    if (watchValue && watchValue?.length > 0 && watchTerms) {
      changeSkinToAdvertise(id, watchValue)
    }
  }

  const onSubmit = (data: any) => {
    handleAddSkinsToAdvertise()
  }

  return (
    <div className="flex h-full w-[40%] flex-col">
      <div>
        <Common.Title color="white" className="text-[24px]">
          {skin_name}
        </Common.Title>
        <p className="-mt-1 font-medium text-mesh-color-neutral-200">
          {skin_weapon} • {statusFloatText}
        </p>
      </div>

      <Form.Root
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex h-full w-full flex-col gap-0 rounded-lg bg-mesh-color-others-black p-4"
      >
        <div>
          <div className="mt-2 flex justify-between">
            <Common.Title size="md" bold={500} color="white">
              Preço recomendado:
            </Common.Title>
            <span className="text-mesh-color-accent-1000"></span>
          </div>
          <p className="w-[70%] text-mesh-color-neutral-200">
            Preço que recomendamos com base no mercado do momento
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
              placeHolder={savePrice ? `R$ ${savePrice}` : 'R$ 2.000,00'}
              register={register('value')}
              errors={errors.value}
            />
          </div>

          <div className="flex w-1/2 max-w-[50%] flex-col">
            <Common.Title bold={500} color="white" size="lg">
              Você irá receber
            </Common.Title>
            <div
              className="transitions-all max-w-[100%] overflow-hidden text-ellipsis rounded-md
              border-[2px] border-mesh-color-primary-1100/30 bg-mesh-color-others-eerie-black px-1 py-3
                ring-mesh-color-primary-1900 duration-300 placeholder:text-white/70 focus:border-mesh-color-primary-1100"
            >
              <Common.Title
                className="w-max-[200px] relative ml-2 w-fit text-ellipsis opacity-60"
                bold={500}
                color="white"
                size="lg"
              >
                {(
                  (formattedValue(watchValue || '') ||
                    formattedValue(savePrice)) -
                  (formattedValue(watchValue || '') ||
                    formattedValue(savePrice)) *
                    0.05
                ).toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                })}
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
          <Form.Input.Checkbox
            name="sell-rent"
            register={register('rent')}
            label="Aluguel"
          />
        </div>
        {/* ---------INPUT FIM -------------  */}

        <div className="space-y-6">
          {isSelected ? (
            <div className="flex gap-4">
              <Common.Button
                disabled={disabled}
                onClick={handleChangeSkinToAdvertise}
                className="mt-4 h-11 w-full border-transparent bg-mesh-color-primary-1400"
              >
                <Common.Title bold={600} className="rounded-xl">
                  Alterar
                </Common.Title>
              </Common.Button>
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
              onClick={handleAddSkinsToAdvertise}
            >
              Anunciar
            </Form.Button>
          )}
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
        </div>
      </Form.Root>
    </div>
  )
}
