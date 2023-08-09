'use client'
import Common from '@/components/Common'
import Form from '@/components/Forms'
import * as Dialog from '@radix-ui/react-dialog'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { formResolver } from './schemas/form.schema'

interface IProps {
  activator: React.ReactNode
}

export default function ModalTimeFilter({ activator }: IProps) {
  const [openModal, setOpenModal] = useState(false)
  const { register, handleSubmit } = useForm({ resolver: formResolver })

  const onSubmit = (data: any) => {
    console.log(data)
    setOpenModal(false)
  }

  return (
    <Dialog.Root onOpenChange={setOpenModal} open={openModal}>
      <Dialog.Trigger asChild>{activator}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 flex bg-black/70 transition-all" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-30 flex h-2/6 w-1/3 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-lg shadow-md">
          <div className="h-full w-full bg-mesh-color-neutral-700 p-4">
            <Form.Root
              onSubmit={handleSubmit(onSubmit)}
              className="flex h-full flex-col justify-between"
            >
              <div className="flex flex-col gap-4">
                <Common.Title bold={800} size="3xl" className="text-white">
                  Filtro de Tempo
                </Common.Title>

                <Form.Input.Radio.Default
                  name="options"
                  register={register('filter')}
                  wrapperClassname="font-semibold h-fit w-fit"
                  labelClassName="hover:cursor-pointer peer-checked:bg-mesh-color-primary-1200 peer-checked:text-black peer-checked:opacity-100 transition-all
                  text-white w-fit px-4 h-fit py-2 rounded-md bg-mesh-color-neutral-400 opacity-70 hover:opacity-100"
                  containerClassname="flex flex-wrap gap-4 w-5/6"
                  items={[
                    { label: 'Tudo', value: 'tudo' },
                    { label: 'Hoje', value: 'hoje' },
                    { label: '1-3 Dias', value: '1-3dias' },
                    { label: '1 Semana', value: '1semana' },
                    { label: '1 Mês', value: '1mes' },
                    { label: '3 Meses', value: '3meses' },
                    { label: '1 Ano', value: '1ano' },
                  ]}
                />
              </div>

              <div className="flex w-1/2 gap-4 self-end">
                <Form.Button type="reset" buttonStyle="opaque">
                  Limpar
                </Form.Button>
                <Form.Button buttonStyle="full">Aplicar</Form.Button>
              </div>
            </Form.Root>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
