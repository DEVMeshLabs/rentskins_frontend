import classNames from 'classnames'
import CurrencyInput from 'react-currency-input-field'

type Props = {
  id?: string
  name?: string
  placeholder?: string
  className?: string
  onChange?: (value: number) => void
  errors?: any
  value: number | undefined
  defaultValue?: number | string
}

export function InputCurrency({
  onChange,
  name,
  className,
  value,
  errors,
  defaultValue,
  ...props
}: Props) {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-1">
      <CurrencyInput
        {...props}
        groupSeparator="."
        decimalSeparator=","
        decimalsLimit={2}
        value={value}
        defaultValue={defaultValue}
        onValueChange={(value) =>
          onChange ? onChange(Number(value)) : () => {}
        }
        className={classNames(className)}
      />
    </div>
  )
}
