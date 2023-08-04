interface IProps {
  quantity: number
}

export function CardSkinSkeleton({ quantity = 1 }: IProps) {
  return (
    <div className="flex flex-wrap items-center justify-start gap-4">
      {Array.from({ length: quantity }).map((item, index) => {
        return (
          <div
            key={'inventory-skeleton-' + index}
            className="h-[275px] w-[206px] gap-3 rounded-lg border-[1px] border-mesh-color-neutral-600 border-opacity-60 px-3 pb-4 pt-3 text-white"
          >
            <div className="h-32 w-full animate-pulse rounded-lg bg-mesh-color-neutral-600 px-4" />
            <div className="my-4 flex animate-pulse flex-col gap-2">
              <div className="h-5 w-8/12 rounded-md bg-mesh-color-neutral-600 px-4" />
              <div className="h-4 w-5/12 rounded-md bg-mesh-color-neutral-600 px-4" />
            </div>
            <div className="flex animate-pulse flex-col gap-4">
              <div className="h-6 w-4/12 rounded-md bg-mesh-color-neutral-600 px-4" />
              <div className="h-3 w-full rounded-full bg-mesh-color-neutral-600 px-4" />
            </div>
          </div>
        )
      })}
    </div>
  )
}
