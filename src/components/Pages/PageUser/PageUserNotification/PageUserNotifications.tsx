'use client'
import Common from '@/components/Common'
import { ModalNotificationFilter } from '@/components/Modal/ModalNotification/ModalNotificationFilter'
import ISteamUser from '@/interfaces/steam.interface'
import NotificationServices from '@/services/notifications.service'
import useFilterStore from '@/stores/filters.store'
import URLQuery from '@/tools/urlquery.tool'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import PageNotificationHistoric from './PageUserNotificationsHistoric'
import PageNotificationTransaction from './PageUserNotificationsTransaction'

export default function PageUserNotifications() {
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const trueSession = (session as ISteamUser) || {}
  const { notificationFilter } = useFilterStore()
  const [pageSize, setPageSize] = useState(5)
  const [urlquery, setUrlquery] = useState(searchParams.get('type'))

  useEffect(() => {
    setUrlquery(searchParams.get('type'))
  }, [searchParams])

  const notificationLabel = () => {
    return {
      tudo: 'Tudo',
      hoje: 'Hoje',
      tresDias: '1-3 Dias',
      umaSemana: '1 Semana',
      umMes: '1 Mês',
      tresMes: '3 Meses',
      umAno: '1 Ano',
    }[notificationFilter]
  }

  const router = useRouter()

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      'allNotificationsUser',
      trueSession.user?.steam?.steamid!,
      pageSize,
      notificationFilter,
    ],
    queryFn: async () => {
      const allNotifications = NotificationServices.getAllNotifsByUser(
        trueSession.user?.steam?.steamid!,
        notificationFilter,
        trueSession.user?.token!,
        pageSize,
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
    cacheTime: 0,
  })

  const handleButton = (value: string) => {
    router.push(URLQuery.addQuery([{ key: 'type', value }]))
  }

  useEffect(() => {
    const titleQuery = urlquery as 'historic' | 'transactions'

    if (titleQuery !== 'historic') {
      if (titleQuery !== 'transactions') {
        router.push(URLQuery.addQuery([{ key: 'type', value: 'historic' }]))
      }
    }
  }, [searchParams, router, urlquery])
  return (
    <>
      <Common.Title size="3xl" bold={700} color="white">
        Notificações
      </Common.Title>
      <div className="mt-5 flex items-center justify-between">
        <div className="flex select-none items-center gap-6">
          <label className="flex cursor-pointer flex-col">
            <button
              name="notification-radio"
              className="peer appearance-none"
              onClick={() => handleButton('transactions')}
            >
              <span
                className={`text-xl font-semibold transition-all ${
                  urlquery === 'transactions' ? 'text-white' : 'text-white/50'
                }`}
              >
                Transações
              </span>
            </button>
            <div
              className={`mt-2 h-0.5 w-0 place-self-center bg-mesh-color-primary-900 pl-0 transition-all ${
                urlquery === 'transactions' && 'pl-20'
              }`}
            />
          </label>
          <label className="flex cursor-pointer flex-col">
            <button
              name="notification-radio"
              className="peer appearance-none"
              onClick={() => handleButton('historic')}
            >
              <span
                className={`text-xl font-semibold  transition-all ${
                  urlquery === 'historic' ? 'text-white' : 'text-white/50'
                }`}
              >
                Histórico
              </span>
            </button>
            <div
              className={`mt-2 h-0.5 w-0 place-self-center bg-mesh-color-primary-900 pl-0 transition-all ${
                urlquery === 'historic' && 'pl-16'
              }`}
            />
          </label>
        </div>
        {urlquery === 'historic' && (
          <ModalNotificationFilter
            activator={
              <button className="rounded-md border-none bg-mesh-color-primary-1200 px-3 py-1 font-semibold capitalize">
                {notificationLabel()}
              </button>
            }
          />
        )}
      </div>
      {urlquery === 'historic' && (
        <PageNotificationHistoric
          onClick={() => {
            setPageSize((state) => state + 5)
            refetch()
          }}
          data={data?.data}
          loading={isLoading}
        />
      )}
      {urlquery === 'transactions' && (
        <PageNotificationTransaction
          steamid={trueSession.user?.steam?.steamid!}
          token={trueSession.user?.token!}
          profileurl={trueSession.user?.steam?.profileurl!}
        />
      )}
    </>
  )
}
