'use client'

import AllSkeletonSkins from '@/components/Others/Skins/AllSkeletonSkins'
import { IAllSkinsProps } from '@/components/Others/Skins/AllSkins'
import SkinService from '@/services/skin.service'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

export default function PageHomeSkins() {
  const AllSkins = dynamic<IAllSkinsProps>(
    () =>
      import('@/components/Others/Skins/AllSkins').then(
        (module) => module.default,
      ),
    {
      ssr: false,
    },
  )

  const { data, isLoading } = useQuery({
    queryKey: ['allSkins'],
    queryFn: () => SkinService.findByAll(),
  })
  return (
    <>
      {isLoading ? (
        <AllSkeletonSkins quantitySkeletons={20} />
      ) : (
        <AllSkins skinsCategories={data?.data} itemsPerPage={15} />
      )}
    </>
  )
}
