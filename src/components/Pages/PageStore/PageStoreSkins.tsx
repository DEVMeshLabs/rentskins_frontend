'use client'
import Common from '@/components/Common'
import IconArrowLeft from '@/components/Icons/IconArrowLeft'
import LayoutPagination from '@/components/Layout/LayoutPagination'
import SkinFilters from '@/components/Others/SkinFilters'
import AllSkeletonSkins from '@/components/Others/Skins/AllSkeletonSkins'
import AllSkins from '@/components/Others/Skins/AllSkins'
import { ISkins } from '@/interfaces/ISkins'
import SkinService from '@/services/skin.service'
import useFilterStore from '@/stores/filters.store'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
//

export default function PageStoreSkins() {
  const router = useRouter()
  const search = useSearchParams().get('search') || ''
  const category = useSearchParams().get('category') || ''
  const pageQuery = useSearchParams().get('page') || '1'
  const [page, setPage] = useState(pageQuery)
  const nameCorrection = decodeURIComponent(search.replace(/\+/g, ' '))
  const { selectedFilters, typeFilter } = useFilterStore()

  console.log(category)

  useEffect(() => {
    if (!category) {
      router.push(`/loja?search=${search}&page=${page}`)
    }
  }, [page, router, search, category])

  useEffect(() => {
    setPage(pageQuery)
  }, [pageQuery])

  const {
    data,
    refetch: refetchSkins,
    isRefetching,
    isLoading,
  } = useQuery({
    queryKey: ['skinsCategory', category],
    queryFn: async () => {
      console.log(category)
      if (search !== null && search !== undefined && search !== '') {
        const data = await SkinService.findBySearchParameter(search, 'name')
        return data
      } else if (category) {
        return SkinService.findBySearchParameter(category, 'category')
      } else {
        const data = await SkinService.findByAll(page)
        return data
      }
    },
    keepPreviousData: true,
  })

  const organized = {
    biggestPrice: (a: ISkins, b: ISkins) =>
      parseFloat(String(b.skin_price)) - parseFloat(String(a.skin_price)),
    lowestPrice: (a: ISkins, b: ISkins) =>
      parseFloat(String(a.skin_price)) - parseFloat(String(b.skin_price)),
    biggestFloat: (a: ISkins, b: ISkins) =>
      parseFloat(b.skin_float) - parseFloat(a.skin_float),
    lowestFloat: (a: ISkins, b: ISkins) =>
      parseFloat(a.skin_float) - parseFloat(b.skin_float),
    default: () => 1,
  }

  const allSkinsFilters =
    data?.data &&
    data?.data?.skins?.filter((skin) => {
      if (
        selectedFilters.categories &&
        selectedFilters.categories.length > 0 &&
        !selectedFilters.categories.some((category) =>
          skin.skin_name.includes(category),
        )
      ) {
        return false
      }

      if (
        selectedFilters.wears &&
        selectedFilters.wears.length > 0 &&
        !selectedFilters.wears.some((wears) =>
          skin.status_float.includes(wears),
        )
      ) {
        return false
      }

      if (
        selectedFilters.prices.min !== undefined &&
        Number(skin.skin_price) <
          Number(selectedFilters.prices.min.replace(/[^0-9]/g, ''))
      ) {
        return false
      }

      if (
        selectedFilters.prices.max !== undefined &&
        Number(skin.skin_price) >
          Number(selectedFilters.prices.max.replace(/[^0-9]/g, ''))
      ) {
        return false
      }

      return true
    })

  useEffect(() => {
    refetchSkins()
  }, [search, page, refetchSkins])

  return (
    <>
      <Link href={'/'}>
        <Common.Title className="w-fit stroke-mesh-color-neutral-300 text-mesh-color-neutral-300 transition-all hover:stroke-white hover:text-white">
          <IconArrowLeft /> Home {nameCorrection && `• ${nameCorrection}`}
        </Common.Title>
      </Link>
      <SkinFilters />
      {isLoading || isRefetching ? (
        <AllSkeletonSkins />
      ) : data &&
        data!.data.skins.length > 0 &&
        allSkinsFilters &&
        allSkinsFilters.length > 0 ? (
        <AllSkins
          skinsCategories={
            !typeFilter
              ? allSkinsFilters
              : allSkinsFilters.sort(organized[typeFilter])
          }
        />
      ) : (
        <div className="mb-16 flex h-[50vh] items-center justify-center">
          {nameCorrection ? (
            <Common.Title
              bold={600}
              className="text-2xl text-mesh-color-neutral-200"
            >
              Nenhum item relacionado a{' '}
              <span className="text-mesh-color-primary-1200">
                {nameCorrection === 'Agent' ? 'Agente' : nameCorrection}
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

      {data?.data &&
        data?.data?.totalPages > 1 &&
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
