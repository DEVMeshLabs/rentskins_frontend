/* eslint-disable camelcase */
'use client'
import Common from '@/components/Common'
import Form from '@/components/Forms'

import * as Dialog from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { formResolver } from '../ModalSkinShowcase/info.schema'
import SkinService from '@/services/skin.service'
import { useQuery } from '@tanstack/react-query'

type Props = {
  statusFloatText: string
  sale_type?: string
  skin_category: string
  skin_color: string
  skin_float: string
  skin_image: string
  skin_link_game: string
  skin_link_steam: string
  skin_name: string
  skin_price: number
  skin_weapon: string
  status?: string
  status_float: string
  id: string
  asset_id: string
}

export function ModalInfoItem({
  skin_price,
  skin_name,
  skin_weapon,
  statusFloatText,
}: Props) {
  const [disabled, setDisabled] = useState(true)
  const { data: averagePrice } = useQuery({
    queryKey: ['test', skin_name],
    queryFn: () => {
      console.log(skin_name)
      return SkinService.getItemAveragePrice([skin_name])
    },
    enabled: !!skin_name,
  })
  console.log(averagePrice)

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

  const onSubmit = (data: any) => {}

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
            <span className="text-mesh-color-accent-1000">
              {averagePrice?.data[0] || 'Não encontrado'}
            </span>
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
              placeHolder={
                skin_price
                  ? `${formattedValue(String(skin_price)).toLocaleString(
                      'pt-br',
                      {
                        currency: 'BRL',
                        style: 'currency',
                        minimumFractionDigits: 2,
                      },
                    )}`
                  : 'R$ 2.000,00'
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
                  (formattedValue(watchValue ? String(watchValue) : '') ||
                    formattedValue(skin_price ? String(skin_price) : '')) -
                  (formattedValue(watchValue ? String(watchValue) : '') ||
                    formattedValue(skin_price ? String(skin_price) : '')) *
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
          <Dialog.Close className="w-full">
            <Common.Button
              disabled={disabled}
              className="mt-4 h-11 w-full border-transparent bg-mesh-color-primary-1400 font-bold disabled:bg-mesh-color-neutral-400"
            >
              <Common.Title bold={600} className="rounded-xl">
                Editar
              </Common.Title>
            </Common.Button>
          </Dialog.Close>
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

// {
//   id,
//   sale_type,
//   seller_id: trueSession.user?.steam?.steamid as string,
//   seller_name: trueSession.user?.name as string,
//   skin_category,
//   skin_color,
//   skin_float,
//   skin_image,
//   skin_link_game: inspectLink,
//   skin_link_steam,
//   skin_name,
//   skin_weapon,
//   status,
//   status_float,
//   asset_id,
//   median_price: removeSign(recomended_price),
//   skin_price: formattedValue(String(watchValue)),
// }
