'use client'

import Common from '@/components/Common'
import AllSkeletonSkins from '@/components/Others/Skins/AllSkeletonSkins'
import { IAllSkinsProps } from '@/components/Others/Skins/AllSkins'
import SkinService from '@/services/skin.service'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
const AllSkins = dynamic<IAllSkinsProps>(
  () =>
    import('@/components/Others/Skins/AllSkins').then(
      (module) => module.default,
    ),
  {
    ssr: false,
  },
)

export default function PageHomeSkins() {
  const { data, isLoading } = useQuery({
    queryKey: ['allSkins'],
    queryFn: () => SkinService.findByAll(),
  })

  return (
    <>
      {isLoading ? (
        <AllSkeletonSkins quantitySkeletons={20} />
      ) : data?.data ? (
        <AllSkins skinsCategories={data?.data} itemsPerPage={15} />
      ) : (
        <div className="flex h-[30vh] w-full items-center justify-center">
          <Common.Title bold={600} size="2xl" className="text-white">
            Sem items disponíveis no momento.
          </Common.Title>
        </div>
      )}
    </>
  )
}
