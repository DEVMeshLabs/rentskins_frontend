'use client'
import { useState } from 'react'
import { LayoutPage } from '@/components/Shared'
import { Button } from '@/components/Button'
import { FormInput } from '@/components/Forms/Input'
import { IconLeftArrow } from '@/components/Icons/iconLeftArrow'
import usePaymentStore from '@/stores/payment.store'
import { Title } from '@/components/Title'
import { useRouter } from 'next/navigation'
import CircleLoading from '@/components/CircleLoading'
import { IconPerson } from '@/components/Icons/IconPerson'
import { IconLocation } from '@/components/Icons/IconLocation'
import { IconBank } from '@/components/Icons/IconBank'
import { IconCard } from '@/components/Icons/IconCard'

export default function PaymentWithdrawPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const [name, setName] = useState('')
  const [identification, setIdentification] = useState('')
  const [birthday, setBirthday] = useState('')
  const [phone, setPhone] = useState('')

  const { paymentAdd } = usePaymentStore()

  const handleOnCancel = () => {
    router.push('/')
  }

  const validateForm = () => {
    return (
      name.length > 0 &&
      identification.length > 0 &&
      birthday.length > 0 &&
      phone.length > 0
    )
  }

  const handleOnSubmit = (event: any) => {
    event.preventDefault()
    setIsLoading(true)
    router.push('/pagamento/recarregar/sucesso')
  }

  return (
    <LayoutPage>
      {/* CHANGE COLOR */}
      <main className="flex h-screen flex-col items-center justify-start bg-[#151714] text-white">
        <CircleLoading
          label="Processando..."
          enabled={isLoading}
          className="flex h-2/3 items-center justify-center"
        >
          <div className="mt-8 flex w-fit flex-col">
            <div className="mb-8 flex w-full items-center justify-start">
              <Button className="border-none" onClick={() => handleOnCancel()}>
                <IconLeftArrow />
              </Button>
              {/* CHANGE COLOR */}
              <span className="ml-2 text-[#A7B0A0]">
                <text>Saldo </text>
                <text>• </text>
                {/* CHANGE COLOR */}
                <text className="text-[#49E671]">Retirar Levantamento</text>
              </span>
            </div>
            <div className="flex h-full w-full flex-col items-start justify-center">
              <Title size="2xl"> Retirar levantamento </Title>
              <div className="mt-4 flex w-[546px] items-center justify-center">
                {/* CHANGE COLOR */}
                <div className="flex h-10 w-12 items-center justify-center rounded-full bg-[#A6CF2B] p-2">
                  <IconPerson />
                </div>
                <div className="h-0.5 w-full bg-[#414141]">
                  <div className="h-full w-0 bg-red-500" />
                </div>
                <div className="flex h-10 w-12 items-center justify-center rounded-full bg-[#A6CF2B] p-2">
                  <IconLocation />
                </div>
                <div className="h-0.5 w-full bg-[#414141]">
                  <div className="h-full w-0 bg-red-500" />
                </div>
                <div className="flex h-10 w-12 items-center justify-center rounded-full bg-[#A6CF2B] p-2">
                  <IconBank />
                </div>
                <div className="h-0.5 w-full bg-[#414141]">
                  <div className="h-full w-0 bg-red-500" />
                </div>
                <div className="flex h-10 w-12 items-center justify-center rounded-full bg-[#A6CF2B] p-2">
                  <IconCard />
                </div>
              </div>
              <div className="w-full">
                <div className="text-sm text-[#A7B0A0]">Primeira etapa</div>
                <Title size={'lg'} bold={600}>
                  Informações Pessoais
                </Title>
              </div>
              <form onSubmit={() => handleOnSubmit} className="mt-4 w-full">
                <br />

                <div className="flex justify-between text-xl font-semibold">
                  <text>Total:</text>
                  {/* CHANGE COLOR */}
                  <span className="text-[#C5EA56]">R$0,00</span>
                </div>

                {/* CHANGE COLOR */}
                <div className="flex flex-col gap-4 text-xl font-semibold">
                  <Button
                    type="submit"
                    onClick={(event) => handleOnSubmit(event)}
                    disable={!validateForm()}
                    className="w-full border-[#A6CF2B] bg-[#A6CF2B] py-2 text-black disabled:border-[#3C403C] disabled:bg-[#3C403C] disabled:text-[#979797]"
                  >
                    Pagar
                  </Button>
                  <Button
                    className="w-full border-2 py-2"
                    onClick={() => handleOnCancel()}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </CircleLoading>
      </main>
    </LayoutPage>
  )
}
