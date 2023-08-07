import AllSkinsCart from '@/components/Others/Skins/AllSkinsCart'
import { PageSummaryCart } from '@/components/Pages/PageSummary/PageSummaryCart'

export default function Carrinho() {
  return (
    <main className="flex w-full justify-center">
      <div className="my-6 flex w-3/4 items-start justify-center gap-6">
        <AllSkinsCart />
        <PageSummaryCart />
      </div>
    </main>
  )
}
