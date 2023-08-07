import useFilterStore from '@/stores/filters.store'

interface IProps {
  inputValues: string[]
  setValues: (wears: string[]) => void
  values: string[]
  defaultChecks?: string[] | null
}

export default function InputCheckboxFilter({
  inputValues,
  setValues,
  values,
  defaultChecks,
}: IProps) {
  const { setCheckedInputCheckbox, checkedInputCheckbox } = useFilterStore()
  return (
    <div className="grid grid-cols-2 gap-x-10 gap-y-5">
      {inputValues.map((value, idx) => (
        <label
          key={`${value}-${idx}`}
          className="group flex cursor-pointer items-center gap-2 text-white"
        >
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              value={value}
              className="peer absolute z-[-1]"
              defaultChecked={defaultChecks?.includes(value)}
              onChange={({ target: { value, checked } }) => {
                setCheckedInputCheckbox({ value, checked })
                if (!values.includes(value)) {
                  setValues([...values, value])
                }
              }}
              checked={
                checkedInputCheckbox.some(
                  ({ value: valueinput }) => valueinput === value,
                ) &&
                checkedInputCheckbox.filter(
                  ({ value: valueinput }) => valueinput === value,
                )[0].checked
              }
            />
            <div className="flex h-5 w-5 items-start justify-center rounded border border-mesh-color-neutral-400 transition-all group-hover:bg-mesh-color-primary-100 peer-checked:bg-mesh-color-primary-1200"></div>
            <div className="absolute mb-1 h-2 w-3 -rotate-45 border-black peer-checked:border-b-2 peer-checked:border-l-2" />
          </div>
          {value}
        </label>
      ))}
    </div>
  )
}
