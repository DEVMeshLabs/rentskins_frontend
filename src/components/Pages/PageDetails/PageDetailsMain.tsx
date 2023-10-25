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
import { RoundTime } from '@/utils/roundTime'

interface IProps {
  item: ISkins
  seller: IGetUser
}

export default function PageDetailsMain({ item, seller }: IProps) {
  const { data: session, status } = useSession()
  const trueSession = (session as ISteamUser) || {}
  const defaultID = item.skin_link_game.slice(20, 37)
  const customName = item.skin_name.split('(')[0]
  console.log(trueSession.user?.token)

  const { data: userRetrieved } = useQuery({
    queryKey: ['ifProfile', trueSession.user?.steam?.steamid!],
    queryFn: () => {
      return UserService.getUser(trueSession.user?.steam?.steamid!)
    },
    enabled: status === 'authenticated',
  })

  const { data: latestSales } = useQuery({
    queryKey: ['latestSales', seller.owner_id],
    queryFn: () => UserService.getLatestSales(seller.owner_id),
    enabled: status === 'authenticated',
  })

  return (
    <main className="mx-auto w-10/12 bg-mesh-color-others-black">
      <Link href="/" className="mt-8 flex w-fit items-center gap-4">
        <IconArrow />
        <Common.Title color="cinza">
          Home &bull; {item.skin_weapon} &bull;{' '}
          <span className="text-[#49E671]">{customName}</span>
        </Common.Title>
      </Link>

      <div className="mx-auto grid w-full grid-cols-5 gap-4 py-4">
        <div className="col-span-3 grid grid-rows-2 gap-4">
          <PageDetailsCard
            skinImage={item.skin_image}
            skinName={item.skin_name}
            skinCategory={item.skin_category}
            skinLinkGame={item.skin_link_game}
            skinLinkSteam={item.skin_link_steam}
            skinFloat={Number(item.skin_float)}
            deletedAt={item.deletedAt}
          />

          <PageDetailsVendas latestSales={latestSales?.data} />
        </div>

        <div className="col-span-2 grid grid-rows-2 gap-4">
          <PageDetailsSkin
            saleType={item.sale_type}
            token={trueSession.user?.token!}
            userName={trueSession.user?.name!}
            skinImage={item.skin_image}
            userId={trueSession.user?.steam?.steamid!}
            ownerSkin={item.seller_id}
            defaultID={defaultID}
            userStatus={status}
            assetId={item.asset_id}
            skinName={customName}
            skinPrice={item.skin_price}
            skinFloat={item.skin_float}
            skinCategory={item.skin_category}
            skinWeapon={item.skin_weapon}
            skinRarity={item.skin_rarity}
            skinMedianPrice={item.median_price}
            sellerId={item.seller_id}
            statusFloat={item.status_float}
            skinId={item.id}
            cartId={userRetrieved?.data?.cart?.id as string}
            userConfiguration={userRetrieved?.data?.configuration!}
          />
          <PageDetailsPerfil
            id={seller.owner_id}
            account_date={seller.steam_created_date!}
            delivery_rate={
              seller.total_exchanges_completed && seller.total_exchanges
                ? (seller.total_exchanges_completed / seller.total_exchanges) *
                  100
                : 'Membro Novo'
            }
            reliability={seller.reliability}
            delivery_time={
              seller.delivery_time !== 'Sem informações'
                ? RoundTime(seller.delivery_time!)
                : 'Sem informações'
            }
            owner_name={seller.owner_name!}
            picture={seller.picture!}
            total_exchanges={seller.total_exchanges!}
          />
        </div>
      </div>
      <SkinsSemelhantes weaponName={item.skin_weapon || null} data={item} />
    </main>
  )
}
