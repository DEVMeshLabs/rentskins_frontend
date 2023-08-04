export default function LayoutHeaderSkeleton() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-5 w-24 animate-pulse rounded-md bg-mesh-color-neutral-600" />
          <div className="flex h-5 w-24 animate-pulse rounded-md bg-mesh-color-neutral-600" />
        </div>
        <div className="flex h-[44px] w-28 animate-pulse rounded-md bg-mesh-color-neutral-600" />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 animate-pulse rounded-xl border-none bg-mesh-color-neutral-600" />

        <div className="flex items-end justify-center">
          <div className="flex h-[44px] w-[44px] animate-pulse rounded-full bg-mesh-color-neutral-600" />
        </div>
      </div>
    </div>
  )
}
