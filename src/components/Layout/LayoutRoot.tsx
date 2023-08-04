'use client'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import React from 'react'
import { ModalNotificationFilter } from '../Modal/ModalNotification/ModalNotificationFilter'
import { ModalPaymentMain } from '../Modal/ModalPayment/ModalPaymentMain'
import { LayoutHeaderBottom } from './Header/LayoutHeaderBottom'
import { LayoutHeaderRoot } from './Header/LayoutHeaderRoot'
// import { LayoutHeaderTop } from './Header/LayoutHeaderTop'
import ISteamUser from '@/interfaces/steam.interface'
import { LayoutHeaderTop } from './Header/LayoutHeaderTop'
import { LayoutFooter } from './LayoutFooter'

type IProps = {
  children: React.ReactNode
}

export function LayoutRoot({ children }: IProps) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const trueSession = session as ISteamUser
  console.log(trueSession)

  const modalRender = () => {
    switch (pathname) {
      case '/usuario/notificacoes':
        return <ModalNotificationFilter />
    }
  }

  return (
    <main className="flex min-h-screen flex-col justify-between bg-mesh-color-others-black">
      <ModalPaymentMain />

      <meta property="og:title" content="My page title" key="title" />
      {modalRender()}

      <LayoutHeaderRoot>
        <LayoutHeaderTop />
        <LayoutHeaderBottom />
      </LayoutHeaderRoot>

      {children}

      <LayoutFooter />
    </main>
  )
}
