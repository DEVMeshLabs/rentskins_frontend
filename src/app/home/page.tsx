'use client'
import { CommonSteamButton } from '@/components/Common/CommonSteamButton'
import {
  IconDevolution,
  IconMagnifyingGlass,
  IconPhone,
  IconShield,
} from '@/components/Icons'
import { HeroInformation } from '@/components/Others/HeroInformation'
import AllSkeletonSkins from '@/components/Others/Skins/AllSkeletonSkins'
import { IAllSkinsProps } from '@/components/Others/Skins/AllSkins'
import SkinService from '@/services/skin.service'
import SteamService from '@/services/steam.service'
import useUserStore from '@/stores/user.store'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
const AllSkins = dynamic<IAllSkinsProps>(
  () =>
    import('@/components/Others/Skins/AllSkins').then(
      (module) => module.default,
    ),
  {
    ssr: false,
  },
)

export default function Home() {
  const { user } = useUserStore()

  useEffect(
    () =>
      console.log('Made with 💙 by Mesh LABS team: https://www.meshlabs.site.'),
    [],
  )

  const { data, isLoading } = useQuery({
    queryKey: ['allSkins'],
    queryFn: () => SkinService.findByAll(),
  })

  const handleOnSteam = () => {
    SteamService.redirect()
  }

  return (
    <main className="h-full">
      <div className="h-screen">
        <div className="flex h-4/6 flex-col items-center justify-center bg-mesh-image-hero bg-cover bg-center bg-no-repeat">
          <div className="flex flex-col items-center space-y-8 text-center text-white">
            <p className="max-w-2xl text-[3.5rem] font-bold leading-none">
              <span>
                Descubra o mundo das skins{' '}
                <strong className="bg-mesh-gradient-green-pattern bg-clip-text text-transparent">
                  CS:GO
                </strong>
              </span>
            </p>
            <p className="max-w-3xl text-2xl">
              Personalize seu arsenal com as skins mais incríveis, encontrando
              as skins perfeitas para dominar o jogo!
            </p>
            {!user.steamid && (
              <CommonSteamButton onClick={() => handleOnSteam()} />
            )}
          </div>
        </div>
        <div className="h-1/5 w-full bg-mesh-color-neutral-800">
          <hr className="-mt-0.5 h-2 w-full bg-mesh-gradient-green-pattern" />

          <div className="flex h-full items-center justify-center">
            <HeroInformation icon={<IconShield />} title="Pagamento seguro">
              Realize seus pagamentos com tranquilidade!
            </HeroInformation>

            <HeroInformation icon={<IconPhone />} title="Suporte rápido">
              Tem alguma dúvida? Entre em contato conosco!
            </HeroInformation>

            <HeroInformation
              icon={<IconMagnifyingGlass />}
              title="Ampla transparência"
            >
              Priorizamos a transparência em todas as informações.
            </HeroInformation>

            <HeroInformation
              icon={<IconDevolution />}
              title="Política de devolução"
            >
              Facilitamos a devolução ou troca, de acordo com nossos termos.
            </HeroInformation>
          </div>
        </div>
      </div>
      <div className="mx-auto mb-28 flex w-4/5">
        {isLoading ? (
          <AllSkeletonSkins quantitySkeletons={20} />
        ) : (
          <AllSkins skinsCategories={data?.data} itemsPerPage={15} />
        )}
      </div>
    </main>
  )
}
