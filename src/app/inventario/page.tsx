import PageInventoryFilters from '@/components/Pages/PageInventory/PageInventoryFilters'
import PageInventoryMiddle from '@/components/Pages/PageInventory/PageInventoryMiddle'
import PageInventorySummary from '@/components/Pages/PageInventory/PageInventorySummary'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inventário - RentSkins',
  description: `RentSkins é a melhor plataforma para comprar, vender e alugar skins do Counter-Strike. Encontre skins raras e exclusivas para personalizar seu jogo.`,
}

export default function Inventory() {
  return (
    <main className="w-full bg-mesh-color-others-black pt-[32px]">
      <div className="mx-auto grid w-10/12 grid-cols-10">
        <div className="col-span-2">
          <PageInventoryFilters />
        </div>
        <div className="col-span-6">
          <PageInventoryMiddle />
        </div>
        <div className="col-span-2">
          <PageInventorySummary />
        </div>
      </div>
    </main>
  )
}
