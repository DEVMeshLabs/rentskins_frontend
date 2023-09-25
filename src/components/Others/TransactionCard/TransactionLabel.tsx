interface IProps {
  name: string
  weapon: string
}

export function TransactionLabel({ name, weapon }: IProps) {
  return (
    <div className="group flex h-16 w-64 flex-col justify-center">
      <span
        className="relative top-10 -mb-10 w-fit select-none flex-wrap whitespace-nowrap rounded-lg
          bg-mesh-color-neutral-300 px-2 text-black opacity-0 transition-all group-hover:opacity-100"
      >
        {name}
      </span>
      <span
        className={`group w-64 overflow-hidden text-ellipsis text-lg font-medium ${
          name.includes('StatTrak') && 'text-mesh-color-secondary-800'
        }`}
      >
        {name}
      </span>
      <span className="text-white/40"> {weapon} </span>
    </div>
  )
}
