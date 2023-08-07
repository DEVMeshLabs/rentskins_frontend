import Common from '@/components/Common'
import Form from '@/components/Forms'
import usePaymentStore from '@/stores/payment.store'
import React, { MouseEventHandler, useEffect, useState } from 'react'

interface IProps {
  handleFormSubmit: React.FormEventHandler<HTMLFormElement>
  handleFormCancel: MouseEventHandler
}

export function PagePaymentWithdrawPersonal({
  handleFormSubmit,
  handleFormCancel,
}: IProps) {
  const { setPaymentWithdrawInfo } = usePaymentStore()
  const [identification, setIdentification] = useState('')
  const [name, setName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    setPaymentWithdrawInfo({
      personal: {
        identification,
        name,
        birthday,
        phone,
      },
    })
  }, [identification, name, birthday, phone, setPaymentWithdrawInfo])

  const validateForm = () => {
    return !(
      identification.length >= 14 &&
      name.length >= 5 &&
      birthday.length >= 10 &&
      phone.length >= 15
    )
  }

  return (
    <div>
      <text className="text-sm text-mesh-color-neutral-200">
        Primeira etapa
      </text>
      <Common.Title size={'lg'} bold={600}>
        Informações Pessoais
      </Common.Title>

      <Form.Root
        className="mt-6 flex flex-col gap-4"
        onSubmit={handleFormSubmit}
      >
        <Form.Input.CPF
          label="CPF"
          placeholder="000.000.000-00"
          state={identification}
          setState={setIdentification}
          required
        />

        <Form.Input.Text
          label="Nome"
          placeholder="Nome Completo"
          state={name}
          setState={setName}
          required
        />

        <Form.Input.Date
          label="Data de Nascimento"
          placeholder="dd/mm/aaaa"
          state={birthday}
          setState={setBirthday}
          required
        />

        <Form.Input.Phone
          label="Número de Celular"
          placeholder="(00) 00000-0000"
          state={phone}
          setState={setPhone}
          required
        />

        <div className="mt-4">
          <div className="flex justify-between text-xl font-semibold">
            <text>Levantamento:</text>

            <span className="text-mesh-color-primary-800">
              {Number(0).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
              })}
            </span>
          </div>

          <div className="flex flex-col gap-4 text-xl font-semibold">
            <Form.Button
              buttonStyle="full"
              type="submit"
              className="h-12 w-full border-transparent"
              disabled={validateForm()}
            >
              Continuar
            </Form.Button>
            <Form.Button
              buttonStyle="opaque"
              className="h-12 w-full border-neutral-600"
              onClick={handleFormCancel}
            >
              Cancelar
            </Form.Button>
          </div>
        </div>
      </Form.Root>
    </div>
  )
}
