'use client'
// import AllSkins from '@/components/Skins/AllSkins'
import ChoiceItems from '@/components/Others/ChoiceItems'
import PerfilPerson from '@/components/Others/ProfilePerson'
import useUserStore from '@/stores/user.store'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function PerfilUsuario() {
  const { userSteamId } = useParams()
  const router = useRouter()

  const { user } = useUserStore()

  useEffect(() => {
    if (userSteamId === user.steamid) {
      router.push('/perfil')
    }
  }, [userSteamId, user])

  return (
    <main className="mx-auto flex w-4/5 flex-col items-center py-7">
      <PerfilPerson isSeller={false} />
      <ChoiceItems />
      {/* <AllSkins skinsCategories={} itemsPerPage={15} /> */}
    </main>
  )
}
