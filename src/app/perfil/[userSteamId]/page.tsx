'use client'
import Common from '@/components/Common'
import ChoiceItems from '@/components/Others/ChoiceItems'
import PerfilPerson from '@/components/Others/ProfilePerson'
import AllSkeletonSkins from '@/components/Others/Skins/AllSkeletonSkins'
import AllSkins from '@/components/Others/Skins/AllSkins'
import SkinService from '@/services/skin.service'
import UserService from '@/services/user.service'
import useUserStore from '@/stores/user.store'
import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PerfilUsuario() {
  const [accountDate, setAccountDate] = useState('Data não obtida')
  const [steamLevel, setSteamLevel] = useState('Não obtido')
  const [userState, setUserState] = useState('')
  const [picture, setPicture] = useState('')
  const [name, setName] = useState('')
  const [totalExchanges, setTotalExchanges] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('')
  const [deliveryFee, setDeliveryFee] = useState('')
  const { userSteamId } = useParams()
  const router = useRouter()

  const { user } = useUserStore()

  useEffect(() => {
    if (userSteamId === user.steamid) {
      router.push('/perfil')
    }
  }, [userSteamId, user])

  const { data, isLoading: isLoadingGetUser } = useQuery({
    queryKey: ['OtherProfile', userSteamId],
    queryFn: () => UserService.getUser(userSteamId),
    enabled: false,
  })

  const { data: dataAllSkins, isLoading } = useQuery({
    queryKey: ['profileSkins', userSteamId],
    queryFn: () => SkinService.findAllSkinsByIdSeller(userSteamId),
  })

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
    <main className="mx-auto flex w-4/5 flex-col items-center py-7">
      <PerfilPerson
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
      <ChoiceItems />
      {isLoading ? (
        <AllSkeletonSkins />
      ) : dataAllSkins?.data.length! > 0 ? (
        <AllSkins skinsCategories={dataAllSkins?.data} itemsPerPage={15} />
      ) : (
        <Common.SearchFeedback content="ao perfil de" title={name} />
      )}
    </main>
  )
}
