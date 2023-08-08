'use client'

import { transactionsMock } from '@/Mock/notification.transaction.mock'
import Common from '@/components/Common'
import { INotificationHistoricProps } from '@/components/Pages/PageUser/PageUserNotification/PageUserNotificationsHistoric'
import { INotificationTransactionProps } from '@/components/Pages/PageUser/PageUserNotification/PageUserNotificationsTransaction'
import ISteamUser from '@/interfaces/steam.interface'
import NotificationServices from '@/services/notifications.service'
import useFilterStore from '@/stores/filters.store'
import URLQuery from '@/tools/urlquery.tool'
import { useQuery } from '@tanstack/react-query'
import Aos from 'aos'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useEffect } from 'react'
const PageNotificationHistoric = dynamic<INotificationHistoricProps>(() =>
  import(
    '@/components/Pages/PageUser/PageUserNotification/PageUserNotificationsHistoric'
  ).then((module) => module.default),
)
const PageNotificationTransaction = dynamic<INotificationTransactionProps>(() =>
  import(
    '@/components/Pages/PageUser/PageUserNotification/PageUserNotificationsTransaction'
  ).then((module) => module.default),
)

export default function PageUserNotifications() {
  const { data: session, status } = useSession()
  const trueSession = (session as ISteamUser) || {}
  const { notificationFilter } = useFilterStore()

  const searchParams = useSearchParams()
  const router = useRouter()

  const { data, isLoading } = useQuery({
    queryKey: ['allNotificationsUser', trueSession.user?.steam?.steamid!],
    queryFn: async () => {
      const allNotifications = NotificationServices.getAllNotifsByUser(
        trueSession.user?.steam?.steamid!,
        trueSession.user?.token!,
        notificationFilter,
      )
      if ((await allNotifications).data.length > 0) {
        NotificationServices.readingAllNotifications(
          trueSession.user?.steam?.steamid!,
          trueSession.user?.token!,
        )
      }
      return allNotifications
    },
    enabled: status === 'authenticated',
  })

  const handleOnRadio = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    router.push(URLQuery.addQuery([{ key: 'type', value }]))
  }

  useEffect(() => {
    Aos.init({
      duration: 600,
      delay: 0,
    })

    const titleQuery = searchParams.get('type') as 'historic' | 'transactions'

    if (titleQuery !== 'historic') {
      if (titleQuery !== 'transactions') {
        router.push(URLQuery.addQuery([{ key: 'type', value: 'historic' }]))
      }
    }
  }, [searchParams, router])
  return (
    <>
      <Common.Title size="3xl" bold={700} color="white">
        Notificação
      </Common.Title>
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <label className="flex cursor-pointer flex-col">
            <input
              type="radio"
              name="notification-radio"
              className="peer appearance-none"
              defaultChecked={searchParams.get('type') === 'transactions'}
              value={'transactions'}
              onChange={(event) => handleOnRadio(event)}
            />
            <span className="text-xl font-semibold text-white/50 transition-all peer-checked:text-white">
              Transações
            </span>
            <div className="mt-2 h-0.5 w-0 place-self-center bg-mesh-color-primary-900 pl-0 transition-all peer-checked:pl-20" />
          </label>
          <label className="flex cursor-pointer flex-col">
            <input
              type="radio"
              name="notification-radio"
              className="peer"
              defaultChecked={searchParams.get('type') === 'historic'}
              value={'historic'}
              onChange={(event) => handleOnRadio(event)}
            />
            <span className="text-xl font-semibold text-white/50 transition-all peer-checked:text-white">
              Histórico
            </span>
            <div className="mt-2 h-0.5 w-0 place-self-center bg-mesh-color-primary-900 pl-0 transition-all peer-checked:pl-16" />
          </label>
        </div>
        {searchParams.get('type') === 'historic' && (
          <Link
            href={URLQuery.addQuery([
              { key: 'modalopen', value: true },
              { key: 'modaltype', value: 'filter' },
            ])}
            className="rounded-md border-none bg-mesh-color-primary-1200 px-3 py-1 font-semibold"
            data-aos="zoom-in"
          >
            {notificationFilter}
          </Link>
        )}
      </div>
      {searchParams.get('type') === 'historic' && (
        <PageNotificationHistoric data={data?.data} loading={isLoading} />
      )}
      {searchParams.get('type') === 'transactions' && (
        <PageNotificationTransaction
          data={transactionsMock.pending}
          loading={isLoading}
        />
      )}
    </>
  )
}
