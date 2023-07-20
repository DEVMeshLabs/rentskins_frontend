'use client'
import Common from '@/components/Common'
import { INotificationHistoricProps } from '@/components/Pages/PageNotification/PageNotificationHistoric'
import { INotificationTransactionProps } from '@/components/Pages/PageNotification/PageNotificationTransaction'
import { transactionsMock } from '@/Mock/notification.transaction.mock'
import NotificationServices from '@/services/notifications.service'
import useFilterStore from '@/stores/filters.store'
import useUserStore from '@/stores/user.store'
import URLQuery from '@/tools/urlquery.tool'
import { useQuery } from '@tanstack/react-query'
import Aos from 'aos'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useEffect } from 'react'
const PageNotificationHistoric = dynamic<INotificationHistoricProps>(() =>
  import('@/components/Pages/PageNotification/PageNotificationHistoric').then(
    (module) => module.default,
  ),
)
const PageNotificationTransaction = dynamic<INotificationTransactionProps>(() =>
  import(
    '@/components/Pages/PageNotification/PageNotificationTransaction'
  ).then((module) => module.default),
)

export default function NotificationPage() {
  const { notificationFilter } = useFilterStore()

  const searchParams = useSearchParams()
  const router = useRouter()

  const {
    user: { steamid },
  } = useUserStore()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['allNotificationsUser', steamid],
    queryFn: async () => {
      const allNotifications = NotificationServices.getAllNotifsByUser(
        steamid,
        notificationFilter,
      )
      if ((await allNotifications).data.length > 0) {
        NotificationServices.readingAllNotifications(steamid)
      }
      return allNotifications
    },
  })

  useEffect(() => {
    refetch()
  }, [])

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

  const handleOnRadio = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    router.push(URLQuery.addQuery([{ key: 'type', value }]))
  }

  const handleOnFilter = () => {
    router.push(
      URLQuery.addQuery([
        { key: 'modalopen', value: true },
        { key: 'modaltype', value: 'filter' },
      ]),
    )
  }

  return (
    <main className="mx-auto mt-6 flex w-8/12 flex-col">
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
          <Common.Button
            className="border-none bg-mesh-color-primary-1200 px-3 py-1 font-semibold"
            onClick={() => handleOnFilter()}
            data-aos="zoom-in"
          >
            {notificationFilter}
          </Common.Button>
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
    </main>
  )
}
