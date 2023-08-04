'use client'
import Form from '@/components/Forms'
import usePaymentStore from '@/stores/payment.store'
import { MouseEventHandler } from 'react'
import { useForm } from 'react-hook-form'
import { formResolver } from './schemas/ticket.schema'

interface IProps {
  handleFormSubmit: any
  handleFormCancel: MouseEventHandler
}

export function PagePaymentRechargeTicket({
  handleFormSubmit,
  handleFormCancel,
}: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: formResolver,
    defaultValues: {
      name: undefined,
      cpf: undefined,
    },
  })

  const enableButton = dirtyFields.name && dirtyFields.cpf && dirtyFields.email

  const { paymentAdd } = usePaymentStore()

  return (
    <Form.Root
      className="my-8 flex w-full flex-col gap-4"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Form.Input.Text
        name="name"
        label="Nome"
        placeholder="Nome Completo"
        register={register('name')}
        errors={errors.name}
      />

      <Form.Input.CPF
        name="cpf"
        label="CPF"
        placeholder="000.000.000-00"
        register={register('cpf')}
        errors={errors.cpf}
      />

      <Form.Input.Email
        name="email"
        label="Email"
        placeholder="exemplo@email.com"
        register={register('email')}
        errors={errors.email}
      />

      <div className="mt-4">
        <div className="flex justify-between text-xl font-semibold">
          <text>Total:</text>
          <span className="text-mesh-color-primary-800">
            {Number(paymentAdd.value)?.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2,
            })}
          </span>
        </div>

        <div className="flex flex-col gap-4 text-xl font-semibold">
          <Form.Button buttonStyle="full" disabled={!enableButton}>
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
