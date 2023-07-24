import Common from '@/components/Common'
import Form from '@/components/Forms'
import { FormDropdown } from '@/components/Forms/FormDropdown'
import { MouseEventHandler } from 'react'
import { useForm } from 'react-hook-form'
import { formResolver } from './schemas/transaction.schema'

interface IProps {
  handleFormSubmit: any
  handleFormCancel: MouseEventHandler
}
export function PagePaymentWithdrawTransaction({
  handleFormSubmit,
  handleFormCancel,
}: IProps) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: formResolver,
    defaultValues: {
      'account-number': undefined,
      'key-cpf': undefined,
      'key-email': undefined,
      'key-phone': undefined,
      'key-type': 'CPF',
      agency: undefined,
      bank: 'Santander',
    },
  })

  const keyType = watch('key-type')

  const onSubmit = (data: any) => {
    console.log(data)
    //    setPaymentWithdrawInfo({
    //      ...paymentWithdrawInfo,
    //      transference: {
    //        bank,
    //        agency,
    //        accountNumber,
    //        keyType,
    //        keyValue,
    //      },
    //    })
  }

  const enableButton =
    (dirtyFields['account-number'] &&
      dirtyFields.agency &&
      dirtyFields['key-cpf']) ||
    dirtyFields['key-email'] ||
    dirtyFields['key-phone']

  const selectKeyValueType = () => {
    const types = {
      CPF: (
        <Form.Input.CPF
          name="key-cpf"
          label="Chave Pix"
          placeholder="000.000.000-00"
          register={register('key-cpf')}
          errors={errors['key-cpf']}
        />
      ),
      Email: (
        <Form.Input.Email
          name="key-email"
          label="Chave Pix"
          placeholder="example@mail.com"
          register={register('key-email')}
          errors={errors['key-email']}
        />
      ),
      Phone: (
        <Form.Input.Phone
          name="key-phone"
          label="Chave Pix"
          placeholder="(00) 00000-0000"
          register={register('key-phone')}
          errors={errors['key-phone']}
        />
      ),
    }

    return types[keyType as 'CPF' | 'Email' | 'Phone']
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormDropdown
          label="Banco"
          register={register('bank')}
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
            name="agency"
            label="Agência"
            mask="9999"
            placeholder="0000"
            register={register('agency')}
            errors={errors.agency}
            errorsClassname="w-5/6 text-sm text-red-500 -mt-[12px]"
          />
          <Form.Input.Number
            name="account-number"
            label="Agência"
            mask="9999999"
            placeholder="0000000"
            register={register('account-number')}
            errors={errors['account-number']}
            errorsClassname="w-5/6 text-sm text-red-500 -mt-[12px]"
          />
        </div>

        <FormDropdown
          label="Tipo de Chave"
          register={register('key-type')}
          options={[
            { label: 'CPF/CNPJ', value: 'CPF' },
            { label: 'Email', value: 'Email' },
            { label: 'Número de Telefone', value: 'Phone' },
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
              className="h-12 w-full border-transparent"
              disabled={!enableButton}
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
