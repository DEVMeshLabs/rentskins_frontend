'use client'
import ImageCard from '@/../public/payment/card.png'
import ImagePIX from '@/../public/payment/pix.png'
import ImageTicket from '@/../public/payment/ticket.png'
import Common from '@/components/Common'
import Form from '@/components/Forms'
import { IconClose } from '@/components/Icons/IconClose'
import { IconMoneyBag } from '@/components/Icons/IconMoneyBag'
import { LayoutLoading } from '@/components/Layout/LayoutLoading'
import ISteamUser from '@/interfaces/steam.interface'
import ConfigService from '@/services/config.service'
import StripeService from '@/services/stripe.service'
import URLQuery from '@/tools/urlquery.tool'
import * as Dialog from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { formResolver } from './add.schema'

interface IProps {
  afterFormSubmit: () => void
}

export function ModalPaymentAdd({ afterFormSubmit }: IProps) {
  const { data: session } = useSession()
  const [payment, setPayment] = useState({ value: 5, method: 'card' })
  const [startPayment, setStartPayment] = useState(false)
  const trueSession = session as ISteamUser
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: formResolver,
    defaultValues: {
      method: 'card',
      value: undefined,
      valueButtons: 'R$ 5,00',
    },
  })

  const { data: userConfigurations } = useQuery({
    queryKey: ['UserConfig', trueSession.user?.steam?.steamid],
    queryFn: async () =>
      ConfigService.findByConfigUserId(
        trueSession.user?.steam?.steamid!,
        trueSession.user?.token!,
      ),
  })

  const { data: createdPayment, refetch: createPayment } = useQuery({
    queryKey: ['Payment'],
    queryFn: () =>
      StripeService.createPayment(
        {
          owner_id: trueSession.user?.steam?.steamid!,
          email: userConfigurations?.data.owner_email!,
          success_url: ('https://rentskins-testing.vercel.app' +
            '/pagamento/recarregar') as string,
          cancel_url: ('https://rentskins-testing.vercel.app' +
            '/pagamento/recarregar') as string,
          amount: Number(payment.value),
          payment_method: payment.method as 'card' | 'boleto' | 'pix',
          cpf: userConfigurations?.data.owner_cpf!,
        },
        trueSession.user?.token!,
      ),
    cacheTime: 0,
    enabled: false,
  })

  useEffect(() => {
    if (payment && startPayment) {
      createPayment()
      afterFormSubmit()
      setStartPayment(false)
    }
  }, [payment, startPayment, afterFormSubmit, createPayment])

  useEffect(() => {
    if (createdPayment?.request.status === 200) {
      redirect(createdPayment.data.url)
    }
  }, [createdPayment])

  const watchValue = watch('value')

  const onSubmit = (data: any) => {
    setIsLoading(true)

    if (data.value === '' || data.value === undefined) {
      let currencyToNumber
      currencyToNumber = data?.valueButtons.replace(/\./g, '')
      currencyToNumber = currencyToNumber.replace('R$ ', '')
      currencyToNumber = currencyToNumber.replace(',', '.')

      setPayment({ method: data.method, value: currencyToNumber })
    } else {
      let currencyToNumber
      currencyToNumber = data?.value.replace(/\./g, '')
      currencyToNumber = currencyToNumber.replace('R$ ', '')
      currencyToNumber = currencyToNumber.replace(',', '.')

      setPayment({ method: data.method, value: Number(currencyToNumber) })
    }

    setStartPayment(true)
  }

  return (
    <Dialog.Content
      className="fixed left-1/2 top-1/2 z-30 h-3/5 w-2/3 -translate-x-1/2 -translate-y-1/2
overflow-y-auto rounded-2xl bg-mesh-color-neutral-700"
    >
      <div className="flex h-full w-full">
        <div className="h-[586px] w-1/3 rounded-l-2xl px-6 pt-6 xg:w-1/4">
          <Common.Title
            bold={400}
            size="xl"
            color="white"
            className="leading-none"
          >
            Selecione a forma de pagamento
          </Common.Title>
          <Form.Input.Radio.Default
            name="method"
            wrapperClassname="h-24 w-full"
            labelClassName="transition-all peer-disabled:opacity-20 bg-mesh-color-neutral-500 rounded-md border-2 border-transparent bg-green-500 h-full w-full flex items-center justify-center w-full
          hover:cursor-pointer hover:border-mesh-color-primary-600/50 peer-checked:border-mesh-color-primary-600 text-white"
            containerClassname="mt-4 grid grid-cols-2 items-center justify-start gap-1 w-full"
            items={renderRadioMethodOptions()}
            register={register('method')}
          />
        </div>
        <LayoutLoading label="Processando..." enabled={isLoading}>
          <div className="flex h-[586px] w-3/4 flex-col items-center justify-start">
            <div className=" mt-6 flex w-11/12 items-center justify-between">
              <Dialog.Title>
                <Common.Title bold={800} size="2xl" color="white">
                  Adicione Créditos
                </Common.Title>
              </Dialog.Title>
              <Dialog.Close
                asChild
                onClick={() =>
                  router.push(URLQuery.removeQuery(['modalopen', 'modaltype']))
                }
              >
                <Common.Button className="border-transparent">
                  <IconClose />
                </Common.Button>
              </Dialog.Close>
            </div>
            <Form.Root
              className="mt-3 flex h-full w-full flex-col justify-between"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex h-min w-full justify-around">
                <div className="flex w-1/2 flex-col">
                  <Form.Input.Currency
                    name="value"
                    register={register('value')}
                    control={control}
                    label="Valor do Pagamento"
                    placeHolder="R$ 0,00"
                    errors={errors.value}
                  />
                  <Form.Input.Radio.Default
                    name="value"
                    wrapperClassname="h-16 w-full"
                    disabled={
                      watchValue !== 'R$ 0,00' &&
                      watchValue !== undefined &&
                      watchValue !== ''
                    }
                    labelClassName="transition-all bg-mesh-color-neutral-500 rounded-md border-2 border-transparent bg-green-500 h-full w-full flex items-center justify-center w-full
                    hover:cursor-pointer hover:border-mesh-color-primary-600/50 peer-checked:border-mesh-color-primary-600 text-white peer-disabled:border-transparent
                    peer-disabled:bg-mesh-color-neutral-800 peer-disabled:text-mesh-color-neutral-500 peer-disabled:cursor-default "
                    containerClassname="grid grid-cols-2 items-center justify-start gap-1 w-full mt-2"
                    items={renderRadioValueOptions()}
                    register={register('valueButtons')}
                  />
                </div>
                <div className="hidden w-1/3 self-center xg:block">
                  <IconMoneyBag />
                </div>
              </div>
              <div className="mb-8 flex w-11/12 items-center justify-between gap-2 self-center md:gap-0">
                <span className="leading text-white">
                  Ao prosseguir para finalizar o pagamento, você concorda com os
                  nossos{' '}
                  <Link
                    href="/termos-de-uso"
                    tabIndex={-1}
                    target="_blank"
                    className="hover:text-inherit/50 text-mesh-color-primary-1000"
                  >
                    Termos de Serviço
                  </Link>
                  ,{' '}
                  <Link
                    href="/privacidade"
                    tabIndex={-1}
                    target="_blank"
                    className="text-mesh-color-primary-1000"
                  >
                    Política de Privacidade
                  </Link>{' '}
                  e{' '}
                  <Link
                    href="/termos-de-uso"
                    tabIndex={-1}
                    target="_blank"
                    className="text-mesh-color-primary-1000"
                  >
                    Política de Reembolso
                  </Link>
                  .
                </span>
                <Form.Button
                  buttonStyle={undefined}
                  className="h-16 w-1/2 border-transparent bg-mesh-color-primary-1200 text-xl font-extrabold transition-all disabled:bg-mesh-color-neutral-500 disabled:text-mesh-color-neutral-400"
                >
                  Depositar
                </Form.Button>
              </div>
            </Form.Root>
          </div>
        </LayoutLoading>
      </div>
    </Dialog.Content>
  )
}

const renderRadioMethodOptions = () => {
  const renderImage = (image: StaticImageData, alt: string) => (
    <div className="flex items-center justify-center gap-4">
      <Image src={image} alt={alt} width={64} />
    </div>
  )

  return [
    {
      label: renderImage(ImageCard, 'mastercard'),
      value: 'card',
    },
    {
      label: renderImage(ImagePIX, 'pix'),
      value: 'pix',
    },
    {
      label: renderImage(ImageTicket, 'boleto'),
      value: 'boleto',
    },
  ] as any
}

const renderRadioValueOptions = () => {
  const elements = [
    { label: <span>R$ 5,00</span>, value: 'R$ 5,00' },
    { label: <span>R$ 10,00</span>, value: 'R$ 10,00' },
    { label: <span>R$ 25,00</span>, value: 'R$ 25,00' },
    { label: <span>R$ 50,00</span>, value: 'R$ 50,00' },
    { label: <span>R$ 100,00</span>, value: 'R$ 100,00' },
    { label: <span>R$ 200,00</span>, value: 'R$ 200,00' },
    { label: <span>R$ 500,00</span>, value: 'R$ 500,00' },
    { label: <span>R$ 1.000,00</span>, value: 'R$ 1000,00' },
  ]

  return elements
}
