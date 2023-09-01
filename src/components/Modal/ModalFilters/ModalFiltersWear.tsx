/* eslint-disable camelcase */
'use client'
import Common from '@/components/Common'
import Form from '@/components/Forms'
import useFilterStore from '@/stores/filters.store'
import { useForm } from 'react-hook-form'
import { formWearResolver } from './schemas/Wear.schhema'

interface IProps {
  handleOpen: () => void
}

export default function FilterWear({ handleOpen }: IProps) {
  const {
    selectedFilters,
    setSelectedFilters,
    cleanSelectedFilters,
    setCheckedInputCheckbox,
  } = useFilterStore()

  const { register, handleSubmit, setValue, watch } = useForm({
    resolver: formWearResolver,
    defaultValues: {
      'wear-filter': selectedFilters.wears || [''],
    },
  })

  const onSubmit = (data: any) => {
    if (data['wear-filter'].length > 0) {
      setSelectedFilters({
        ...selectedFilters,
        wears: [...data['wear-filter']],
      })
      handleOpen()
    }
  }

  const wearsLabel = [
    'Nova de Fábrica',
    'Pouco Usada',
    'Testada em Campo',
    'Bem Desgastada',
    'Veterana de Guerra',
    'Vanilla',
  ]

  return (
    <Form.Root
      className="flex h-full flex-col justify-between"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-5">
        <Common.Title color="white" size="2xl" bold={600}>
          Desgaste
        </Common.Title>
        <div className="grid grid-cols-2 grid-rows-3">
          {wearsLabel.map((label) => {
            return (
              <Form.Input.Checkbox
                key={label}
                label={label}
                name="category-filter"
                register={register('wear-filter')}
                value={label}
              />
            )
          })}
        </div>
      </div>
      <div className="absolute bottom-3 right-5 flex justify-end gap-3">
        <Form.Button
          buttonStyle={undefined}
          className="h-11 w-32 font-bold text-white"
          disabled={watch('wear-filter')?.length === 0}
          onClick={() => {
            cleanSelectedFilters({ ...selectedFilters, wears: [] })
            setValue('wear-filter', [''])
            setCheckedInputCheckbox(null)
            handleOpen()
          }}
          type="button"
        >
          Limpar
        </Form.Button>
        <Form.Button
          disabled={watch('wear-filter')?.length === 0}
          buttonStyle={undefined}
          className="h-11 w-32 border-none bg-mesh-color-primary-1200 font-bold text-black"
        >
          Aplicar
        </Form.Button>
      </div>
    </Form.Root>
  )
}
