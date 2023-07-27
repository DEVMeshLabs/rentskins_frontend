/* eslint-disable camelcase */
'use client'
import Common from '@/components/Common'
import Form from '@/components/Forms'
import useSkinsStore from '@/stores/skins.store'
import useUserStore from '@/stores/user.store'
import { useEffect, useState } from 'react'

type Props = {
  statusFloatText: string
  recommendedPrice?: string
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
  recommendedPrice = '2.000,00',
  isSelected,
  id,
}: Props) {
  const [disabled, setDisabled] = useState(true)
  const [skin_price, setSkin_price] = useState('')
  const [checked, setChecked] = useState(false)
  const { setSkinsToAdvertise, removeSkinToAdvertise, changeSkinToAdvertise } =
    useSkinsStore()
  const {
    user: { steamid, username },
  } = useUserStore()

  useEffect(() => {
    setDisabled(!(skin_price.length > 0 && checked))
  }, [skin_price, checked])

  const handleAddSkinsToAdvertise = async () => {
    if (skin_price.length > 0 && checked) {
      setSkinsToAdvertise({
        id,
        sale_type,
        seller_id: steamid,
        seller_name: username,
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
        skin_price,
      })
    }
  }

  const handleChangeSkinToAdvertise = () => {
    if (skin_price.length > 0 && checked) {
      changeSkinToAdvertise(id, skin_price)
    }
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

      <div className="mt-4 h-full w-full rounded-lg bg-mesh-color-others-black p-4">
        <div>
          <div className="mt-2 flex justify-between">
            <Common.Title size="md" bold={500} color="white">
              Preço recomendado
            </Common.Title>
            <span className="text-mesh-color-accent-1000">
              R$: {recommendedPrice}
            </span>
          </div>
          <p className="w-[70%] text-mesh-color-neutral-200">
            Preço que recomendamos com base no mercado do momento
          </p>
          <div className="mt-6 rounded border-b border-mesh-color-neutral-200" />
        </div>

        {/* ---------INPUT -------------  */}
        <div className="mt-5 flex w-full gap-4">
          <div className="w-full space-y-2">
            <Common.Title bold={500} color="white">
              Preço de venda
            </Common.Title>
            <Form.Input.Text
              state={skin_price}
              setState={setSkin_price}
              placeholder="R$ 2.000,00"
              className="h-8 w-full rounded-md bg-mesh-color-neutral-600 text-mesh-color-neutral-200"
            />
          </div>

          <div className="w-full space-y-2">
            <Common.Title bold={500} color="white">
              Você irá receber
            </Common.Title>
            <Form.Input.Text
              state={''}
              setState={() => {}}
              placeholder="R$ 32,21"
              className="h-8 w-full rounded-md bg-mesh-color-neutral-600 text-mesh-color-neutral-200"
            />
          </div>
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
            <Common.Button
              disabled={disabled}
              className="mt-4 h-11 w-full border-transparent bg-mesh-color-primary-1400"
              onClick={handleAddSkinsToAdvertise}
            >
              <Common.Title bold={600} className="rounded-xl">
                Anunciar
              </Common.Title>
            </Common.Button>
          )}
          <Form.Input.Checkbox
            onChange={({ target: { checked } }) => setChecked(checked)}
            label="Estou ciente que esta plataforma possui a modalidade de locação, e
            meu item poderá ser disponibilizado em caráter temporário, fazendo
            com que o recebimento pela venda ou locação deste item só seja
            realizado no prazo final da transação."
          />
        </div>
      </div>
    </div>
  )
}
