interface IProps {
  name: string
  weapon: string
}

export function TransactionLabel({ name, weapon }: IProps) {
  return (
    <div className="group relative flex h-20 w-64 flex-col justify-center">
      <span
        className={`group w-64 overflow-hidden text-ellipsis text-lg font-medium transition-all ${
          name.includes('StatTrak') && 'text-mesh-color-secondary-800'
        }`}
      >
        {name}
      </span>
      <span className="text-white/40"> {weapon} </span>
    </div>
  )
}
