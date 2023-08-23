'use client'

import Common from '@/components/Common'
import IconArrowLeft from '@/components/Icons/IconArrowLeft'
import LayoutPagination from '@/components/Layout/LayoutPagination'
import SkinFilters from '@/components/Others/SkinFilters'
import AllSkeletonSkins from '@/components/Others/Skins/AllSkeletonSkins'
import { IAllSkinsProps } from '@/components/Others/Skins/AllSkins'
import SkinService from '@/services/skin.service'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
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
  const router = useRouter()
  const search = useSearchParams().get('search') || ''
  const pageQuery = useSearchParams().get('page') || '1'
  const [page, setPage] = useState(pageQuery)
  const nameCorrection = decodeURIComponent(search.replace(/\+/g, ' '))

  useEffect(() => {
    router.push(`/loja?search=${search}&page=${page}`)
  }, [page, router, search])

  useEffect(() => {
    setPage(pageQuery)
  }, [pageQuery])

  const {
    data,
    refetch: refetchSkins,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: ['skinsCategory'],
    queryFn: async () => {
      console.log(page)
      if (search !== null && search !== undefined && search !== '') {
        const data = await SkinService.findBySearchParameter(search, page)
        return data
      } else {
        const data = await SkinService.findByAll(page)
        return data
      }
    },
  })

  useEffect(() => {
    refetchSkins()
  }, [search, page])

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

      {isLoading || isRefetching ? (
        <div className="">
          <AllSkeletonSkins quantitySkeletons={20} />
        </div>
      ) : data?.data?.skins && data?.data?.skins?.length > 0 ? (
        <div>
          <AllSkins skinsCategories={data?.data.skins} itemsPerPage={15} />
        </div>
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

      {data?.data?.totalPages &&
        data?.data?.totalItens > 0 &&
        Number(page) <= data?.data?.totalPages && (
          <LayoutPagination
            maxPages={data?.data?.totalPages}
            pageState={page}
            setPageState={setPage}
          />
        )}
    </>
  )
}
