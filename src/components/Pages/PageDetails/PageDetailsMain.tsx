'use client'

import Common from '@/components/Common'
import { IconArrow } from '@/components/Icons'
import SkinsSemelhantes from '@/components/Others/SkinsSemelhantes'
import { ISkins } from '@/interfaces/ISkins'
import ISteamUser from '@/interfaces/steam.interface'
import { IGetUser } from '@/services/interfaces/user.interface'
import UserService from '@/services/user.service'

import SkinService from '@/services/skin.service'
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
  const customName = item.skin_name.split('(')[0]

  const { data: userRetrieved } = useQuery({
    queryKey: ['ifProfile', trueSession.user?.steam?.steamid!],
    queryFn: () => {
      return UserService.getUser(trueSession.user?.steam?.steamid!)
    },
    enabled: status === 'authenticated',
  })

  const { data: latestSales } = useQuery({
    queryKey: ['lastSales', item.skin_name],
    queryFn: () => UserService.getLatestSales(item.skin_name),
    enabled: status === 'authenticated',
  })

  const itemsToCheckAveragePrice = [
    item.skin_name,
    ...item.stickers.map((sticker) =>
      item.skin_category === 'Agent'
        ? 'Patch'
        : 'Sticker' + ' | ' + sticker.name,
    ),
  ]

  const { data: averagePrice, isLoading: isLoadingAveragePrice } = useQuery({
    queryKey: ['GetItemAveragePrice', item.skin_name],
    queryFn: () => SkinService.getItemAveragePrice(itemsToCheckAveragePrice),
    enabled: !!itemsToCheckAveragePrice,
    keepPreviousData: false,
    cacheTime: 0,
  })

  return (
    <main className="mx-auto w-11/12 bg-mesh-color-others-black laptop:w-10/12">
      <Link href="/" className="mt-8 flex w-fit items-center gap-4">
        <IconArrow />
        <Common.Title color="cinza">
          Home &bull; {item.skin_weapon} &bull;{' '}
          <span className="text-[#49E671]">{customName}</span>
        </Common.Title>
      </Link>

      <div className="mx-auto grid w-full grid-cols-5 gap-4 py-4 ">
        <div className="col-span-3 grid grid-rows-1 gap-4">
          <div className="">
            <PageDetailsCard
              item={item}
              stickersPrice={averagePrice?.data?.slice(1)!}
              isLoadingStickersPrice={isLoadingAveragePrice}
            />
          </div>

          <div className="">
            <PageDetailsVendas latestSales={latestSales?.data} />
          </div>
        </div>

        <div className="col-span-2 grid grid-rows-1 gap-4">
          <div className="">
            <PageDetailsSkin
              item={item}
              session={trueSession}
              defaultID={defaultID}
              skinName={customName}
              userStatus={status}
              recommendedPrice={averagePrice?.data[0] || 'Indisponível'}
              isLoadingRecommendedPrice={isLoadingAveragePrice}
              userCart={userRetrieved?.data?.cart!}
              userConfiguration={userRetrieved?.data?.configuration!}
            />
          </div>
          <div className="">
            <PageDetailsPerfil seller={seller} />
          </div>
        </div>
      </div>
      <SkinsSemelhantes
        weaponName={item.skin_weapon || null}
        currentItem={item}
      />
    </main>
  )
}
