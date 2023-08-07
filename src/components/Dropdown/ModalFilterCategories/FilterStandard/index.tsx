'use client'
import StandardCheckboxItem from './StandardCheckboxItem'

export default function FilterStandard() {
  return (
    <div className="flex h-full w-full flex-col justify-between gap-1">
      <StandardCheckboxItem value="lowestPrice" title="Menor preço" />
      <StandardCheckboxItem value="biggestPrice" title="Maior Preço" />
      <StandardCheckboxItem value="biggestFloat" title="Maior float" />
    </div>
  )
}
