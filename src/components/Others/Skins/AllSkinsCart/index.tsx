/* eslint-disable camelcase */
'use client'
import { LayoutLoading } from '@/components/Layout/LayoutLoading'
import ISteamUser from '@/interfaces/steam.interface'
import CartService from '@/services/cart.service'
import useCartStore from '@/stores/cart.store'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import CartSkinCard from '../../CartSkinCard'

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
    queryFn: () => CartService.getCart(trueSession.user?.steam?.steamid!),
    refetchOnWindowFocus: true,
  })

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    if (dataSkinsCart?.data) {
      const skinsFiltred = dataSkinsCart.data.SkinToCart.filter(
        ({ skin: { deletedAt } }) => deletedAt === null,
      )
      setSkinsFromCart(skinsFiltred)
    }
  }, [dataSkinsCart?.data, setSkinsFromCart])

  return (
    <div className="flex h-full w-[798px] flex-col items-center gap-6">
      <LayoutLoading
        enabled={isLoading}
        label="Carregando..."
        className="flex h-full items-center justify-center"
      >
        <div
          className={`flex w-full flex-col items-center justify-center gap-6 ${
            skinsFromCart.length === 0 && 'pt-60'
          }`}
        >
          {skinsFromCart.length > 0 ? (
            skinsFromCart.map(
              (
                {
                  skin: {
                    skin_price,
                    skin_name,
                    name_color,
                    skin_image,
                    id,
                    skin_weapon,
                    deletedAt,
                  },
                  id: modelId,
                },
                idx: number,
              ) => {
                return (
                  <CartSkinCard
                    skinPrice={skin_price}
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
      </LayoutLoading>
    </div>
  )
}
