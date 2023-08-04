'use client'
// import AllSkins from '@/components/Skins/AllSkins'
import ChoiceItems from '@/components/Others/ChoiceItems'
import PerfilPerson from '@/components/Others/ProfilePerson'
import ISteamUser from '@/interfaces/steam.interface'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function PerfilUsuario() {
  const { data: session } = useSession()
  const trueSession = (session as ISteamUser) || {}

  const { steamid } = useParams()
  const router = useRouter()

  useEffect(() => {
    if (steamid === trueSession?.user?.steam?.steamid) {
      router.push('/perfil')
    }
  }, [steamid, trueSession?.user, router])

  return (
    <main className="mx-auto flex w-4/5 flex-col items-center py-7">
      <PerfilPerson isSeller={false} />
      <ChoiceItems />
      {/* <AllSkins skinsCategories={} itemsPerPage={15} /> */}
    </main>
  )
}
