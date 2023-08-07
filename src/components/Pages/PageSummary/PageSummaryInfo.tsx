import LineInfosSummaryh from '@/components/Others/SummaryItem'

export function PageSummaryInfo() {
  return (
    <div className="flex flex-col gap-5">
      <LineInfosSummaryh title="Itens" value="16" />
      <LineInfosSummaryh title="Subtotal" value="2.800,00" />
      <LineInfosSummaryh title="Taxa" value="15,00" />
      <LineInfosSummaryh title="Desconto promocional" value="5%" />
    </div>
  )
}
