import Common from '@/components/Common'
import Form from '@/components/Forms'
import usePaymentStore from '@/stores/payment.store'
import { MouseEventHandler } from 'react'
import { useForm } from 'react-hook-form'
import { formResolver } from './schemas/personal.schema'

interface IProps {
  handleFormSubmit: any
  handleFormCancel: MouseEventHandler
}

export function PagePaymentWithdrawPersonal({
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

  const { setPaymentWithdrawInfo, paymentWithdrawInfo } = usePaymentStore()

  const onSubmit = (data: any) => {
    setPaymentWithdrawInfo({
      personal: {
        identification: data.cpf,
        name: data.name,
        birthday: data.birthday,
        phone: data.phone,
      },
    })

    handleFormSubmit()
  }

  const enableButton =
    dirtyFields.name &&
    dirtyFields.cpf &&
    dirtyFields.birthday &&
    dirtyFields.phone

  return (
    <div>
      <span className="text-sm text-mesh-color-neutral-200">
        Primeira etapa
      </span>
      <Common.Title size={'lg'} bold={600}>
        Informações Pessoais
      </Common.Title>

      <Form.Root
        className="mt-6 flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Input.CPF
          name="cpf"
          label="CPF"
          placeholder="000.000.000-00"
          register={register('cpf')}
          errors={errors.cpf}
        />

        <Form.Input.Text
          name="name"
          label="Nome"
          placeholder="Nome Completo"
          register={register('name')}
          errors={errors.name}
        />

        <Form.Input.Date
          name="birthday"
          label="Data de Nascimento"
          placeholder="dd/mm/aaaa"
          register={register('birthday')}
          errors={errors.birthday}
        />

        <Form.Input.Phone
          name="phone"
          label="Número de Celular"
          placeholder="(00) 00000-0000"
          register={register('phone')}
          errors={errors.phone}
        />

        <div className="mt-4">
          <div className="flex justify-between text-xl font-semibold">
            <span>Levantamento:</span>

            <span className="text-mesh-color-primary-800">
              {Number(paymentWithdrawInfo.selectedValue).toLocaleString(
                'pt-br',
                {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                },
              )}
            </span>
          </div>

          <div className="flex flex-col gap-4 text-xl font-semibold">
            <Form.Button
              buttonStyle="full"
              disabled={!enableButton}
              className="h-12 w-full border-transparent"
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
