'use client'
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import Common from '@/components/Common'
import IconArrowLeft from '@/components/Icons/IconArrowLeft'
import SkinFilters from '@/components/Others/SkinFilters'
import AllSkins from '@/components/Others/Skins/AllSkins'
import AllSkeletonSkins from '@/components/Skins/AllSkeletonSkins'
import { ISkins } from '@/interfaces/ISkins'
import SkinService from '@/services/skin.service'
import useComponentStore from '@/stores/components.store'
import useFilterStore from '@/stores/filters.store'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Categorias() {
  const { skinName } = useParams()
  const [filteredSkins, setFiltedSkins] = useState<ISkins[]>([])
  const nameCorrection = decodeURIComponent(skinName.replace(/\+/g, ' '))
  const { setAllSkinsCategory } = useComponentStore()

  const { selectedFilters, setAllSkinsFiltred, typeFilter, allSkinsFiltred } =
    useFilterStore()

  const { data, isLoading } = useQuery({
    queryKey: ['skinsCategory'],
    queryFn: async () => {
      const data = await SkinService.findAllSkinsByWeapon(nameCorrection)
      setAllSkinsCategory(data?.data as ISkins[])
      return data
    },
  })

  useEffect(() => {
    if (data) {
      const filteredItems = data?.data.filter((item) => {
        if (
          selectedFilters.wears?.length !== 0 &&
          !selectedFilters.wears?.includes(item.status_float)
        ) {
          return false
        }
        if (
          selectedFilters.prices.max !== null &&
          selectedFilters.prices.min !== null &&
          (Number(item.skin_price.replace(',', '.')) >
            selectedFilters.prices.max ||
            Number(item.skin_price.replace(',', '.')) <
              selectedFilters.prices.min)
        ) {
          return false
        }
        if (
          selectedFilters.categories?.length !== 0 &&
          !selectedFilters.categories?.some((categoryItem) =>
            item.skin_name.includes(categoryItem),
          )
        ) {
          return false
        }
        return true
      })
      setFiltedSkins(filteredItems)
      setAllSkinsFiltred(filteredItems, typeFilter)
    }
  }, [setAllSkinsFiltred, selectedFilters, typeFilter, data])

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
        ) : filteredSkins.length > 0 || allSkinsFiltred.length > 0 ? (
          <AllSkins
            skinsCategories={filteredSkins || allSkinsFiltred}
            itemsPerPage={15}
          />
        ) : (
          <Common.SearchFeedback title={nameCorrection} />
        )}
      </div>
    </div>
  )
}
