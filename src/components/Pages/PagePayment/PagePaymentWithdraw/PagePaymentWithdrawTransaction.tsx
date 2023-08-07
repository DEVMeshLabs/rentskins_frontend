import Common from '@/components/Common'
import Form from '@/components/Forms'
import { FormDropdown } from '@/components/Forms/FormDropdown'
import usePaymentStore from '@/stores/payment.store'
import React, { MouseEventHandler, useEffect, useState } from 'react'

interface IProps {
  handleFormSubmit: React.FormEventHandler<HTMLFormElement>
  handleFormCancel: MouseEventHandler
}
export function PagePaymentWithdrawTransaction({
  handleFormSubmit,
  handleFormCancel,
}: IProps) {
  const { paymentWithdrawInfo, setPaymentWithdrawInfo } = usePaymentStore()
  const [bank, setBank] = useState('Santander')
  const [agency, setAgency] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [keyType, setKeyType] = useState('CPF')
  const [keyValue, setKeyValue] = useState('')

  useEffect(() => {
    setPaymentWithdrawInfo({
      ...paymentWithdrawInfo,
      transference: {
        bank,
        agency,
        accountNumber,
        keyType,
        keyValue,
      },
    })
  }, [bank, agency, accountNumber, keyType, keyValue, setPaymentWithdrawInfo])

  const selectKeyValueType = () => {
    const types = {
      CPF: (
        <Form.Input.CPF
          label="Chave Pix"
          placeholder="000.000.000-00"
          state={keyValue}
          setState={setKeyValue}
          required
        />
      ),
      Email: (
        <Form.Input.Email
          label="Chave Pix"
          placeholder="example@mail.com"
          state={keyValue}
          setState={setKeyValue}
          required
        />
      ),
      Telefone: (
        <Form.Input.Phone
          label="Chave Pix"
          placeholder="(00) 00000-0000"
          state={keyValue}
          setState={setKeyValue}
          required
        />
      ),
    }

    return types[keyType as 'CPF' | 'Email' | 'Telefone']
  }

  const validateForm = () => {
    return !(
      agency.length === 4 &&
      accountNumber.length === 7 &&
      keyValue.length > 0
    )
  }

  return (
    <div>
      <text className="text-sm text-mesh-color-neutral-200">
        Terceira Etapa
      </text>
      <Common.Title size={'lg'} bold={600}>
        Informações Bancárias
      </Common.Title>
      <text className="text-sm">
        Para receber seus ganhos da plataforma, por favor, preencha as
        informações bancárias abaixo. A conta bancária deve estar registrada em
        seu CPF.
      </text>

      <Form.Root
        className="mt-6 flex flex-col gap-4"
        onSubmit={handleFormSubmit}
      >
        <FormDropdown
          label="Banco"
          state={bank}
          setState={setBank}
          options={[
            { label: 'Santander', value: 'Santander' },
            { label: 'Banco do Brasil', value: 'Banco do Brasil' },
            { label: 'Caixa', value: 'Caixa' },
            { label: 'Itaú', value: 'Itaú' },
            { label: 'Nubank', value: 'Nubank' },
          ]}
        />

        <div className="grid grid-cols-2 gap-2">
          <Form.Input.Number
            label="Agência"
            limit={4}
            placeholder="0000"
            state={agency}
            setState={setAgency}
            required
          />
          <Form.Input.Number
            label="Número da Conta"
            limit={7}
            placeholder="0000000"
            state={accountNumber}
            setState={setAccountNumber}
            required
          />
        </div>

        <FormDropdown
          label="Tipo de Chave"
          state={keyType}
          setState={setKeyType}
          options={[
            { label: 'CPF/CNPJ', value: 'CPF' },
            { label: 'Email', value: 'Email' },
            { label: 'Número de Telefone', value: 'Telefone' },
          ]}
        />

        {selectKeyValueType()}

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
