'use client'
import Common from '@/components/Common'
import Form from '@/components/Forms'
import useSkinsStore from '@/stores/skins.store'
import useUserStore from '@/stores/user.store'
import { useEffect, useState } from 'react'

type Props = {
  name: string
  weapon: string
  statusFloatText: string
  preco: string
}

export function ModalSkinShowcaseInfo({
  name,
  preco,
  statusFloatText,
  weapon,
}: Props) {
  const [disabled, setDisabled] = useState(true)
  const [salePrice, setSalePrice] = useState('')
  const [checked, setChecked] = useState(false)
  const { setSkinsToAdvertise } = useSkinsStore()
  const {
    user: { steamid, username },
  } = useUserStore()

  console.log({ name, preco, statusFloatText, weapon })

  useEffect(() => {
    setDisabled(!(salePrice.length > 0 && checked))
  }, [salePrice, checked])

  const handleAddSkinsToAdvertise = () => {
    if (salePrice.length > 0 && checked) {
      setSkinsToAdvertise({
        sale_type: '',
        seller_id: steamid,
        seller_name: username,
        skin_category: '',
        skin_color: '',
        skin_float: '',
        skin_image: '',
        skin_link_game: '',
        skin_link_steam: '',
        skin_name: '',
        skin_price: '',
        skin_weapon: '',
        status: '',
        status_float: '',
      })
    }
  }

  return (
    <div className="flex h-full w-[40%] flex-col">
      <div>
        <Common.Title color="white" className="text-[24px]">
          {name}
        </Common.Title>
        <p className="-mt-1 font-medium text-mesh-color-neutral-200">
          {weapon} • {statusFloatText}
        </p>
      </div>

      <div className="mt-4 h-full w-full rounded-lg bg-mesh-color-others-black p-4">
        <div>
          <div className="mt-2 flex justify-between">
            <Common.Title size="md" bold={500} color="white">
              Preço recomendado
            </Common.Title>
            <span className="text-mesh-color-accent-1000">R$: {preco}</span>
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
              state={salePrice}
              setState={setSalePrice}
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
          <Common.Button
            disabled={disabled}
            className="mt-4 h-11 w-full border-transparent bg-mesh-color-primary-1400"
            onClick={handleAddSkinsToAdvertise}
          >
            <Common.Title bold={600} className="rounded-xl">
              Anunciar
            </Common.Title>
          </Common.Button>
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
