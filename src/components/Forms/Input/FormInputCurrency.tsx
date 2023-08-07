import { Dispatch, InputHTMLAttributes, SetStateAction } from 'react'
import { options } from '../options'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  showCurrencySign?: boolean
  enableDefault?: boolean
  currencySign?: string
  label?: string
  labelSide?: 'up' | 'down'
  labelClassName?: string
  currencyClassname?: string
  limit?: number
  inputClassName?: string
  state: string | number
  setState: Dispatch<SetStateAction<string>> | Dispatch<SetStateAction<number>>
}

export function FormInputCurrency({
  showCurrencySign = true,
  enableDefault = true,
  currencySign = 'R$',
  label,
  labelSide = 'up',
  labelClassName = 'text-white',
  currencyClassname,
  limit = 0,
  inputClassName,
  state,
  setState,
  ...rest
}: IProps) {
  const formatInput = (value: string | number): string => {
    let numbers = String(value).replace(/[^0-9.,]/g, '')

    numbers = numbers.replace('.', ',')

    if (limit > 0) {
      return numbers.slice(0, limit)
    }

    const sides = numbers.split(',')

    if (sides.length > 1) {
      const decimal = sides[1].slice(0, 2)
      return `${sides[0]},${decimal}`
    } else {
      return numbers
    }
  }

  return (
    <label className={`${labelClassName} flex flex-col text-lg`}>
      {label && labelSide === 'up' && label}
      <div className="flex items-center">
        {showCurrencySign && (
          <text
            className={`${currencyClassname} absolute ml-4 select-none font-semibold text-mesh-color-neutral-400`}
          >
            {currencySign}
          </text>
        )}
        <input
          type="text"
          step="any"
          onChange={({ target: { value } }) =>
            setState(
              formatInput(value) as SetStateAction<string> &
                SetStateAction<number>,
            )
          }
          value={state}
          className={`${inputClassName} pl-12 ${
            enableDefault && options.input.className
          }`}
          {...rest}
        />
      </div>
      {label && labelSide === 'down' && label}
    </label>
  )
}
