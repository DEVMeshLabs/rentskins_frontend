'use client'
import Form from '@/components/Forms'
import usePaymentStore from '@/stores/payment.store'
import React, { MouseEventHandler, useState } from 'react'

interface IProps {
  handleFormSubmit: React.FormEventHandler<HTMLFormElement>
  handleFormCancel: MouseEventHandler
}

export function PagePaymentRechargeTicket({
  handleFormSubmit,
  handleFormCancel,
}: IProps) {
  const [name, setName] = useState('')
  const [identification, setIdentification] = useState('')
  const [email, setEmail] = useState('')
  const { paymentAdd } = usePaymentStore()

  const validateForm = () => {
    return !(
      name.length >= 5 &&
      identification.length === 14 &&
      email.length >= 5 &&
      email.includes('@')
    )
  }

  return (
    <Form.Root className="my-8 flex flex-col gap-4" onSubmit={handleFormSubmit}>
      <Form.Input.Text
        label="Nome"
        placeholder="Nome Completo"
        setState={setName}
        state={name}
        required
      />

      <Form.Input.CPF
        label="CPF"
        placeholder="000.000.000-00"
        state={identification}
        setState={setIdentification}
        required
      />

      <Form.Input.Email
        label="Email"
        placeholder="example@email.com"
        state={email}
        setState={setEmail}
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
