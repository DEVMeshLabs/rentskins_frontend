export default function PersonProfileSkeleton() {
  return (
    <section className="flex w-full justify-between self-start font-inter">
      <div className="flex gap-6">
        <div className="h-[200px] w-[200px] animate-pulse rounded-full bg-mesh-color-neutral-600" />

        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-2">
            <div className="h-8 w-48 animate-pulse rounded-md bg-mesh-color-neutral-600" />
            <div className="h-8 w-32 animate-pulse rounded-md bg-mesh-color-neutral-600" />
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="flex gap-1 text-lg text-white">
              <div className="h-6 w-32 animate-pulse rounded-md bg-mesh-color-neutral-600" />
            </h1>
          </div>
        </div>
      </div>
      <div className="flex w-[500px] flex-wrap gap-5">
        <div className="h-24 w-56 animate-pulse rounded-md bg-mesh-color-neutral-600" />
        <div className="h-24 w-56 animate-pulse rounded-md bg-mesh-color-neutral-600" />
        <div className="h-24 w-56 animate-pulse rounded-md bg-mesh-color-neutral-600" />
        <div className="h-24 w-56 animate-pulse rounded-md bg-mesh-color-neutral-600" />
      </div>
    </section>
  )
}
