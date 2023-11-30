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
    <div className="flex h-full w-[150px] items-center justify-start gap-4">
      <div className="flex w-full flex-col">
        <span>
          {!textIsCurrency
            ? text
            : text.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
              })}
        </span>
        <span className="text-sm text-white/40 2xl:text-base"> {subtext} </span>
      </div>
    </div>
  )
}
