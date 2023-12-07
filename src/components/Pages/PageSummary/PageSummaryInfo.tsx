import LineInfosSummaryh from '@/components/Others/SummaryItem'
import useCartStore from '@/stores/cart.store'

interface IProps {
  totalPrice: string
}

export function PageSummaryInfo({ totalPrice }: IProps) {
  const { skinsToBuy } = useCartStore()

  return (
    <div className="flex flex-col gap-5">
      <LineInfosSummaryh
        title="Itens"
        value={skinsToBuy.length > 0 ? String(skinsToBuy.length) : '0'}
      />
      <LineInfosSummaryh title="Subtotal" value={totalPrice} cash={true} />
      <LineInfosSummaryh title="Desconto promocional" value="5%" />
    </div>
  )
}
