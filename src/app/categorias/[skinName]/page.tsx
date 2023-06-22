/* eslint-disable camelcase */
'use client'
import { skins } from '@/Mock'
import AllSkins from '@/components/Skins/AllSkins'
import IconArrowLeft from '@/components/Icons/IconArrowLeft'
import { LayoutPage } from '@/components/Shared'
import SkinFilters from '@/components/SkinFilters'
import { Title } from '@/components/Title'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function Categorias() {
  const { skinName } = useParams()

  const nameCorrection = decodeURIComponent(skinName.replace(/\+/g, ' '))

  const skinsFiltered = skins.filter(({ name }) =>
    name.includes(nameCorrection),
  )

  return (
    <LayoutPage>
      <div className="flex w-full justify-center">
        <div className="mx-auto my-6 flex w-4/5 flex-col gap-6">
          <Link href={'/home'}>
            <Title className="w-fit stroke-mesh-color-neutral-300 text-mesh-color-neutral-300 transition-all hover:stroke-white hover:text-white">
              <IconArrowLeft /> Home &bull; {nameCorrection}
            </Title>
          </Link>
          <SkinFilters />
          {skinsFiltered.length === 0 ? (
            <div className="flex h-80 w-full items-center justify-center text-4xl font-bold text-white">
              Infelizmente ainda não temos nenhuma skin de
              <span className="ml-2 text-mesh-color-primary-1200">
                {nameCorrection}
              </span>
            </div>
          ) : (
            <AllSkins skinsCategories={skinsFiltered} itemsPerPage={15} />
          )}
        </div>
      </div>
    </LayoutPage>
  )
}
