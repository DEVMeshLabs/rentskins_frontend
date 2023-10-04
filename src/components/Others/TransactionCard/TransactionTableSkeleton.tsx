interface IProps {
  quantity?: number
}

export function TransactionTableSkeleton({ quantity = 4 }: IProps) {
  const cell = ({
    index,
    width = 'w-full',
    justify = 'center',
  }: {
    index: number
    width?: string
    justify?: string
  }) => (
    <div className={`flex w-full justify-${justify}`}>
      <div
        className={`h-4 ${width} rounded-sm ${
          index % 2 !== 0
            ? 'bg-mesh-color-neutral-800'
            : 'bg-mesh-color-neutral-900'
        }`}
      />
    </div>
  )

  return (
    <>
      {Array.from({ length: quantity }).map((item, index) => (
        <div
          key={'transactions-skeleton-' + index}
          className="grid grid-cols-6 items-center justify-start py-4 last:rounded-b-lg odd:bg-mesh-color-neutral-900 even:bg-mesh-color-neutral-800"
        >
          <div className="flex w-full justify-center">
            <div
              className={`h-24 w-32 rounded-md ${
                index % 2 !== 0
                  ? 'bg-mesh-color-neutral-800'
                  : 'bg-mesh-color-neutral-900'
              }`}
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            {cell({ index, width: 'w-4/5', justify: 'start' })}
            {cell({ index, width: 'w-4/5', justify: 'start' })}
          </div>

          {cell({ index, width: 'w-2/3', justify: 'start' })}

          {cell({ index, width: 'w-2/3' })}

          {cell({ index, width: 'w-2/3' })}

          {cell({ index, width: 'w-2/3' })}
        </div>
      ))}
    </>
  )
}
