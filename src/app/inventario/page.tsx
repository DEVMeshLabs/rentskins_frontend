'use client'
import { PageInventoryFilters } from '@/components/Pages/PageInventory/PageInventoryFilters'
import { PageInventoryMiddle } from '@/components/Pages/PageInventory/PageInventoryMiddle'
import { PageInventorySummary } from '@/components/Pages/PageInventory/PageInventorySummary'
import Authentication from '@/tools/authentication.tool'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Inventory() {
  const router = useRouter

  useEffect(() => {
    Authentication.validateUserSession(router)
  }, [router])

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
