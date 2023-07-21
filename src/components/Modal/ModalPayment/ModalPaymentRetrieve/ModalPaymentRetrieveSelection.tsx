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
import { useForm } from 'react-hook-form'
import { formResolver } from './selection.schema'

export function ModalPaymentRetrieveSelection() {
  const { setPaymentRetrieveIndex } = useComponentStore()
  const { setPaymentRetrieve } = usePaymentStore()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: formResolver,
    defaultValues: {
      method: 'mastercard',
      value: undefined,
    },
  })

  const onSubmit = (data: any) => {
    let currencyToNumber
    currencyToNumber = data?.value.replace(/\./g, '')
    currencyToNumber = currencyToNumber.replace('R$ ', '')
    currencyToNumber = currencyToNumber.replace(',', '.')

    setPaymentRetrieve({ method: data.method, value: Number(currencyToNumber) })
    setPaymentRetrieveIndex(1)
  }

  return (
    <Form.Root
      className="flex h-full w-full flex-col gap-7"
      onSubmit={handleSubmit(onSubmit)}
    >
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
            name="value"
            label="Valor a ser retirado"
            control={control}
            register={register('value')}
            errors={errors.value}
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
      <div className="-mt-10 w-2/3">
        <Common.Title
          bold={600}
          size="xl"
          className="mt-6 text-mesh-color-neutral-200"
        >
          Selecione o Método de Pagamento
        </Common.Title>
        <Form.Input.Radio.Default
          name="method"
          wrapperClassname="h-24 w-[25%]"
          labelClassName="transition-all bg-mesh-color-neutral-500 rounded-md border-2 border-transparent bg-green-500 h-full w-full flex items-center justify-center w-full
          hover:cursor-pointer hover:border-mesh-color-primary-600/50 peer-checked:border-mesh-color-primary-600 text-white"
          containerClassname="flex items-center justify-start gap-4 w-[700px]"
          items={renderRadioMethodOptions()}
          register={register('method')}
        />
      </div>
      <div className="mb-7 flex h-full items-end justify-end">
        <Form.Button
          buttonStyle={undefined}
          className="h-14 w-1/4 border-transparent bg-mesh-color-primary-1200 text-xl font-extrabold transition-all disabled:bg-mesh-color-neutral-500 disabled:text-mesh-color-neutral-400"
        >
          Retirar saldo
        </Form.Button>
      </div>
    </Form.Root>
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
    },
    {
      label: renderImage(ImagePaypal, 'paypal'),
      value: 'paypal',
    },
    {
      label: renderImage(ImageBankTransfer, 'banktransfer'),
      value: 'banktransfer',
    },
  ] as any
}
