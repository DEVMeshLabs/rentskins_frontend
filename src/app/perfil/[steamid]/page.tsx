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
  const [steamLevel, setSteamLevel] = useState('5')
  const [picture] = useState('')
  const { userSteamId } = useParams()
  const router = useRouter()

  const { user } = useUserStore()

  useEffect(() => {
    if (userSteamId === user.steamid) {
      router.push('/perfil')
    }
  }, [userSteamId, user])

  const { data } = useQuery({
    queryKey: ['Profile', userSteamId],
    queryFn: () => UserService.getUser(userSteamId),
  })

  const { data: dataAllSkins, isLoading } = useQuery({
    queryKey: ['profileSkins', userSteamId],
    queryFn: () => SkinService.findAllSkinsByIdSeller(userSteamId),
  })

  useEffect(() => {
    const accountDate = new Date(data?.data.account_date!)
    console.log(accountDate)
    setAccountDate(
      `${accountDate.getDate().toString().padStart(2, '0')}/${(
        accountDate.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}/${accountDate.getFullYear()}`,
    )
    setSteamLevel(data?.data.steam_level!)
  }, [data])

  return (
    <main className="mx-auto flex w-4/5 flex-col items-center py-7">
      <PerfilPerson
        accountDate={accountDate}
        name=""
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
        <Common.SearchFeedback content="ao perfil" title={'Usuario'} />
      )}
    </main>
  )
}
