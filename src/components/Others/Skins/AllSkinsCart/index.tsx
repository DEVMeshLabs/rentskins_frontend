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

  const {
    data: dataSkinsCart,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [trueSession.user?.steam?.steamid!],
    queryFn: () => {
      console.log('ok')
      return CartService.getCart(trueSession.user?.steam?.steamid!)
    },
    refetchOnWindowFocus: true,
  })

  useEffect(() => {
    console.log(isLoading)
  }, [isLoading])

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    console.log('fiu')
    if (dataSkinsCart?.data) {
      setSkinsFromCart(dataSkinsCart.data.SkinToCart)
    }
  }, [dataSkinsCart?.data])

  return (
    <div className="flex w-[798px] flex-col items-start gap-6">
      {!isLoading ? (
        <div
          className={`flex w-full flex-col justify-center gap-6 ${
            skinsFromCart.length === 0 && 'pt-60'
          }`}
        >
          {skinsFromCart.length > 0 ? (
            skinsFromCart.map(
              (
                {
                  skin: { skin_name, name_color, skin_image, id, skin_weapon },
                  id: modelId,
                },
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
                    modelId={modelId}
                  />
                )
              },
            )
          ) : (
            <h1 className="text-xl text-white">Carrinho vazio.</h1>
          )}
        </div>
      ) : (
        <div>Carregando...</div>
      )}
    </div>
  )
}
