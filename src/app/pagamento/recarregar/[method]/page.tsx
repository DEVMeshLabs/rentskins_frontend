'use client'
import Common from '@/components/Common'
import { IconLeftArrow } from '@/components/Icons/IconLeftArrow'
import Pages from '@/components/Pages'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function PaymentAddMastercardPage() {
  const { method } = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [methodComponent, setMethodComponent] = useState<
    undefined | React.ReactNode
  >(undefined)

  useEffect(() => {
    const handleOnSubmit = (event: any) => {
      event.preventDefault()
      setIsLoading(true)
      router.push('/pagamento/recarregar/sucesso')
    }

    const handleOnCancel = () => {
      router.push('/')
    }

    const methodComponents = {
      mastercard: (
        <Pages.Payment.Recharge.Mastercard
          handleFormCancel={handleOnCancel}
          handleFormSubmit={handleOnSubmit}
        />
      ),
      pix: (
        <Pages.Payment.Recharge.Pix
          handleFormSubmit={handleOnSubmit}
          handleFormCancel={handleOnCancel}
        />
      ),
      boleto: (
        <Pages.Payment.Recharge.Ticket
          handleFormSubmit={handleOnSubmit}
          handleFormCancel={handleOnCancel}
        />
      ),
    }

    setMethodComponent(
      methodComponents[method as 'mastercard' | 'pix' | 'boleto'],
    )
  }, [method, router])

  const renderContent = (
    <>
      <Common.Loading
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
              <text>Saldo </text>
              <text>• </text>

              <text className="text-mesh-color-accent-900">
                Pagamento - {method.charAt(0).toUpperCase() + method.slice(1)}
              </text>
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
      </Common.Loading>
    </>
  )

  const renderFailed = (
    <div className="flex h-3/5 flex-col items-center justify-center gap-4">
      <Common.Title bold={800} size="3xl">
        Página não encontrada.
      </Common.Title>
      <Common.Button
        onClick={() => router.push('/')}
        className="border-mesh-color-primary-1400 
      bg-mesh-color-primary-1400 px-4 text-lg font-semibold text-mesh-color-others-black"
      >
        Voltar
      </Common.Button>
    </div>
  )

  return (
    <main className="flex h-screen w-full flex-col items-center justify-start bg-mesh-color-others-black text-white">
      {methodComponent !== undefined ? renderContent : renderFailed}
    </main>
  )
}
