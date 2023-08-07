import Common from '@/components/Common'
import Form from '@/components/Forms'
import usePaymentStore from '@/stores/payment.store'
import React, { MouseEventHandler, useEffect, useState } from 'react'

interface IProps {
  handleFormSubmit: React.FormEventHandler<HTMLFormElement>
  handleFormCancel: MouseEventHandler
}
export function PagePaymentWithdrawLocation({
  handleFormSubmit,
  handleFormCancel,
}: IProps) {
  const { paymentWithdrawInfo, setPaymentWithdrawInfo } = usePaymentStore()
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [complementNumber, setComplementNumber] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    setPaymentWithdrawInfo({
      ...paymentWithdrawInfo,
      location: {
        city,
        state,
        postalCode,
        neighborhood,
        complementNumber,
        address,
      },
    })
  }, [
    address,
    city,
    state,
    postalCode,
    neighborhood,
    complementNumber,
    setPaymentWithdrawInfo,
  ])

  const validateForm = () => {
    return !(
      city.length > 0 &&
      state.length > 0 &&
      postalCode.length === 9 &&
      address.length > 0 &&
      neighborhood.length > 0 &&
      complementNumber.length === 3
    )
  }

  return (
    <div>
      <text className="text-sm text-mesh-color-neutral-200">Segunda Etapa</text>
      <Common.Title size={'lg'} bold={600}>
        Informações de Localização
      </Common.Title>

      <Form.Root
        className="mt-6 flex flex-col gap-4"
        onSubmit={handleFormSubmit}
      >
        <Form.Input.Text
          label="Cidade"
          placeholder="Ex: São Paulo, Salvador, etc..."
          state={city}
          setState={setCity}
          required
        />
        <Form.Input.Text
          label="Estado"
          placeholder="Ex: Rio de Janeiro, Minas Gerais, etc..."
          state={state}
          setState={setState}
          required
        />
        <Form.Input.PostalCode
          label="CEP"
          placeholder="00000-000"
          state={postalCode}
          setState={setPostalCode}
          required
        />
        <Form.Input.Text
          label="Bairro"
          placeholder="Ex: Liberdade, Jardins, etc..."
          state={neighborhood}
          setState={setNeighborhood}
          required
        />
        <Form.Input.Number
          limit={3}
          label="Número de Complemento"
          placeholder="000"
          state={complementNumber}
          setState={setComplementNumber}
          required
        />
        <Form.Input.Text
          label="Endereço"
          placeholder=""
          state={address}
          setState={setAddress}
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
