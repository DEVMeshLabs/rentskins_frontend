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
    <div className="flex h-full min-w-[150px] max-w-[150px] items-center gap-4">
      <div className="mx-auto flex flex-col">
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
