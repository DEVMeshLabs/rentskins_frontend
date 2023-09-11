'use client'
import { SessionProvider } from 'next-auth/react'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
// import { LayoutHeaderTop } from './Header/LayoutHeaderTop'
import { LayoutHeaderBottom } from './Header/LayoutHeaderBottom'
import { LayoutHeaderRoot } from './Header/LayoutHeaderRoot'
import { LayoutHeaderTop } from './Header/LayoutHeaderTop'
import { LayoutFooter } from './LayoutFooter'
import Toast from '@/tools/toast.tool'

type IProps = {
  children: React.ReactNode
  session: any
}

export function LayoutRoot({ children, session }: IProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname === '/' || pathname === '/home') {
      console.log('Made with 💙 by Mesh LABS team: https://www.meshlabs.site.')
    }
    console.log(' ########## ' + searchParams.get('error') + ' ##########')
    console.log(
      searchParams.get('error')?.includes('OAuthCallback') + ' AQUIIIII',
    )
    if (searchParams.get('error')?.includes('OAuthCallback')) {
      console.log('Entrou')
      Toast.Error(
        'Infelizmente não foi possivel logar com a sua Steam no momento. Verifique o horário do seu dispositivo e tente novamente mais tarde.',
        7000,
      )
      console.log('Passou pelo toast')
    }
  }, [pathname])

  return (
    <SessionProvider session={session}>
      <div className="flex min-h-screen flex-col justify-between bg-mesh-color-others-black">
        {pathname !== '/atividade-suspensa' ? (
          <>
            <LayoutHeaderRoot>
              <LayoutHeaderTop />
              <LayoutHeaderBottom />
            </LayoutHeaderRoot>

            {children}

            <LayoutFooter />
          </>
        ) : (
          children
        )}
      </div>
    </SessionProvider>
  )
}
