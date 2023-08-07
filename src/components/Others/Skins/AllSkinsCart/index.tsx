/* eslint-disable camelcase */
'use client'
import { skins } from '@/Mock'
import { useState } from 'react'
import CartSkinCard from '../../CartSkinCard'

interface skin {
  name: string
  name_color: string
  icon_url: string
  classid: string
}

export default function AllSkinsCart() {
  const [filteredIndex, setFilteredIndex] = useState<string[]>([])
  const allSkinCart = skins.filter(
    (skin) => !filteredIndex.some((classid) => classid === skin.classid),
  )

  return (
    <div className="flex w-[798px] flex-col items-start gap-6">
      {allSkinCart.map(
        ({ name, name_color, icon_url, classid }: skin, idx: number) => {
          return (
            <CartSkinCard
              iconUrl={icon_url}
              name={name}
              nameColor={name_color}
              key={`${name}-${idx}`}
              handleOnClick={() =>
                setFilteredIndex([...filteredIndex, classid])
              }
            />
          )
        },
      )}
    </div>
  )
}
