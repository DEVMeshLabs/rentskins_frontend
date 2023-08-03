'use client'
import Authentication from '@/tools/authentication.tool'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

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
  const router = useRouter()
  useEffect(() => Authentication.authenticate(router), [router])

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
