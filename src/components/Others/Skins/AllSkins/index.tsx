/* eslint-disable camelcase */
'use client'
import classNames from 'classnames'
import { ISkins } from '@/interfaces/ISkins'
import { OtherCard } from '../../OtherCard/OtherCard'

export interface IAllSkinsProps {
  skinsCategories: ISkins[] | undefined
  itemsPerPage?: number
  center?: boolean
  itsRent?: boolean
}

export default function AllSkins({
  skinsCategories,
  center = false,
  itsRent,
}: IAllSkinsProps) {
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-start ">
      <div
        className={classNames(
          'mt-6 flex w-fit flex-wrap justify-center gap-x-5 gap-y-3',
          {
            'mb-6 mt-0 w-auto': skinsCategories !== undefined,
            'justify-center': center,
          },
        )}
      >
        {skinsCategories?.map((item, index: number) => {
          return (
            <div className="flex w-[17.5rem]" key={`skin-card-${index}`}>
              <OtherCard itsRent={itsRent} item={item} key={item.id} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
