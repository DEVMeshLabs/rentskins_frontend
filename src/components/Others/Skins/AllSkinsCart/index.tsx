/* eslint-disable camelcase */
'use client'
import { skins } from '@/Mock'
import { useEffect, useState } from 'react'
import CartSkinCard from '../../CartSkinCard'
import { useQuery } from '@tanstack/react-query'
import CartService from '@/services/cart.service'
import ISteamUser from '@/interfaces/steam.interface'
import { useSession } from 'next-auth/react'
import useCartStore from '@/stores/cart.store'

interface skin {
  name: string
  name_color: string
  icon_url: string
  classid: string
}

export default function AllSkinsCart() {
  const { setSkinsOnCart, skinsOnCart } = useCartStore()
  const [filteredIndex, setFilteredIndex] = useState<string[]>([])
  const allSkinCart = skins.filter(
    (skin) => !filteredIndex.some((classid) => classid === skin.classid),
  )
  const { data: session } = useSession()
  const trueSession = (session as ISteamUser) || {}

  const { data: dataSkinsCart, isLoading } = useQuery({
    queryKey: ['skinsCart', trueSession.user?.steam?.steamid!],
    queryFn: () => {
      return CartService.getCart(trueSession.user?.steam?.steamid!)
    },
    enabled: !!trueSession.user?.steam?.steamid,
  })

  useEffect(() => {
    if (dataSkinsCart?.data) {
      setSkinsOnCart(dataSkinsCart.data.buyer_skins)
    }
  }, [dataSkinsCart])

  console.log(skinsOnCart)

  return (
    <div className="flex w-[798px] flex-col items-start gap-6">
      {isLoading ? (
        <div>
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
      ) : (
        <div>Carregando...</div>
      )}
    </div>
  )
}
