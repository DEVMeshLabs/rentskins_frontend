'use client'
import { SessionProvider } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import React from 'react'
import { ModalNotificationFilter } from '../Modal/ModalNotification/ModalNotificationFilter'
import { ModalPaymentMain } from '../Modal/ModalPayment/ModalPaymentMain'
import { LayoutHeaderBottom } from './Header/LayoutHeaderBottom'
import { LayoutHeaderRoot } from './Header/LayoutHeaderRoot'
// import { LayoutHeaderTop } from './Header/LayoutHeaderTop'
import { LayoutHeaderTop } from './Header/LayoutHeaderTop'
import { LayoutFooter } from './LayoutFooter'

type IProps = {
  children: React.ReactNode
  session: any
}

export function LayoutRoot({ children, session }: IProps) {
  const pathname = usePathname()

  const modalRender = () => {
    switch (pathname) {
      case '/usuario/notificacoes':
        return <ModalNotificationFilter />
    }
  }

  return (
    <SessionProvider session={session}>
      <main className="flex min-h-screen flex-col justify-between bg-mesh-color-others-black">
        <ModalPaymentMain />

        {modalRender()}

        <LayoutHeaderRoot>
          <LayoutHeaderTop />
          <LayoutHeaderBottom />
        </LayoutHeaderRoot>

        {children}

        <LayoutFooter />
      </main>
    </SessionProvider>
  )
}
