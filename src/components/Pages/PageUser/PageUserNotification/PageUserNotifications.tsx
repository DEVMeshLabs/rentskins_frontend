'use client'
import Common from '@/components/Common'
import { ModalNotificationFilter } from '@/components/Modal/ModalNotification/ModalNotificationFilter'
import ISteamUser from '@/interfaces/steam.interface'
import { INotification } from '@/services/interfaces/notification.interface'
import NotificationServices from '@/services/notifications.service'
import useFilterStore from '@/stores/filters.store'
import URLQuery from '@/tools/urlquery.tool'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
const PageNotificationHistoric = dynamic<{
  data: INotification[] | undefined
  loading: boolean
  onClick: () => void
}>(() =>
  import(
    '@/components/Pages/PageUser/PageUserNotification/PageUserNotificationsHistoric'
  ).then((module) => module.default),
)
const PageNotificationTransaction = dynamic<{ steamid: string; token: string }>(
  () =>
    import(
      '@/components/Pages/PageUser/PageUserNotification/PageUserNotificationsTransaction'
    ).then((module) => module.default),
)

export default function PageUserNotifications() {
  const { data: session, status } = useSession()
  const trueSession = (session as ISteamUser) || {}
  const { notificationFilter } = useFilterStore()
  const [pageSize, setPageSize] = useState(5)

  const notificationLabel = () => {
    console.log(notificationFilter)
    console.log(
      {
        tudo: 'Tudo',
        hoje: 'Hoje',
        tresDias: '1-3 Dias',
        umaSemana: '1 Semana',
        umMes: '1 Mês',
        tresMes: '3 Meses',
        umAno: '1 Ano',
      }[notificationFilter],
    )
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

  const searchParams = useSearchParams()
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
  })

  console.log(data)

  const handleOnRadio = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    router.push(URLQuery.addQuery([{ key: 'type', value }]))
  }

  useEffect(() => {
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
        Notificações
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
            <span
              className={`text-xl font-semibold transition-all ${
                searchParams.get('type') === 'transactions'
                  ? 'text-white'
                  : 'text-white/50'
              }`}
            >
              Transações
            </span>
            <div
              className={`mt-2 h-0.5 w-0 place-self-center bg-mesh-color-primary-900 pl-0 transition-all ${
                searchParams.get('type') === 'transactions' && 'pl-20'
              }`}
            />
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
            <span
              className={`text-xl font-semibold  transition-all ${
                searchParams.get('type') === 'historic'
                  ? 'text-white'
                  : 'text-white/50'
              }`}
            >
              Histórico
            </span>
            <div
              className={`mt-2 h-0.5 w-0 place-self-center bg-mesh-color-primary-900 pl-0 transition-all ${
                searchParams.get('type') === 'historic' && 'pl-16'
              }`}
            />
          </label>
        </div>
        {searchParams.get('type') === 'historic' && (
          <ModalNotificationFilter
            activator={
              <button className="rounded-md border-none bg-mesh-color-primary-1200 px-3 py-1 font-semibold capitalize">
                {notificationLabel()}
              </button>
            }
          />
        )}
      </div>
      {searchParams.get('type') === 'historic' && (
        <PageNotificationHistoric
          onClick={() => {
            setPageSize((state) => state + 5)
            refetch()
          }}
          data={data?.data}
          loading={isLoading}
        />
      )}
      {searchParams.get('type') === 'transactions' && (
        <PageNotificationTransaction
          steamid={trueSession.user?.steam?.steamid!}
          token={trueSession.user?.token!}
        />
      )}
    </>
  )
}
