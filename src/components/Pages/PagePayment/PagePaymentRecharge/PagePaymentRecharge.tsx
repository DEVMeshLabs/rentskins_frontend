'use client'
import Common from '@/components/Common'
import { IconLeftArrow } from '@/components/Icons/IconLeftArrow'
import { LayoutLoading } from '@/components/Layout/LayoutLoading'
import ISteamUser from '@/interfaces/steam.interface'
import StripeService from '@/services/stripe.service'
import usePaymentStore from '@/stores/payment.store'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { notFound, useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { PagePaymentRechargeMastercard } from './PagePaymentRechargeMastercard'
import { PagePaymentRechargePix } from './PagePaymentRechargePix'
import { PagePaymentRechargeTicket } from './PagePaymentRechargeTicket'

export default function PagePaymentRecharge() {
  const { method } = useParams()
  const { data: session } = useSession()
  const trueSession = session as ISteamUser

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [methodComponent, setMethodComponent] = useState<
    undefined | React.ReactNode
  >(undefined)
  const { paymentAdd } = usePaymentStore()

  const { data, isRefetching, refetch } = useQuery({
    queryKey: ['Payment', paymentAdd.method, paymentAdd.value],
    queryFn: () =>
      StripeService.createPayment(
        { amount: String(Number(paymentAdd.value)) },
        trueSession.user?.token!,
      ),
    cacheTime: 0,
    enabled: false,
  })

  console.log(data)
  console.log(data?.data)
  console.log(isRefetching)
  console.log(String(Number(paymentAdd.value)))

  useEffect(() => {
    const handleOnSubmit = (data: any) => {
      console.log(data)
      setIsLoading(true)
      console.log(paymentAdd)
      refetch()
      // router.push('/pagamento/recarregar/sucesso')
    }

    const handleOnCancel = () => {
      router.push('/')
    }

    const methodComponents = {
      mastercard: (
        <PagePaymentRechargeMastercard
          handleFormCancel={handleOnCancel}
          handleFormSubmit={handleOnSubmit}
        />
      ),
      pix: (
        <PagePaymentRechargePix
          handleFormSubmit={handleOnSubmit}
          handleFormCancel={handleOnCancel}
        />
      ),
      boleto: (
        <PagePaymentRechargeTicket
          handleFormSubmit={handleOnSubmit}
          handleFormCancel={handleOnCancel}
        />
      ),
    }

    setMethodComponent(
      methodComponents[method as 'mastercard' | 'pix' | 'boleto'] || null,
    )
  }, [method, router, refetch, paymentAdd])

  const renderContent = (
    <>
      <LayoutLoading
        label="Processando..."
        enabled={isLoading}
        className="flex h-2/3 items-center justify-center"
      >
        <div className="mt-8 flex w-1/3 flex-col">
          <div className="mb-8 flex w-full items-center justify-start">
            <Common.Button
              className="border-transparent"
              onClick={() => router.push('/')}
            >
              <IconLeftArrow />
            </Common.Button>

            <span className="ml-2 text-mesh-color-neutral-200">
              <span>Saldo </span>
              <span>• </span>

              <span className="text-mesh-color-accent-900">
                Pagamento - {method.charAt(0).toUpperCase() + method.slice(1)}
              </span>
            </span>
          </div>
          <div className="flex h-full w-full flex-col items-start justify-center">
            <Common.Title size="2xl">
              Recarregar saldo com{' '}
              {method.charAt(0).toUpperCase() + method.slice(1)}
            </Common.Title>
            {methodComponent}
          </div>
        </div>
      </LayoutLoading>
    </>
  )

  if (methodComponent === null) {
    notFound()
  }

  return (
    <LayoutLoading
      label="Carregando..."
      className="h-[70vh]"
      enabled={methodComponent === undefined}
    >
      {renderContent}
    </LayoutLoading>
  )
}
