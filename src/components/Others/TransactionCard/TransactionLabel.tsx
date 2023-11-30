interface IProps {
  name: string
  weapon: string
}

export function TransactionLabel({ name, weapon }: IProps) {
  return (
    <div className="group relative flex h-full max-h-[100px] w-full flex-col justify-center overflow-hidden">
      <span
        className={`overflow-hidden text-ellipsis text-base font-medium transition-all 2xl:text-lg ${
          name.includes('StatTrak') && 'text-mesh-color-secondary-800'
        }`}
      >
        M4A4 | In Living Color (Field-Tested)
        {/* {name} */}
      </span>
      <span className="text-xs text-white/40 2xl:text-base"> {weapon} </span>
    </div>
  )
}
