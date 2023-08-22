/* eslint-disable camelcase */
'use client'
import { ISkins } from '@/interfaces/ISkins'
import classNames from 'classnames'
import Link from 'next/link'
import { OtherCard } from '../../OtherCard/OtherCard'

export interface IAllSkinsProps {
  skinsCategories: ISkins[] | undefined
  center?: boolean
  itemsPerPage: number
}

export default function AllSkins({
  skinsCategories,
  center = false,
  itemsPerPage = 10,
}: IAllSkinsProps) {
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-start bg-blue-500">
      <div
        className={classNames(
          'mt-6 grid w-fit grid-cols-1 justify-center gap-2 bg-green-500 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6',
          {
            'mb-6 mt-0 w-auto': skinsCategories !== undefined,
            'justify-center': center,
          },
        )}
      >
        {skinsCategories?.map(
          (
            {
              skin_name,
              skin_color,
              skin_image,
              skin_float,
              skin_price,
              skin_weapon,
              id,
            }: ISkins,
            index: number,
          ) => {
            return (
              <>
                <Link
                  key={`${id}-${index}`}
                  href={`/detalhes/${id}`}
                  className="flex w-[17.5rem]"
                >
                  <OtherCard
                    skinImage={skin_image}
                    sellerName={skin_name}
                    skinColor={skin_color}
                    skinWeapon={skin_weapon}
                    skinFloat={skin_float}
                    skinPrice={skin_price}
                    key={id}
                  />
                </Link>
              </>
            )
          },
        )}
      </div>
    </div>
  )
}
