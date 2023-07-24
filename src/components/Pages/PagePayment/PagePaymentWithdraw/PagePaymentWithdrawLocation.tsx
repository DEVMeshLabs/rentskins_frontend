import Common from '@/components/Common'
import Form from '@/components/Forms'
import usePaymentStore from '@/stores/payment.store'
import { MouseEventHandler } from 'react'
import { useForm } from 'react-hook-form'
import { formResolver } from './schemas/location.schema'

interface IProps {
  handleFormSubmit: any
  handleFormCancel: MouseEventHandler
}
export function PagePaymentWithdrawLocation({
  handleFormSubmit,
  handleFormCancel,
}: IProps) {
  const { paymentWithdrawInfo, setPaymentWithdrawInfo } = usePaymentStore()
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: formResolver,
    defaultValues: {
      'postal-code': undefined,
      address: undefined,
      city: undefined,
      neighborhood: undefined,
      'complement-number': undefined,
      state: undefined,
    },
  })

  const onSubmit = (data: any) => {
    setPaymentWithdrawInfo({
      ...paymentWithdrawInfo,
      location: {
        city: data.city,
        state: data.state,
        postalCode: data['postal-code'],
        neighborhood: data.neighborhood,
        complementNumber: data['complement-number'],
        address: data.address,
      },
    })

    handleFormSubmit()
  }

  const enableButton =
    dirtyFields.address &&
    dirtyFields.city &&
    dirtyFields.neighborhood &&
    dirtyFields['complement-number'] &&
    dirtyFields['postal-code'] &&
    dirtyFields.state

  return (
    <div>
      <text className="text-sm text-mesh-color-neutral-200">Segunda Etapa</text>
      <Common.Title size={'lg'} bold={600}>
        Informações de Localização
      </Common.Title>

      <Form.Root
        className="mt-6 flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Input.Text
          name="city"
          label="Cidade"
          placeholder="Ex: São Paulo, Salvador, etc..."
          register={register('city')}
          errors={errors.city}
        />
        <Form.Input.Text
          name="state"
          label="Estado"
          placeholder="Ex: Rio de Janeiro, Minas Gerais, etc..."
          register={register('state')}
          errors={errors.state}
        />
        <Form.Input.PostalCode
          name="postal-code"
          label="CEP"
          placeholder="00000-000"
          register={register('postal-code')}
          errors={errors['postal-code']}
        />
        <Form.Input.Text
          name="neighborhood"
          label="Bairro"
          placeholder="Ex: Liberdade, Jardins, etc..."
          register={register('neighborhood')}
          errors={errors.neighborhood}
        />
        <Form.Input.Number
          name="complement-number"
          label="Número de Complemento"
          placeholder="000"
          mask="9999999999"
          register={register('complement-number')}
          errors={errors['complement-number']}
        />
        <Form.Input.Text
          name="address"
          label="Endereço"
          placeholder=""
          register={register('address')}
          errors={errors.address}
        />

        <div className="mt-4">
          <div className="flex justify-between text-xl font-semibold">
            <text>Levantamento:</text>

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
              className="h-12 w-full border-transparent"
              disabled={!enableButton}
            >
              Continuar
            </Form.Button>
            <Form.Button
              buttonStyle="opaque"
              type="button"
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
