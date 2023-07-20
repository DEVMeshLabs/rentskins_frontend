interface IProps {
  isRent?: boolean
}

export default function SkeletonCardSkin({ isRent }: IProps) {
  return (
    <article className="flex w-[17.5rem] animate-pulse flex-col gap-3 rounded-lg border-2 border-mesh-color-neutral-600 border-opacity-60 px-3 pb-4 pt-3 text-white">
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-mesh-color-neutral-400 bg-mesh-gradient-black-pattern">
        <div className="flex h-[163px] w-[206px] items-center justify-center"></div>
      </div>
      <div className="mt-1 flex h-11 flex-col gap-3">
        <h1 className="h-5 w-1/2 rounded bg-mesh-color-neutral-500"></h1>
        <h1 className="h-5 w-1/6 rounded bg-mesh-color-neutral-500"></h1>
      </div>
      <div className="">
        <div className="flex justify-end gap-2">
          {isRent && (
            <div className="h-9 w-9 rounded-lg border-transparent bg-mesh-color-neutral-500 p-4 text-mesh-color-neutral-500"></div>
          )}
          <div className="h-9 w-9 rounded-lg border-transparent bg-mesh-color-neutral-500 p-4 text-mesh-color-neutral-500"></div>
          <div className="h-9 w-9 rounded-lg border-transparent bg-mesh-color-neutral-500 p-4 text-mesh-color-neutral-500"></div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="h-6 w-24 rounded bg-mesh-color-neutral-500"></div>
        <div className="h-6 w-24 rounded bg-mesh-color-neutral-500"></div>
      </div>
      <div className="h-[6px] w-full items-center rounded-sm bg-mesh-color-neutral-500"></div>
      <div className="flex items-center justify-end">
        <div className="flex gap-2">
          <div className="h-9 w-9 rounded-lg border-transparent bg-mesh-color-neutral-500 p-4 text-mesh-color-neutral-500">
            {' '}
          </div>
          <div className="flex items-center rounded-lg border-transparent bg-mesh-color-neutral-500 px-4 text-mesh-color-neutral-500">
            Comprar
          </div>
        </div>
      </div>
    </article>
  )
}
