'use client'

import Common from '@/components/Common'
import { IconArrow } from '@/components/Icons'
import SkinsSemelhantes from '@/components/Others/SkinsSemelhantes'
import { ISkins } from '@/interfaces/ISkins'
import ISteamUser from '@/interfaces/steam.interface'
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
}

export default function PageDetailsMain({ item }: IProps) {
  const { data: session, status } = useSession()
  const trueSession = (session as ISteamUser) || {}

  const { data: dataGetUser } = useQuery({
    queryKey: ['ownerSkin', item.seller_id],
    queryFn: async () => {
      return UserService.getUser(item.seller_id!)
    },
    enabled: !!item.seller_id,
  })

  const { data: userRetrieved } = useQuery({
    queryKey: ['ifProfile', trueSession.user?.steam?.steamid!],
    queryFn: () => {
      return UserService.getUser(trueSession.user?.steam?.steamid!)
    },
    enabled: status === 'authenticated',
  })

  console.log(dataGetUser?.data?.status_member!)

  return (
    <main className="mx-auto w-10/12 bg-mesh-color-others-black">
      <Link href="/" className="mt-8 flex w-fit items-center gap-4">
        <IconArrow />
        <Common.Title color="cinza">
          Home &bull; {item.skin_weapon} &bull;{' '}
          <span className="text-[#49E671]">{item.skin_name}</span>
        </Common.Title>
      </Link>

      <div className="mx-auto grid w-full grid-cols-5 py-10">
        <div className="col-span-3 ">
          <PageDetailsCard
            skinImage={item.skin_image}
            skinName={item.skin_name}
            skinLinkGame={item.skin_link_game}
            skinLinkSteam={item.skin_link_steam}
            skinFloat={Number(item.skin_float)}
          />

          <div>
            <PageDetailsVendas />
          </div>
        </div>
        <div className="col-span-2 ml-4 ">
          <PageDetailsSkin
            assetId={item.assent_id}
            skinName={item.skin_name}
            skinPrice={item.skin_price}
            skinFloat={item.skin_float}
            skinCategory={item.skin_category}
            skinWeapon={item.skin_weapon}
            skinColor={item.skin_color}
            sellerId={item.seller_id}
            statusFloat={item.status_float}
            skinId={item.id}
            cartId={userRetrieved && userRetrieved?.data?.cart?.id}
          />
          <PageDetailsPerfil
            id={dataGetUser?.data?.owner_id}
            account_date={dataGetUser?.data?.steam_created_date!}
            delivery_fee={dataGetUser?.data?.delivery_fee!}
            delivery_time={dataGetUser?.data?.delivery_time!}
            owner_name={dataGetUser?.data?.owner_name!}
            picture={dataGetUser?.data?.picture!}
            status_member={dataGetUser?.data?.status_member!}
            steam_level={dataGetUser?.data?.steam_level!}
            total_exchanges={dataGetUser?.data?.total_exchanges!}
          />
        </div>
      </div>
      <SkinsSemelhantes weaponName={item.skin_weapon || null} data={item} />
    </main>
  )
}
