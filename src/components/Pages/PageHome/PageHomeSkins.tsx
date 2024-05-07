'use client'

import Common from '@/components/Common'
import AllSkeletonSkins from '@/components/Others/Skins/AllSkeletonSkins'
import AllSkins from '@/components/Others/Skins/AllSkins'
import SkinService from '@/services/skin.service'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

export default function PageHomeSkins() {
  const { data: allItems, isLoading: isLoadingAllItems } = useQuery({
    queryKey: ['allItems'],
    queryFn: () => SkinService.findByAll(),
    cacheTime: 0,
    refetchOnMount: true,
    refetchOnReconnect: true,
  })

  return (
    <>
      {isLoadingAllItems ? (
        <AllSkeletonSkins quantitySkeletons={20} />
      ) : allItems?.data && allItems?.data?.skins.length > 0 ? (
        <div className="flex h-full w-full flex-col items-center">
          <AllSkins items={allItems?.data?.skins} />
          <Link
            href={`/loja?page=${allItems?.data.totalPages > 1 ? 2 : 1}`}
            className="flex items-center justify-center rounded-md border border-mesh-color-primary-1200 bg-mesh-color-primary-1200 p-1 px-4 py-3 text-lg font-bold text-mesh-color-others-black
        opacity-60 transition enabled:hover:opacity-100 disabled:border-mesh-color-neutral-500 
        disabled:bg-mesh-color-neutral-500 disabled:text-mesh-color-neutral-300"
          >
            Continuar na Loja
          </Link>
        </div>
      ) : (
        <div className="flex h-[30vh] w-full items-center justify-center">
          <Common.Title bold={600} size="2xl" className="text-white">
            Sem itens disponíveis no momento.
          </Common.Title>
        </div>
      )}
    </>
  )
}
