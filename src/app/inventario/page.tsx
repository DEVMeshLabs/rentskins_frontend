import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const PageInventoryFilters = dynamic(() =>
  import('@/components/Pages/PageInventory/PageInventoryFilters').then(
    (module) => module.default,
  ),
)
const PageInventoryMiddle = dynamic(() =>
  import('@/components/Pages/PageInventory/PageInventoryMiddle').then(
    (module) => module.default,
  ),
)
const PageInventorySummary = dynamic(() =>
  import('@/components/Pages/PageInventory/PageInventorySummary').then(
    (module) => module.default,
  ),
)

export const metadata: Metadata = {
  title: 'Inventário - RentSkins',
  description: `Rentskins é a melhor plataforma para comprar, vender e alugar skins do CS:GO.
  Encontre skins raras e exclusivas para personalizar seu jogo.`,
}

export default function Inventory() {
  // const router = useRouter()
  // useEffect(() => Authentication.authenticate(router), [router])

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
