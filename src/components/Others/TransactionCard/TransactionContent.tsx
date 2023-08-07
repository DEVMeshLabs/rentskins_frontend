interface IProps {
  text: string | number
  subtext?: string | number
  textIsCurrency: boolean
}

export function TransactionContent({
  text,
  subtext,
  textIsCurrency = false,
}: IProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col">
        <span>
          {!textIsCurrency
            ? text
            : text.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
              })}
        </span>
        <span className="text-white/40"> {subtext} </span>
      </div>
    </div>
  )
}
