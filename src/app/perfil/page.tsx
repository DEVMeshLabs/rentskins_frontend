'use client'
import Common from '@/components/Common'
import ChoiceItems from '@/components/Others/ChoiceItems'
import PerfilPerson from '@/components/Others/ProfilePerson'
import AllSkins from '@/components/Others/Skins/AllSkins'
import AllSkeletonSkins from '@/components/Others/Skins/AllSkeletonSkins'
import SkinService from '@/services/skin.service'
import useUserStore from '@/stores/user.store'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import UserService from '@/services/user.service'
import LocalStorage from '@/tools/localstorage.tool'

export default function Perfil() {
  const [accountDate, setAccountDate] = useState('Data não obtida')
  const [steamLevel, setSteamLevel] = useState('Não obtido')
  const [userState, setUserState] = useState('Não obtido')
  const [totalExchanges, setTotalExchanges] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('')
  const [deliveryFee, setDeliveryFee] = useState('')
  const router = useRouter()
  const {
    user: { picture, username, steamid },
  } = useUserStore()

  useEffect(() => {
    if (!steamid && !LocalStorage.get('token')) {
      router.push('/')
    }
  }, [steamid])

  const { data, isLoading } = useQuery({
    queryKey: ['profileSkins', steamid],
    queryFn: () => SkinService.findAllSkinsByIdSeller(steamid),
  })

  const { data: dataGettedUser, isLoading: isLoadingGetUser } = useQuery({
    queryKey: ['myProfile', steamid],
    queryFn: () => UserService.getUser(steamid),
  })

  useEffect(() => {
    if (dataGettedUser?.data) {
      const accountDate = new Date(dataGettedUser?.data.account_date)
      setAccountDate(
        `${accountDate.getDate().toString().padStart(2, '0')}/${(
          accountDate.getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}/${accountDate.getFullYear()}`,
      )
      setSteamLevel(dataGettedUser?.data.steam_level)
      setUserState(dataGettedUser.data.status_member)
      setUserState(dataGettedUser?.data.status_member)
      setTotalExchanges(dataGettedUser.data.total_exchanges)
      setDeliveryTime(dataGettedUser.data.delivery_time)
      setDeliveryFee(dataGettedUser.data.delivery_fee)
    }
  }, [dataGettedUser])

  return (
    <main className="mx-auto flex w-4/5 flex-col items-center py-7">
      <PerfilPerson
        totalExchanges={totalExchanges}
        deliveryTime={deliveryTime}
        deliveryFee={deliveryFee}
        isLoading={isLoadingGetUser}
        userState={userState}
        steamLevel={steamLevel}
        accountDate={accountDate}
        picture={picture}
        name={username}
      />
      <ChoiceItems thereIsRented={true} />
      {isLoading ? (
        <AllSkeletonSkins />
      ) : data?.data.length! > 0 ? (
        <AllSkins skinsCategories={data?.data} itemsPerPage={15} />
      ) : (
        <Common.SearchFeedback content="ao perfil" title={username} />
      )}
      {/* {profileTabValue === 'sales' ? (
        ) : (
          <RentedSkins />
        )} */}
    </main>
  )
}
