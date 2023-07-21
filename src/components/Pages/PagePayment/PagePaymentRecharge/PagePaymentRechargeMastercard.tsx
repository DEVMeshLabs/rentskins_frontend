'use client'
import Form from '@/components/Forms'
import usePaymentStore from '@/stores/payment.store'
import { MouseEventHandler, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { formResolver } from './mastercard.schema'

interface IProps {
  handleFormSubmit: any
  handleFormCancel: MouseEventHandler
}

export function PagePaymentRechargeMastercard({
  handleFormSubmit,
  handleFormCancel,
}: IProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: formResolver,
    defaultValues: {
      'card-cvc': undefined,
      'card-number': undefined,
      'card-owner': undefined,
      'card-validity': undefined,
      email: undefined,
    },
  })

  const dayWatch = watch('card-validity')

  useEffect(() => {
    if (dayWatch) {
      const day = dayWatch.slice(0, 2)
      const month = dayWatch.slice(3, 5)

      if (dayWatch.length === 5) {
        if (
          Number(day) <= 0 ||
          Number(day) > 31 ||
          Number(month) <= 0 ||
          Number(month) > 12
        ) {
          console.log('Error')
        } else {
          console.log('Sem error')
        }
      }

      console.log(day)
      console.log(month)
    }
  }, [dayWatch])

  const enableButton =
    dirtyFields['card-cvc'] &&
    dirtyFields.email &&
    dirtyFields['card-number'] &&
    dirtyFields['card-owner'] &&
    dirtyFields['card-validity']

  const { paymentAdd } = usePaymentStore()

  return (
    <Form.Root
      className="my-8 flex w-full flex-col gap-4"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Form.Input.Text
        name="email"
        label="Email"
        placeholder="exemplo@email.com"
        register={register('email')}
        errors={errors.email}
      />

      <div className="mb-2">
        <Form.Input.Card
          name="card-number"
          label="Informações do Cartão"
          placeholder="0000 0000 0000 0000"
          register={register('card-number')}
        />

        <div className="-mt-[1.1rem] grid w-full grid-cols-2 items-center">
          <Form.Input.MonthYear
            name="card-validity"
            placeholder="MM/YY"
            register={register('card-validity')}
          />
          <Form.Input.Number
            name="card-cvc"
            placeholder="CVC"
            mask="999"
            register={register('card-cvc')}
          />
        </div>

        <div className="absolute -mt-3 text-sm text-red-500">
          {errors['card-number']?.message ||
            errors['card-validity']?.message ||
            errors['card-cvc']?.message}
        </div>
      </div>

      <Form.Input.Text
        name="card-owner"
        label="Nome do Portador"
        placeholder="Nome"
        register={register('card-owner')}
        errors={errors['card-owner']}
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
          <Form.Button
            type="submit"
            buttonStyle="full"
            disabled={!enableButton}
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
