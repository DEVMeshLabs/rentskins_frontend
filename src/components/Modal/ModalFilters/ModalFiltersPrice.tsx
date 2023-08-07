'use client'
import Common from '@/components/Common'
import Form from '@/components/Forms'
import { useForm } from 'react-hook-form'
import { formResolver } from './price.schema'

export default function ModalFiltersPrice() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: formResolver,
    defaultValues: {
      'max-price': undefined,
      'min-price': undefined,
    },
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Form.Root
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col justify-between"
    >
      <div className="flex flex-col gap-5">
        <Common.Title color="white" size="2xl" bold={600}>
          Preço
        </Common.Title>
        <div className="flex w-full items-center gap-5">
          <Form.Input.Currency
            label="Preço Mínimo"
            labelClassName="text-sm text-white"
            name={'min-price'}
            register={register('min-price')}
            errors={errors['min-price']}
            control={control}
            inputClassName="h-10 w-full rounded bg-mesh-color-neutral-900 px-2 text-white outline-none active:border-mesh-color-primary-700"
          />
          <hr className="mt-6 w-9" />
          <Form.Input.Currency
            label="Preço Máximo"
            labelClassName="text-sm text-white"
            name={'max-price'}
            register={register('max-price')}
            control={control}
            inputClassName="h-10 w-full rounded bg-mesh-color-neutral-900 px-2 text-white outline-none active:border-mesh-color-primary-700"
          />
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Form.Button
          buttonStyle={undefined}
          type="button"
          className="h-11 w-32 border-mesh-color-neutral-300 bg-transparent font-bold text-mesh-color-neutral-300"
        >
          Limpar
        </Form.Button>
        <Form.Button
          buttonStyle="full"
          type="submit"
          className="h-11 w-32 font-bold text-black"
        >
          Aplicar
        </Form.Button>
      </div>
    </Form.Root>
  )
}
