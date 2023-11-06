'use client'

import Common from '@/components/Common'
import LayoutPagination from '@/components/Layout/LayoutPagination'
import { ModalReturnMain } from '@/components/Modal/ModalReturnSkin/ModalReturnMain'
import ChoiceItems from '@/components/Others/ChoiceItems'
import PerfilPerson from '@/components/Others/PersonProfile'
import PersonProfileSkeleton from '@/components/Others/PersonProfile/PersonProfileSkeleton'
import AllSkins from '@/components/Others/Skins/AllSkins'
import AllSkeletonSkins from '@/components/Skins/AllSkeletonSkins'
import ISteamUser from '@/interfaces/steam.interface'
import SkinService from '@/services/skin.service'
import UserService from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PageProfileSelf() {
  const { data: session, status } = useSession()
  const trueSession = session as ISteamUser

  if (status === 'unauthenticated') {
    notFound()
  }

  const [page, setPage] = useState(1)

  const {
    data: itens,
    isLoading: isLoadingItens,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ['profileSkins', trueSession?.user?.steam?.steamid!],
    queryFn: () =>
      SkinService.findAllSkinsByIdSeller(
        trueSession?.user?.steam?.steamid!,
        page,
      ),
    keepPreviousData: true,
  })

  useEffect(() => {
    refetch()
  }, [page, refetch])

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['myProfile', trueSession?.user?.steam?.steamid!],
    queryFn: () => UserService.getUser(trueSession?.user?.steam?.steamid!),
  })

  const steamCreatedDate = `${new Date(user?.data?.steam_created_date!)
    .getDate()
    .toString()
    .padStart(2, '0')}/${(
    new Date(user?.data?.steam_created_date!).getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}/${new Date(
    user?.data?.steam_created_date!,
  )!.getFullYear()}`

  const deliveryFee =
    user?.data?.total_exchanges_completed && user?.data?.total_exchanges
      ? (user?.data?.total_exchanges_completed / user?.data?.total_exchanges) *
        100
      : 'Sem informações'

  return (
    <>
      <ModalReturnMain />
      {status === 'authenticated' && user?.data ? (
        <PerfilPerson
          totalExchanges={user?.data?.total_exchanges}
          deliveryTime={user?.data?.delivery_time}
          deliveryFee={deliveryFee}
          isLoading={isLoadingUser}
          accountDate={steamCreatedDate}
          name={user?.data?.owner_name}
          picture={user?.data?.picture}
          reliability={user?.data?.reliability}
        />
      ) : (
        <PersonProfileSkeleton />
      )}
      <ChoiceItems thereIsRented={true} />
      {isLoadingItens || isRefetching || isLoadingUser ? (
        <AllSkeletonSkins />
      ) : itens?.data?.skins?.length! > 0 ? (
        <AllSkins itensFromUser skinsCategories={itens?.data?.skins} />
      ) : (
        <Common.SearchFeedback
          content="ao perfil de"
          title={trueSession?.user?.name! || 'Usuário'}
        />
      )}
      {itens?.data?.totalPages &&
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
