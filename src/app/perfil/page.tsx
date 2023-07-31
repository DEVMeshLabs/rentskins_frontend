'use client'
import Common from '@/components/Common'
import ChoiceItems from '@/components/Others/ChoiceItems'
import PerfilPerson from '@/components/Others/ProfilePerson'
import AllSkins from '@/components/Others/Skins/AllSkins'
import AllSkeletonSkins from '@/components/Skins/AllSkeletonSkins'
import SkinService from '@/services/skin.service'
import useUserStore from '@/stores/user.store'
import { useQuery } from '@tanstack/react-query'

export default function Perfil() {
  const {
    user: { picture, username, steamid },
  } = useUserStore()

  const { data, isLoading } = useQuery({
    queryKey: ['profileSkins', steamid],
    queryFn: () => SkinService.findAllSkinsByIdSeller(steamid),
  })

  return (
    <main className="mx-auto flex w-4/5 flex-col items-center py-7">
      <PerfilPerson picture={picture} name={username} />
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
