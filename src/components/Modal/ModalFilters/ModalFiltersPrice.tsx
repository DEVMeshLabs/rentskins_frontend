'use client'
import Common from '@/components/Common'
import Form from '@/components/Forms'
import { useState } from 'react'

export default function ModalFiltersPrice() {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-5">
        <Common.Title color="white" size="2xl" bold={600}>
          Preço
        </Common.Title>
        <div className="flex w-full items-center gap-5">
          <InputValue title="Preço mínimo" />
          <hr className="mt-6 w-9" />
          <InputValue title="Preço máximo" />
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Common.Button className="h-11 w-32 font-bold text-white">
          Limpar
        </Common.Button>
        <Common.Button className="h-11 w-32 border-none bg-mesh-color-primary-1200 font-bold text-black">
          Aplicar
        </Common.Button>
      </div>
    </div>
  )
}

interface IProps {
  title: string
}

function InputValue({ title }: IProps) {
  const [value, setValue] = useState('')
  return (
    <div className="flex flex-col gap-2">
      <Common.Title color="white" size="sm">
        {title}
      </Common.Title>
      <div className="items flex items-center">
        <div className="absolute ml-2 text-sm font-semibold text-mesh-color-neutral-0 opacity-60">
          R$
        </div>
        <Form.Input.Currency
          showCurrencySign={false}
          state={value}
          setState={setValue}
          // className="h-10 w-full rounded bg-mesh-color-neutral-900 pl-8 text-white outline-none active:border-mesh-color-primary-700"
          inputClassName="h-10 w-full rounded bg-mesh-color-neutral-900 pl-8 text-white outline-none active:border-mesh-color-primary-700"
        />
      </div>
    </div>
  )
}
