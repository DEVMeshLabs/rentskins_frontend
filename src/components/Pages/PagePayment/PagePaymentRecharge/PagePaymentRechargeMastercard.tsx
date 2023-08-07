'use client'
import Form from '@/components/Forms'
import usePaymentStore from '@/stores/payment.store'
import React, { MouseEventHandler, useState } from 'react'

interface IProps {
  handleFormSubmit: React.FormEventHandler<HTMLFormElement>
  handleFormCancel: MouseEventHandler
}

export function PagePaymentRechargeMastercard({
  handleFormSubmit,
  handleFormCancel,
}: IProps) {
  const [email, setEmail] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardValidity, setCardValidity] = useState('')
  const [cardCVC, setCardCVC] = useState('')
  const [cardOwner, setCardOwner] = useState('')

  const { paymentAdd } = usePaymentStore()

  const validateForm = () => {
    return !(
      email.length > 5 &&
      email.includes('@') &&
      cardNumber.length >= 19 &&
      cardValidity.length > 4 &&
      cardCVC.length >= 3 &&
      cardOwner.length >= 5
    )
  }

  return (
    <Form.Root
      className="my-8 flex w-full flex-col gap-4"
      onSubmit={handleFormSubmit}
    >
      <Form.Input.Text
        label="Email"
        placeholder="email@exemplo.com"
        state={email}
        setState={setEmail}
        required
      />

      <div>
        <Form.Input.Card
          label="Informações do Cartão"
          placeholder="0000 0000 0000 0000"
          state={cardNumber}
          setState={setCardNumber}
          required
        />

        <div className="grid w-full grid-cols-2 items-center">
          <Form.Input.MonthYear
            placeholder="MM / YY"
            state={cardValidity}
            setState={setCardValidity}
            required
          />
          <Form.Input.Number
            placeholder="CVC"
            state={cardCVC}
            setState={setCardCVC}
            limit={3}
            required
          />
        </div>
      </div>

      <Form.Input.Text
        label="Nome do Portador"
        placeholder="Nome"
        state={cardOwner}
        setState={setCardOwner}
        required
      />

      <div className="mt-4">
        <div className="flex justify-between text-xl font-semibold">
          <text>Total:</text>
          <span className="text-mesh-color-primary-800">
            {paymentAdd.value?.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2,
            })}
          </span>
        </div>

        <div className="flex flex-col gap-4 text-xl font-semibold">
          <Form.Button
            type="submit"
            buttonStyle="full"
            disabled={validateForm()}
          >
            Pagar
          </Form.Button>
          <Form.Button
            type="button"
            buttonStyle="opaque"
            onClick={handleFormCancel}
          >
            Cancelar
          </Form.Button>
        </div>
      </div>
    </Form.Root>
  )
}
