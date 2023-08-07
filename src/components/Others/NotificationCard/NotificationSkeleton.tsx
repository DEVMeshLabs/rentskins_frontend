interface IProps {
  quantity?: number
}

export function NotificationSkeleton({ quantity = 1 }: IProps) {
  return (
    <>
      {Array.from({ length: quantity }).map((item, index) => (
        <div
          key={'notification-skeleton-' + index}
          className="flex h-[5.4rem] animate-pulse items-center justify-between rounded-lg bg-mesh-color-neutral-800 px-3 py-3 ease-in-out"
        >
          <div className="flex h-full w-full items-center gap-6">
            <div className="h-full w-20 rounded-md bg-mesh-color-neutral-900" />
            <div className="h-4 w-1/2 rounded-md bg-mesh-color-neutral-900 opacity-70" />
          </div>

          <div className="h-4 w-32 rounded-md bg-mesh-color-neutral-900 opacity-70" />
        </div>
      ))}
    </>
  )
}
