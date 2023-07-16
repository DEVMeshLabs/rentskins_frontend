import { Dispatch, SetStateAction } from 'react'
import Form from '../Forms'

interface IProps {
  disabled?: boolean
  maxPages: number
  pageState: string | number
  setPageState:
    | Dispatch<SetStateAction<number>>
    | Dispatch<SetStateAction<string>>
}

export default function LayoutPagination({
  disabled = false,
  maxPages,
  pageState,
  setPageState,
}: IProps) {
  return (
    <div className="mt-12 flex items-end justify-center gap-2">
      {Number(pageState) - 4 >= 1 && (
        <>
          <button
            className="relative top-6 h-10 w-10 rounded-lg border
            border-mesh-color-neutral-400 bg-transparent text-white hover:bg-mesh-color-neutral-500
            disabled:opacity-20 disabled:hover:bg-transparent"
            onClick={() => setPageState(1 as any)}
            disabled={disabled}
          >
            1
          </button>
          <div
            className={`relative top-6 mx-2 select-none text-white ${
              disabled && 'opacity-20'
            }`}
          >
            ...
          </div>
        </>
      )}
      {Number(maxPages) > 1 && (
        <Form.Input.Radio.Block
          state={pageState}
          setState={setPageState}
          name="inventory-pagination"
          containerClassname="flex gap-2"
          labelClassname="flex w-full h-full bg-transparent border-mesh-color-neutral-400
        border rounded-lg text-white peer-checked:text-mesh-color-others-black
        peer-checked:bg-mesh-color-primary-1200 peer-disabled:cursor-default
          peer-disabled:hover:bg-transparent peer-disabled:peer-checked:hover:bg-mesh-color-primary-1200
          peer-disabled:opacity-20 hover:bg-mesh-color-neutral-500
          peer-checked:font-bold peer-checked:border-mesh-color-primary-1200"
          wrapperClassname="w-10 h-10"
          options={renderPagesOptions(maxPages, Number(pageState), disabled)}
        />
      )}
      {Number(pageState) + 4 <= maxPages && (
        <>
          <div
            className={`relative top-6 mx-2 select-none text-white ${
              disabled && 'opacity-20'
            }`}
          >
            ...
          </div>
          <button
            className="relative top-6 h-10 w-10 rounded-lg border
            border-mesh-color-neutral-400 bg-transparent text-white hover:bg-mesh-color-neutral-500
            disabled:opacity-20 disabled:hover:bg-transparent"
            onClick={() => setPageState(maxPages as any)}
            disabled={disabled}
          >
            {maxPages}
          </button>
        </>
      )}
    </div>
  )
}

const renderPagesOptions = (
  maxPages: number,
  page: number,
  disabled: boolean,
): any => {
  return Array.from({ length: maxPages }).map((item, index) => {
    if (page + 2 >= index && page - 4 <= index) {
      return {
        value: index + 1,
        label: index + 1,
        labelType: 'string',
        disabled,
        checked: page === index + 1,
      }
    }

    return null
  })
}
