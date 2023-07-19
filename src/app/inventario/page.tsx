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
