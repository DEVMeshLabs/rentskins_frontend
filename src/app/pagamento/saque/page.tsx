'use client'
import Common from '@/components/Common'
import { IconBank } from '@/components/Icons/IconBank'
import { IconCard } from '@/components/Icons/IconCard'
import { IconLeftArrow } from '@/components/Icons/IconLeftArrow'
import { IconLocation } from '@/components/Icons/IconLocation'
import { IconPerson } from '@/components/Icons/IconPerson'
import { LayoutLoading } from '@/components/Layout/LayoutLoading'
import { PagePaymentWithdrawDocument } from '@/components/Pages/PagePayment/PagePaymentWithdraw/PagePaymentWithdrawDocument'
import { PagePaymentWithdrawLocation } from '@/components/Pages/PagePayment/PagePaymentWithdraw/PagePaymentWithdrawLocation'
import { PagePaymentWithdrawPersonal } from '@/components/Pages/PagePayment/PagePaymentWithdraw/PagePaymentWithdrawPersonal'
import { PagePaymentWithdrawTransaction } from '@/components/Pages/PagePayment/PagePaymentWithdraw/PagePaymentWithdrawTransaction'
import useComponentStore from '@/stores/components.store'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function PaymentWithdrawPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { paymentWithdrawIndex, setPaymentWithdrawIndex } = useComponentStore()

  useEffect(() => setPaymentWithdrawIndex(0), [setPaymentWithdrawIndex])

  const handleOnCancel = () => {
    router.push('/')
  }

  const handleOnNext = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (paymentWithdrawIndex !== 3) {
      setPaymentWithdrawIndex((paymentWithdrawIndex + 1) as 0 | 1 | 2 | 3)
    } else {
      setIsLoading(true)
      router.push('/pagamento/saque/sucesso')
    }
  }

  const renderFormContent = () => {
    const forms = {
      0: (
        <PagePaymentWithdrawPersonal
          handleFormSubmit={handleOnNext}
          handleFormCancel={handleOnCancel}
        />
      ),
      1: (
        <PagePaymentWithdrawLocation
          handleFormSubmit={handleOnNext}
          handleFormCancel={handleOnCancel}
        />
      ),
      2: (
        <PagePaymentWithdrawTransaction
          handleFormSubmit={handleOnNext}
          handleFormCancel={handleOnCancel}
        />
      ),
      3: (
        <PagePaymentWithdrawDocument
          handleFormSubmit={handleOnNext}
          handleFormCancel={handleOnCancel}
        />
      ),
    }

    return forms[paymentWithdrawIndex]
  }

  return (
    <main className="flex h-fit flex-col items-center justify-start bg-mesh-color-others-black pb-64 text-white">
      <LayoutLoading
        label="Processando..."
        enabled={isLoading}
        className="mb-64 mt-32 flex h-full items-center justify-center"
      >
        <div className="mt-8 flex w-min flex-col">
          <div className="mb-8 flex w-full items-center justify-start">
            <Common.Button
              className="border-transparent"
              onClick={() => handleOnCancel()}
            >
              <IconLeftArrow />
            </Common.Button>

            <span className="ml-2 text-mesh-color-neutral-200">
              <text>Saldo </text>
              <text>• </text>

              <text className="text-mesh-color-accent-900">
                Retirar Levantamento
              </text>
            </span>
          </div>
          <div className="flex h-full w-full flex-col items-start justify-center">
            <Common.Title size="2xl"> Retirar levantamento </Common.Title>
            <div className="mt-4 flex w-[546px] items-center justify-center">
              <div className="flex h-10 w-12 items-center justify-center rounded-full bg-mesh-color-primary-1200 p-2">
                <IconPerson />
              </div>
              <div className="h-0.5 w-full bg-mesh-color-neutral-500">
                <div
                  className={`h-full bg-mesh-color-primary-1200 ${
                    paymentWithdrawIndex >= 1
                      ? 'w-full transition-all duration-500'
                      : 'w-0'
                  }`}
                />
              </div>
              <div
                className={`flex h-10 w-12 items-center justify-center rounded-full ${
                  paymentWithdrawIndex >= 1
                    ? 'bg-mesh-color-primary-1200 transition-all delay-500 duration-500'
                    : 'bg-mesh-color-neutral-500'
                } p-2`}
              >
                <IconLocation
                  className={`${
                    paymentWithdrawIndex >= 1
                      ? 'stroke-mesh-color-others-black transition-all delay-500 duration-500'
                      : 'stroke-mesh-color-neutral-300'
                  }`}
                />
              </div>
              <div className="h-0.5 w-full bg-mesh-color-neutral-500">
                <div
                  className={`h-full bg-mesh-color-primary-1200 ${
                    paymentWithdrawIndex >= 2
                      ? 'w-full transition-all duration-500'
                      : 'w-0'
                  }`}
                />
              </div>
              <div
                className={`flex h-10 w-12 items-center justify-center rounded-full ${
                  paymentWithdrawIndex >= 2
                    ? 'bg-mesh-color-primary-1200 transition-all delay-500 duration-500'
                    : 'bg-mesh-color-neutral-500'
                } p-2`}
              >
                <IconBank
                  className={`${
                    paymentWithdrawIndex >= 2
                      ? 'stroke-mesh-color-others-black transition-all delay-500 duration-500'
                      : 'stroke-mesh-color-neutral-300'
                  }`}
                />
              </div>
              <div className="h-0.5 w-full bg-mesh-color-neutral-500">
                <div
                  className={`h-full bg-mesh-color-primary-1200 ${
                    paymentWithdrawIndex >= 3
                      ? 'w-full transition-all duration-500'
                      : 'w-0'
                  }`}
                />
              </div>
              <div
                className={`flex h-10 w-12 items-center justify-center rounded-full ${
                  paymentWithdrawIndex >= 3
                    ? 'bg-mesh-color-primary-1200 transition-all delay-500 duration-500'
                    : 'bg-mesh-color-neutral-500'
                } p-2`}
              >
                <IconCard
                  className={`${
                    paymentWithdrawIndex >= 3
                      ? 'fill-mesh-color-others-black transition-all delay-500 duration-500'
                      : 'fill-mesh-color-neutral-300'
                  }`}
                />
              </div>
            </div>
            <div className="mt-4 w-full transition-all ease-in-out">
              {renderFormContent()}
            </div>
          </div>
        </div>
      </LayoutLoading>
    </main>
  )
}
