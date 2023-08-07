'use client'
// import InputRadioChoice from '../InputRadioChoice'

interface Props {
  thereIsRented?: boolean
}

export default function ChoiceItems({ thereIsRented = false }: Props) {
  return (
    <div className="mt-16 flex gap-16 self-start">
      {/* <InputRadioChoice value="sales" checked={true}>
        Items à venda
      </InputRadioChoice>
      {thereIsRented ? (
        <InputRadioChoice checked={false} value="rented">
          Alugados
        </InputRadioChoice>
      ) : null} */}
    </div>
  )
}
