'use client'

import Common from '@/components/Common'
import LayoutPagination from '@/components/Layout/LayoutPagination'
import ChoiceItems from '@/components/Others/ChoiceItems'
import PersonProfile from '@/components/Others/PersonProfile'
import PersonProfileSkeleton from '@/components/Others/PersonProfile/PersonProfileSkeleton'
import AllSkins from '@/components/Others/Skins/AllSkins'
import AllSkeletonSkins from '@/components/Skins/AllSkeletonSkins'
import ISteamUser from '@/interfaces/steam.interface'
import SkinService from '@/services/skin.service'
import UserService from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PageProfileUser() {
  const { data: session, status } = useSession()
  const trueSession = session as ISteamUser
  const [page, setPage] = useState(1)
  const { userSteamId } = useParams()
  const router = useRouter()

  useEffect(() => {
    if (userSteamId === trueSession?.user?.steam?.steamid) {
      router.push('/perfil')
    }
  }, [userSteamId, trueSession?.user?.steam?.steamid, router])

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['OtherProfile', userSteamId],
    queryFn: () => UserService.getUser(userSteamId),
  })

  const {
    data: itens,
    isLoading: isLoadingItens,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ['profileSkins', userSteamId],
    queryFn: () => SkinService.findAllSkinsByIdSeller(userSteamId, page),
    keepPreviousData: true,
  })

  useEffect(() => {
    refetch()
  }, [page, refetch])

  const steamCreatedDate = `${new Date(user?.data?.steam_created_date!)
    .getDate()
    .toString()
    .padStart(2, '0')}/${(
    new Date(user?.data?.steam_created_date!).getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}/${new Date(
    user?.data?.steam_created_date!,
  ).getFullYear()}`

  const deliveryFee =
    user?.data?.total_exchanges_completed && user?.data?.total_exchanges
      ? (user?.data?.total_exchanges_completed / user?.data?.total_exchanges) *
        100
      : 'Sem informações'

  return (
    <>
      {status === 'authenticated' && user?.data ? (
        <PersonProfile
          totalExchanges={user?.data?.total_exchanges}
          deliveryTime={user?.data?.delivery_time}
          deliveryFee={deliveryFee}
          isLoading={isLoadingUser}
          accountDate={steamCreatedDate}
          name={user?.data?.owner_name}
          picture={user?.data?.picture}
          reliability={user?.data?.reliability}
          isSeller={false}
        />
      ) : (
        <PersonProfileSkeleton />
      )}
      <ChoiceItems />
      {isLoadingItens || isRefetching || isLoadingUser ? (
        <AllSkeletonSkins />
      ) : itens?.data.skins.length! > 0 ? (
        <AllSkins skinsCategories={itens?.data?.skins} />
      ) : (
        <Common.SearchFeedback
          content="ao perfil de"
          title={user?.data?.owner_name! || 'Usuário'}
        />
      )}
      {itens?.data &&
        itens?.data?.totalPages > 1 &&
        Number(page) <= itens?.data?.totalPages && (
          <LayoutPagination
            maxPages={itens?.data?.totalPages}
            pageState={page}
            setPageState={setPage}
          />
        )}
    </>
  )
}
