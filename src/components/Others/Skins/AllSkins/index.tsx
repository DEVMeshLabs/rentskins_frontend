/* eslint-disable camelcase */
'use client'
import classNames from 'classnames'
import { ISkins } from '@/interfaces/ISkins'
import { OtherCard } from '../../OtherCard/OtherCard'

export interface IAllSkinsProps {
  skinsCategories: ISkins[] | undefined
  itemsPerPage?: number
  center?: boolean
}

export default function AllSkins({
  skinsCategories,
  center = false,
}: IAllSkinsProps) {
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-start ">
      <div
        className={classNames(
          'mt-6 flex w-fit flex-wrap justify-center gap-2',
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
              <div className="flex w-[17.5rem]" key={`skin-card-${index}`}>
                <OtherCard
                  id={id}
                  skinImage={skin_image}
                  sellerName={skin_name}
                  skinColor={skin_color}
                  skinWeapon={skin_weapon}
                  skinFloat={skin_float}
                  skinPrice={skin_price}
                  key={id}
                />
              </div>
            )
          },
        )}
      </div>
    </div>
  )
}
