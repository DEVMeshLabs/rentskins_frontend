'use client'

import Common from '@/components/Common'
import LayoutPagination from '@/components/Layout/LayoutPagination'
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
  const [accountDate, setAccountDate] = useState('Data não obtida')
  const [steamLevel, setSteamLevel] = useState('Não obtido')
  const [userState, setUserState] = useState('Não obtido')
  const [totalExchanges, setTotalExchanges] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('')
  const [deliveryFee, setDeliveryFee] = useState(0)

  const { data, isLoading, isRefetching, refetch } = useQuery({
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

  const { data: dataGettedUser, isLoading: isLoadingGetUser } = useQuery({
    queryKey: ['myProfile', trueSession?.user?.steam?.steamid!],
    queryFn: () => UserService.getUser(trueSession?.user?.steam?.steamid!),
  })

  console.log(dataGettedUser)

  useEffect(() => {
    if (dataGettedUser?.data) {
      const accountDate = new Date(dataGettedUser?.data.steam_created_date)
      setAccountDate(
        `${accountDate.getDate().toString().padStart(2, '0')}/${(
          accountDate.getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}/${accountDate.getFullYear()}`,
      )
      setSteamLevel(dataGettedUser?.data.steam_level)
      setUserState(dataGettedUser?.data.status_member)
      setTotalExchanges(dataGettedUser.data.total_exchanges)
      setDeliveryTime(dataGettedUser.data.delivery_time)
      setDeliveryFee(dataGettedUser.data.delivery_fee)
    }
  }, [dataGettedUser])

  return (
    <>
      {status === 'authenticated' ? (
        <PerfilPerson
          totalExchanges={totalExchanges}
          deliveryTime={deliveryTime}
          deliveryFee={deliveryFee}
          isLoading={isLoadingGetUser}
          userState={userState}
          steamLevel={steamLevel}
          accountDate={accountDate}
          picture={trueSession?.user?.image!}
          name={trueSession?.user?.name!}
        />
      ) : (
        <PersonProfileSkeleton />
      )}
      <ChoiceItems thereIsRented={true} />
      {isLoading || isRefetching ? (
        <AllSkeletonSkins />
      ) : data?.data.skins.length! > 0 ? (
        <AllSkins skinsCategories={data?.data?.skins} />
      ) : (
        <Common.SearchFeedback
          content="ao perfil"
          title={trueSession?.user?.name!}
        />
      )}
      {data?.data?.totalPages &&
        data?.data?.totalPages > 1 &&
        Number(page) <= data?.data?.totalPages && (
          <LayoutPagination
            maxPages={data?.data?.totalPages}
            pageState={page}
            setPageState={setPage}
          />
        )}
    </>
  )
}
