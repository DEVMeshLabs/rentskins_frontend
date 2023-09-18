'use client'

import Common from '@/components/Common'
import { IconArrow } from '@/components/Icons'
import SkinsSemelhantes from '@/components/Others/SkinsSemelhantes'
import { ISkins } from '@/interfaces/ISkins'
import ISteamUser from '@/interfaces/steam.interface'
import { IGetUser } from '@/services/interfaces/user.interface'
import UserService from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { PageDetailsCard } from './PageDetailsCard'
import { PageDetailsPerfil } from './PageDetailsPerfil'
import { PageDetailsSkin } from './PageDetailsSkin'
import { PageDetailsVendas } from './PageDetailsVendas'

interface IProps {
  item: ISkins
  seller: IGetUser
}

export default function PageDetailsMain({ item, seller }: IProps) {
  const { data: session, status } = useSession()
  const trueSession = (session as ISteamUser) || {}
  const defaultID = item.skin_link_game.slice(20, 37)

  console.log(item.id)

  const { data: userRetrieved } = useQuery({
    queryKey: ['ifProfile', trueSession.user?.steam?.steamid!],
    queryFn: () => {
      return UserService.getUser(trueSession.user?.steam?.steamid!)
    },
    enabled: status === 'authenticated',
  })

  return (
    <main className="mx-auto w-10/12 bg-mesh-color-others-black">
      <Link href="/" className="mt-8 flex w-fit items-center gap-4">
        <IconArrow />
        <Common.Title color="cinza">
          Home &bull; {item.skin_weapon} &bull;{' '}
          <span className="text-[#49E671]">{item.skin_name}</span>
        </Common.Title>
      </Link>

      <div className="mx-auto grid w-full grid-cols-5 gap-4 py-4">
        <div className="col-span-3 grid grid-rows-2 gap-4">
          <PageDetailsCard
            skinImage={item.skin_image}
            skinName={item.skin_name}
            skinLinkGame={item.skin_link_game}
            skinLinkSteam={item.skin_link_steam}
            skinFloat={Number(item.skin_float)}
            deletedAt={item.deletedAt}
          />

          <PageDetailsVendas />
        </div>

        <div className="col-span-2 grid grid-rows-2 gap-4">
          <PageDetailsSkin
            token={trueSession.user?.token!}
            userName={trueSession.user?.name!}
            skinImage={item.skin_image}
            userId={trueSession.user?.steam?.steamid!}
            ownerSkin={item.seller_id}
            defaultID={defaultID}
            userStatus={status}
            assetId={item.asset_id}
            skinName={item.skin_name}
            skinPrice={item.skin_price}
            skinFloat={item.skin_float}
            skinCategory={item.skin_category}
            skinWeapon={item.skin_weapon}
            skinColor={item.skin_color}
            sellerId={item.seller_id}
            statusFloat={item.status_float}
            skinId={item.id}
            cartId={userRetrieved?.data?.cart?.id as string}
            userConfiguration={userRetrieved?.data?.configuration!}
          />
          <PageDetailsPerfil
            id={seller.owner_id}
            account_date={seller.steam_created_date!}
            delivery_fee={seller.delivery_fee!}
            delivery_time={seller.delivery_time!}
            owner_name={seller.owner_name!}
            picture={seller.picture!}
            status_member={seller.status_member!}
            steam_level={seller.steam_level!}
            total_exchanges={seller.total_exchanges!}
          />
        </div>
      </div>
      <SkinsSemelhantes weaponName={item.skin_weapon || null} data={item} />
    </main>
  )
}
