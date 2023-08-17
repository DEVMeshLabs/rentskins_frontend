/* eslint-disable camelcase */
'use client'
import classNames from 'classnames'
import { ISkins } from '@/interfaces/ISkins'
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
    <div className="flex w-full flex-col items-center">
      <div
        className={classNames('mt-6 flex w-full flex-wrap gap-3', {
          'mb-6 mt-0 w-auto': skinsCategories !== undefined,
          'justify-center': center,
        })}
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
