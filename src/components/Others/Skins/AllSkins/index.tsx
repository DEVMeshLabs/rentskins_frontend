/* eslint-disable camelcase */
'use client'
import { ISkins } from '@/interfaces/ISkins'
import classNames from 'classnames'
import { OtherCard } from '../../OtherCard/OtherCard'

export interface IAllSkinsProps {
  items: ISkins[] | undefined
  itemsPerPage?: number
  center?: boolean
  itsRent?: boolean
  userItems?: boolean
}

export default function AllSkins({
  items,
  center = false,
  itsRent,
  userItems,
}: IAllSkinsProps) {
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-start ">
      <div
        className={classNames(
          'mt-6 flex w-fit flex-wrap justify-center gap-x-5 gap-y-3',
          {
            'mb-6 mt-0 w-auto': items !== undefined,
            'justify-center': center,
          },
        )}
      >
        {items?.map((item, index: number) => {
          return (
            <div className="flex w-[17.5rem]" key={`skin-card-${index}`}>
              <OtherCard
                userItems={userItems}
                itsRent={itsRent}
                item={item}
                key={item.id}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
