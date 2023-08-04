'use client'
import Common from '@/components/Common'
import { IconLeftArrow } from '@/components/Icons/IconLeftArrow'
import { LayoutLoading } from '@/components/Layout/LayoutLoading'
import { PagePaymentRechargeMastercard } from '@/components/Pages/PagePayment/PagePaymentRecharge/PagePaymentRechargeMastercard'
import { PagePaymentRechargePix } from '@/components/Pages/PagePayment/PagePaymentRecharge/PagePaymentRechargePix'
import { PagePaymentRechargeTicket } from '@/components/Pages/PagePayment/PagePaymentRecharge/PagePaymentRechargeTicket'
import { notFound, useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function PaymentAddPage() {
  const { method } = useParams()

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [methodComponent, setMethodComponent] = useState<
    undefined | React.ReactNode
  >(undefined)

  useEffect(() => {
    const handleOnSubmit = (data: any) => {
      console.log(data)
      setIsLoading(true)
      router.push('/pagamento/recarregar/sucesso')
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
  }, [method, router])

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
    <main className="flex h-screen w-full flex-col items-center justify-start bg-mesh-color-others-black text-white">
      {methodComponent !== undefined && renderContent}
    </main>
  )
}
