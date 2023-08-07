import Common from '@/components/Common'

interface IProps {
  title: string
  value: number | undefined
  defaultValue?: number
  setValue: (value: number | undefined) => void
}

export default function InputValue({
  title,
  value,
  setValue,
  defaultValue,
}: IProps) {
  return (
    <div className="flex flex-col gap-2">
      <Common.Title color="white" size="sm">
        {title}
      </Common.Title>
      <label className="items flex items-center">
        <div className="absolute ml-2 text-sm font-semibold text-mesh-color-neutral-0 opacity-60">
          R$
        </div>
        <input
          onChange={({ target: { value } }) =>
            /^[0-9]+$/.test(value) && setValue(+value)
          }
          value={value || ''}
          defaultValue={defaultValue}
          className="h-10 w-full rounded bg-mesh-color-neutral-900 pl-8 text-white outline-none active:border-mesh-color-primary-700"
        />
      </label>
    </div>
  )
}
