'use client'
import Common from '@/components/Common'
import useFilterStore from '@/stores/filters.store'
import { useForm } from 'react-hook-form'
import { formCategoryResolver } from './schemas/category.schema'
import Form from '@/components/Forms'

interface IProps {
  handleOpen: () => void
}

export default function ModalFiltersCategory({ handleOpen }: IProps) {
  const {
    selectedFilters,
    setSelectedFilters,
    cleanSelectedFilters,
    setCheckedInputCheckbox,
  } = useFilterStore()
  const { register, handleSubmit, setValue, watch } = useForm({
    resolver: formCategoryResolver,
    defaultValues: {
      'category-filter': selectedFilters.categories || [''],
    },
  })

  const onSubmit = (data: any) => {
    if (data['category-filter'].length > 0) {
      setSelectedFilters({
        ...selectedFilters,
        categories: [...data['category-filter']],
      })
      handleOpen()
    }
  }

  return (
    <Form.Root
      className="flex h-full flex-col justify-between"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-5">
        <Common.Title color="white" size="2xl" bold={600}>
          Categoria
        </Common.Title>
        <div className="flex w-full items-center gap-5">
          <Form.Input.Checkbox
            label="Adesivos"
            name="category-filter"
            register={register('category-filter')}
            value={'Adesivos'}
          />
          <Form.Input.Checkbox
            label="StatTrak"
            name="category-filter"
            register={register('category-filter')}
            value={'StatTrak'}
          />
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Form.Button
          buttonStyle={undefined}
          className="h-11 w-32 font-bold text-white"
          disabled={watch('category-filter')?.length === 0}
          onClick={() => {
            cleanSelectedFilters({ ...selectedFilters, categories: [] })
            setValue('category-filter', [''])
            setCheckedInputCheckbox(null)
            handleOpen()
          }}
          type="button"
        >
          Limpar
        </Form.Button>
        <Form.Button
          buttonStyle={undefined}
          className="h-11 w-32 border-none bg-mesh-color-primary-1200 font-bold text-black"
          disabled={watch('category-filter')?.length === 0}
        >
          Aplicar
        </Form.Button>
      </div>
    </Form.Root>
  )
}
