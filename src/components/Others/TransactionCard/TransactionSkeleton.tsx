interface IProps {
  quantity?: number
}

export function TransactionSkeleton({ quantity = 4 }: IProps) {
  return (
    <>
      {Array.from({ length: quantity }).map((item, index) => (
        <div
          key={'transactions-skeleton-' + index}
          className="flex h-28 animate-pulse items-center justify-start gap-16 rounded-lg bg-mesh-color-neutral-800 px-4 py-3 text-white"
        >
          <div className="flex h-full w-4/12 items-center gap-4">
            <div className="h-full w-28 rounded-md bg-mesh-color-neutral-900 " />
            <div className="flex h-fit w-1/2 flex-col gap-2">
              <div className="h-4 w-full rounded-sm bg-mesh-color-neutral-900" />
              <div className="h-4 w-full rounded-sm bg-mesh-color-neutral-900" />
            </div>
          </div>
          <div className="flex h-full w-2/12 items-center">
            <div className="h-4 w-full rounded-sm bg-mesh-color-neutral-900" />
          </div>
          <div className="flex h-full w-1/12 items-center">
            <div className="h-4 w-full rounded-sm bg-mesh-color-neutral-900" />
          </div>
        </div>
      ))}
    </>
  )
}
