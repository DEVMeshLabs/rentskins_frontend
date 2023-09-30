'use client'

import { CommonSteamButton } from '@/components/Common/CommonSteamButton'
import { useSession } from 'next-auth/react'

export default function PageHomeHero() {
  const { status } = useSession()

  return (
    <div className="flex flex-col items-center space-y-8 text-center text-white">
      <p className="max-w-2xl text-[3.5rem] font-bold leading-none">
        <span>
          Descubra o mundo das skins{' '}
          <strong className="bg-mesh-gradient-green-pattern bg-clip-text text-transparent">
            Counter-Strike
          </strong>
        </span>
      </p>
      <p className="max-w-3xl text-2xl">
        Personalize seu arsenal com as skins mais incríveis, encontrando as
        skins perfeitas para dominar o jogo!
      </p>
      <CommonSteamButton
        className={`${
          status === 'unauthenticated' ? 'visible h-[60px]' : 'invisible h-0'
        } font-Roboto flex w-[330px] 
              items-center justify-center gap-4 rounded-md bg-mesh-color-primary-1200 no-underline 
              transition-all duration-300 ease-in-out hover:bg-mesh-gradient-steam-button`}
      />
    </div>
  )
}
