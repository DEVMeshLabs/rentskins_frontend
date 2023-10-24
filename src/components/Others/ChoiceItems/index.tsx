'use client'

import Form from '@/components/Forms'
import useUserStore from '@/stores/user.store'
import { useState } from 'react'

interface Props {
  thereIsRented?: boolean
}

export default function ChoiceItems({ thereIsRented = false }: Props) {
  const [checkedSales, setCheckedSales] = useState(true)
  const [checkedRented, setCheckedRented] = useState(false)
  const { setItemsSoldOrRented } = useUserStore()
  return (
    <Form.Root>
      <div className="my-16 flex gap-16 self-start">
        <Form.Input.Radio.Choice
          title="Itens a Venda"
          value="sold"
          name="input-radio-choice"
          setState={() => {
            setItemsSoldOrRented('sold')
            setCheckedRented(false)
            setCheckedSales((state) => !state)
          }}
          checked={checkedSales}
        />
        {thereIsRented ? (
          <Form.Input.Radio.Choice
            title="Alugados"
            value="rented"
            name="input-radio-choice"
            setState={() => {
              setItemsSoldOrRented('rented')
              setCheckedSales(false)
              setCheckedRented((state) => !state)
            }}
            checked={checkedRented}
          />
        ) : null}
      </div>
    </Form.Root>
  )
}
