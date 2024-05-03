'use client'

import { CommonSteamButton } from '@/components/Common/CommonSteamButton'
import { TypeErrors } from '@/interfaces/tools/general.interface'
import GeneralTool from '@/tools/general.tool'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface IProps {
  error: TypeErrors | undefined
}

export default function PageHomeHero({ error }: IProps) {
  const { status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (error) {
      GeneralTool.generateToastError(error!, router, pathname)
    }
  }, [error, pathname, router])

  return (
    <div className="flex h-4/6 flex-col items-center justify-center bg-mesh-image-hero bg-cover bg-center bg-no-repeat">
      <div className="flex flex-col items-center space-y-8 text-center text-white">
        <p className="max-w-2xl text-[3.5rem] font-bold leading-none">
          <span>
            Descubra o mundo das skins deeeeeeee{' '}
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
    </div>
  )
}
