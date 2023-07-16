/* eslint-disable camelcase */
'use client'
import { ISkins } from '@/interfaces/ISkins'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { OtherCard } from '../../OtherCard/OtherCard'

interface IProps {
  skinsCategories: ISkins[] | undefined
  center?: boolean
  itemsPerPage: number
}

export default function AllSkins({
  skinsCategories,
  center = false,
  itemsPerPage = 10,
}: IProps) {
  const router = useRouter()

  const onCardClick = (id: string) => {
    router.push(`/details/${id}`)
  }

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
              <div key={'skin-card-' + index}>
                <OtherCard
                  onCardClick={() => onCardClick(id)}
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
