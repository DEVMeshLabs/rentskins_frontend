'use client'
import useUserStore from '@/stores/user.store'
import Authentication from '@/tools/authentication.tool'
import LocalStorage from '@/tools/localstorage.tool'
import URLQuery from '@/tools/urlquery.tool'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { ModalNotificationFilter } from '../Modal/ModalNotification/ModalNotificationFilter'
import { ModalPaymentMain } from '../Modal/ModalPayment/ModalPaymentMain'
import { LayoutHeaderBottom } from './Header/LayoutHeaderBottom'
import { LayoutHeaderRoot } from './Header/LayoutHeaderRoot'
import { LayoutHeaderTop } from './Header/LayoutHeaderTop'
import { LayoutFooter } from './LayoutFooter'

type IProps = {
  children: React.ReactNode
}

export function LayoutRoot({ children }: IProps) {
  const params = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const { logout, setLogout } = useUserStore()

  useEffect(() => {
    Authentication.login(params, router, URLQuery)
  }, [params, router])

  useEffect(() => {
    if (logout) {
      LocalStorage.remove('token')
      location.reload()
      setLogout(false)
    }
  }, [logout, setLogout])

  const modalRender = () => {
    switch (pathname) {
      case '/usuario/notificacoes':
        return <ModalNotificationFilter />
    }
  }

  return (
    <main className="min-h-screen bg-mesh-color-others-black">
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
