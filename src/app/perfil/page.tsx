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
  const [steamLevel, setSteamLevel] = useState('5')
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

  const { data: dataGettedUser } = useQuery({
    queryKey: ['Profile', steamid],
    queryFn: () => UserService.getUser(steamid, LocalStorage.get('token')),
  })

  useEffect(() => {
    const accountDate = new Date(dataGettedUser?.data.account_date!)
    console.log(accountDate)
    setAccountDate(
      `${accountDate.getDate().toString().padStart(2, '0')}/${(
        accountDate.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}/${accountDate.getFullYear()}`,
    )
    setSteamLevel(dataGettedUser?.data.steam_level!)
    console.log(steamid)
  }, [dataGettedUser])

  return (
    <main className="mx-auto flex w-4/5 flex-col items-center py-7">
      <PerfilPerson
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
