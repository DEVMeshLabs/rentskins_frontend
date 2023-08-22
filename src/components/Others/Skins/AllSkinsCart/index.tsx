/* eslint-disable camelcase */
'use client'
import { useEffect } from 'react'
import CartSkinCard from '../../CartSkinCard'
import { useQuery } from '@tanstack/react-query'
import CartService from '@/services/cart.service'
import ISteamUser from '@/interfaces/steam.interface'
import { useSession } from 'next-auth/react'
import useCartStore from '@/stores/cart.store'

export default function AllSkinsCart() {
  const { setSkinsFromCart, skinsFromCart, deleteSkinFromCart } = useCartStore()
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
      setSkinsFromCart(dataSkinsCart.data.SkinToCart)
    }
  }, [dataSkinsCart])

  return (
    <div className="flex w-[798px] flex-col items-start gap-6">
      {!isLoading ? (
        <div className="w-full">
          {skinsFromCart.map(
            (
              { skin: { skin_name, name_color, skin_image, id, skin_weapon } },
              idx: number,
            ) => {
              return (
                <CartSkinCard
                  skinWeapon={skin_weapon}
                  iconUrl={skin_image}
                  name={skin_name}
                  nameColor={name_color}
                  key={`${name}-${idx}`}
                  handleOnClick={() => {
                    deleteSkinFromCart(id)
                  }}
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
