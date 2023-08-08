'use client'

import Common from '@/components/Common'
import IconArrowLeft from '@/components/Icons/IconArrowLeft'
import SkinFilters from '@/components/Others/SkinFilters'
import AllSkeletonSkins from '@/components/Others/Skins/AllSkeletonSkins'
import { IAllSkinsProps } from '@/components/Others/Skins/AllSkins'
import SkinService from '@/services/skin.service'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
const AllSkins = dynamic<IAllSkinsProps>(
  () =>
    import('@/components/Others/Skins/AllSkins').then(
      (module) => module.default,
    ),
  {
    ssr: false,
  },
)

export default function PageStoreSkins() {
  const search = useSearchParams().get('search') || ''
  const nameCorrection = decodeURIComponent(search.replace(/\+/g, ' '))

  const {
    data,
    refetch: refetchSkins,
    isLoading,
  } = useQuery({
    queryKey: ['skinsCategory'],
    queryFn: async () => {
      if (search !== null && search !== undefined && search !== '') {
        const data = await SkinService.findBySearchParameter(search)
        return data
      } else {
        const data = await SkinService.findByAll()
        return data
      }
    },
  })

  useEffect(() => {
    refetchSkins()
  }, [search])

  return (
    <>
      <Link href={'/'}>
        {nameCorrection ? (
          <Common.Title className="w-fit stroke-mesh-color-neutral-300 text-mesh-color-neutral-300 transition-all hover:stroke-white hover:text-white">
            <IconArrowLeft /> Home &bull; {nameCorrection}
          </Common.Title>
        ) : (
          <Common.Title className="w-fit stroke-mesh-color-neutral-300 text-mesh-color-neutral-300 transition-all hover:stroke-white hover:text-white">
            <IconArrowLeft /> Home
          </Common.Title>
        )}
      </Link>

      <SkinFilters />

      {isLoading ? (
        <AllSkeletonSkins />
      ) : data?.data && data?.data.length > 0 ? (
        <AllSkins skinsCategories={data?.data} itemsPerPage={15} />
      ) : (
        <div className="mb-16 flex h-[50vh] items-center justify-center">
          {nameCorrection ? (
            <Common.Title
              bold={600}
              className="text-2xl text-mesh-color-neutral-200"
            >
              Nenhum item relacionado a{' '}
              <span className="text-mesh-color-primary-1200">
                {nameCorrection}
                <span className="text-mesh-color-neutral-200">
                  {' '}
                  foi encontrado.
                </span>
              </span>
            </Common.Title>
          ) : (
            <Common.Title
              bold={600}
              className="text-2xl text-mesh-color-neutral-200"
            >
              Nenhum item encontrado.
            </Common.Title>
          )}
        </div>
      )}
    </>
  )
}
