'use client'
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
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

export default function Categorias() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''
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
    <div className="flex w-full justify-center">
      <div className="mx-auto my-6 flex w-4/5 flex-col gap-6">
        <Link href={'/home'}>
          <Common.Title className="w-fit stroke-mesh-color-neutral-300 text-mesh-color-neutral-300 transition-all hover:stroke-white hover:text-white">
            <IconArrowLeft /> Home &bull; {nameCorrection}
          </Common.Title>
        </Link>
        <SkinFilters />
        {isLoading ? (
          <AllSkeletonSkins />
        ) : data?.data && data?.data.length > 0 ? (
          <AllSkins skinsCategories={data?.data} itemsPerPage={15} />
        ) : (
          <div className="mb-16 flex h-[50vh] items-center justify-center">
            <Common.Title
              bold={600}
              className="text-2xl text-mesh-color-neutral-200"
            >
              Não foi encontrado nada relacionado a{' '}
              <span className="text-mesh-color-primary-1200">
                {nameCorrection}
                <span className="text-mesh-color-neutral-200">.</span>
              </span>
            </Common.Title>
          </div>
        )}
      </div>
    </div>
  )
}
