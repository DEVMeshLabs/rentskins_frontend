'use client'
import ImageBankTransfer from '@/../public/payment/banktransfer.png'
import ImageMastercard from '@/../public/payment/mastercard.png'
import ImagePaypal from '@/../public/payment/paypal.png'
import Common from '@/components/Common'
import Form from '@/components/Forms'
import { IconShield } from '@/components/Icons'
import useComponentStore from '@/stores/components.store'
import usePaymentStore from '@/stores/payment.store'
import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'

export function ModalPaymentRetrieveSelection() {
  const { setPaymentRetrieveIndex } = useComponentStore()
  const [selectedValue, setSelectedValue] = useState(0)
  const [selectedMethod, setSelectedMethod] = useState<
    'mastercard' | 'paypal' | 'banktransfer'
  >('mastercard')
  const { setPaymentRetrieve } = usePaymentStore()

  const handleOnWithdraw = () => {
    let formattedValue: string | number = String(selectedValue)
    formattedValue = Number(formattedValue.replace(',', '.'))

    setPaymentRetrieve({ method: selectedMethod, value: formattedValue })
    setPaymentRetrieveIndex(1)
  }

  return (
    <div className="flex h-full w-full flex-col gap-7">
      <div className="mt-4 flex items-start justify-between">
        <div className="flex flex-col items-start justify-start gap-4">
          <div>
            <Common.Title
              bold={600}
              size="xl"
              className="text-mesh-color-neutral-200"
            >
              Levantamento dentro da plataforma
            </Common.Title>
            <Common.Title bold={800} color="white" size="2xl">
              R$ 0,00
            </Common.Title>
          </div>
          <div>
            <Common.Title
              bold={600}
              size="xl"
              className="text-mesh-color-neutral-200"
            >
              Saldo na Plataforma
            </Common.Title>
            <Common.Title bold={800} color="white" size="2xl">
              R$ 0,00
            </Common.Title>
          </div>
          <Form.Input.Currency
            enableDefault={false}
            label="Valor a ser retirado"
            labelClassName="w-full mt-2 font-semibold text-mesh-color-neutral-200"
            inputClassName="w-full text-white bg-mesh-color-neutral-500 py-3 rounded-lg"
            currencyClassname="text-gray-400"
            state={selectedValue}
            setState={setSelectedValue}
          />
        </div>
        <div className="flex items-center gap-2 text-mesh-color-neutral-200">
          <div className="flex items-center justify-center rounded-lg bg-mesh-color-primary-1900/20 px-2 py-2">
            <IconShield
              width={16}
              height={16}
              stroke="#C5EA56"
              fill="#C5EA56"
            />
          </div>
          <span> Segurança KYC </span>
        </div>
      </div>
      <div className="w-2/3">
        <Common.Title
          bold={600}
          size="xl"
          className="mt-6 text-mesh-color-neutral-200"
        >
          Selecione o Método de Pagamento
        </Common.Title>
        <Form.Input.Radio.Block
          name="payment-recharge-method"
          state={selectedMethod}
          setState={setSelectedMethod}
          containerClassname="flex gap-2 mt-4"
          wrapperClassname="h-28 w-48"
          imageClassname="w-20"
          options={renderRadioMethodOptions()}
        />
      </div>
      <div className="mb-7 flex h-full items-end justify-end">
        <Common.Button
          disabled={selectedValue <= 0}
          className="h-14 w-1/4 border-transparent bg-mesh-color-primary-1200 text-xl font-extrabold transition-all disabled:bg-mesh-color-neutral-500 disabled:text-mesh-color-neutral-400"
          onClick={() => handleOnWithdraw()}
        >
          Retirar saldo
        </Common.Button>
      </div>
    </div>
  )
}

const renderRadioMethodOptions = () => {
  const renderImage = (image: StaticImageData, alt: string) => (
    <div className="flex items-center justify-center gap-4">
      <Image src={image} alt={alt} width={64} />
      <p className="flex flex-col">
        <span className="text-xs">Via</span>
        <span className="text-sm">Paybank</span>
      </p>
    </div>
  )

  return [
    {
      label: renderImage(ImageMastercard, 'mastercard'),
      value: 'mastercard',
      labelType: 'node',
    },
    {
      label: renderImage(ImagePaypal, 'paypal'),
      value: 'paypal',
      labelType: 'node',
    },
    {
      label: renderImage(ImageBankTransfer, 'banktransfer'),
      value: 'banktransfer',
      labelType: 'node',
    },
  ] as any
}
