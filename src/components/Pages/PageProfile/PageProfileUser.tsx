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
  const [accountDate, setAccountDate] = useState('Data não obtida')
  const [page, setPage] = useState(1)
  const [steamLevel, setSteamLevel] = useState('Não obtido')
  const [userState, setUserState] = useState('')
  const [picture, setPicture] = useState('')
  const [name, setName] = useState('')
  const [totalExchanges, setTotalExchanges] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('')
  const [deliveryFee, setDeliveryFee] = useState(0)
  const { userSteamId } = useParams()
  const router = useRouter()

  useEffect(() => {
    if (userSteamId === trueSession?.user?.steam?.steamid) {
      router.push('/perfil')
    }
  }, [userSteamId, trueSession?.user?.steam?.steamid, router])

  const { data, isLoading: isLoadingGetUser } = useQuery({
    queryKey: ['OtherProfile', userSteamId],
    queryFn: () => UserService.getUser(userSteamId),
  })

  const {
    data: dataAllSkins,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ['profileSkins', userSteamId],
    queryFn: () => SkinService.findAllSkinsByIdSeller(userSteamId, page),
  })

  useEffect(() => {
    refetch()
  }, [page, refetch])

  console.log(dataAllSkins?.data.skins)

  useEffect(() => {
    if (data?.data) {
      const accountDate = new Date(data?.data.account_date)
      setAccountDate(
        `${accountDate.getDate().toString().padStart(2, '0')}/${(
          accountDate.getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}/${accountDate.getFullYear()}`,
      )
      setSteamLevel(data?.data.steam_level)
      setPicture(data?.data.picture)
      setName(data?.data.owner_name)
      setUserState(data?.data.status_member)
      setTotalExchanges(data.data.total_exchanges)
      setDeliveryTime(data.data.delivery_time)
      setDeliveryFee(data.data.delivery_fee)
    }
  }, [data])

  return (
    <>
      {status === 'authenticated' ? (
        <PersonProfile
          totalExchanges={totalExchanges}
          deliveryTime={deliveryTime}
          deliveryFee={deliveryFee}
          isLoading={isLoadingGetUser}
          accountDate={accountDate}
          userState={userState}
          name={name}
          picture={picture}
          steamLevel={steamLevel}
          isSeller={false}
        />
      ) : (
        <PersonProfileSkeleton />
      )}
      <ChoiceItems />
      {isLoading || isRefetching ? (
        <AllSkeletonSkins />
      ) : dataAllSkins?.data.skins.length! > 0 ? (
        <AllSkins skinsCategories={dataAllSkins?.data?.skins} />
      ) : (
        <Common.SearchFeedback content="ao perfil de" title={name} />
      )}
      {dataAllSkins?.data?.totalPages &&
        dataAllSkins?.data?.totalPages > 1 &&
        Number(page) <= dataAllSkins?.data?.totalPages && (
          <LayoutPagination
            maxPages={dataAllSkins?.data?.totalPages}
            pageState={page}
            setPageState={setPage}
          />
        )}
    </>
  )
}
