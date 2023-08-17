'use client'
import Common from '@/components/Common'
import Form from '@/components/Forms'
import { useForm } from 'react-hook-form'
import useFilterStore from '@/stores/filters.store'
import { formPriceResolver } from './schemas/price.schema'

interface IProps {
  handleOpen: () => void
}

export default function ModalFiltersPrice({ handleOpen }: IProps) {
  const {
    selectedFilters,
    setSelectedFilters,
    cleanSelectedFilters,
    // setCheckedInputCheckbox,
  } = useFilterStore()
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: formPriceResolver,
    defaultValues: {
      min: selectedFilters.prices.min || '',
      max: selectedFilters.prices.max || '',
    },
  })

  const onSubmit = (data: any) => {
    if (
      Number(data.min) > 0 &&
      Number(data.max) &&
      Number(data.max) > Number(data.min)
    ) {
      const prices = {
        min: data.min,
        max: data.max,
      }
      console.log(prices)
      setSelectedFilters({
        ...selectedFilters,
        prices,
      })
      handleOpen()
    }
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
            labelClassName="text-sm text-white flex flex-col gap-5"
            name={'min'}
            register={register('min')}
            errors={errors.min}
            control={control}
            inputClassName="h-10 w-full rounded bg-mesh-color-neutral-900 px-2 text-white outline-none active:border-mesh-color-primary-700"
          />
          <hr className="mt-6 w-9" />
          <Form.Input.Currency
            label="Preço Máximo"
            labelClassName="text-sm text-white flex flex-col gap-5"
            name={'max'}
            register={register('max')}
            control={control}
            inputClassName="h-10 w-full rounded bg-mesh-color-neutral-900 px-2 text-white outline-none active:border-mesh-color-primary-700"
          />
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Form.Button
          buttonStyle={undefined}
          disabled={watch('min') === '' || watch('max') === ''}
          onClick={() => {
            cleanSelectedFilters({
              ...selectedFilters,
              prices: { max: undefined, min: undefined },
            })
            setValue('max', '')
            setValue('min', '')
            handleOpen()
          }}
          type="button"
          className="h-11 w-32 border-mesh-color-neutral-300 bg-transparent font-bold text-mesh-color-neutral-300"
        >
          Limpar
        </Form.Button>
        <Form.Button
          buttonStyle={undefined}
          disabled={watch('min') === '' || watch('max') === ''}
          type="submit"
          className="h-11 w-32 border-none bg-mesh-color-primary-1200 font-bold text-black"
        >
          Aplicar
        </Form.Button>
      </div>
    </Form.Root>
  )
}
