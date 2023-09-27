import Common from '@/components/Common'
import NotificationCard from '@/components/Others/NotificationCard'
import ISteamUser from '@/interfaces/steam.interface'
import { ITime } from '@/services/interfaces/notification.interface'
import NotificationServices from '@/services/notifications.service'
import { useQuery } from '@tanstack/react-query'
// import useFilterStore from '@/stores/filters.store'

export interface IProps {
  trueSession: ISteamUser
  status: 'authenticated' | 'loading' | 'unauthenticated'
  notificationFilter: ITime
}

export default function PageNotificationHistoric({
  trueSession,
  status,
  notificationFilter,
}: IProps) {
  const { data: notifications, isLoading } = useQuery({
    queryKey: ['allNotificationsUser', trueSession.user?.steam?.steamid!],
    queryFn: async () => {
      const allNotifications = NotificationServices.getAllNotifsByUser(
        trueSession.user?.steam?.steamid!,
        notificationFilter,
        trueSession.user?.token!,
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
    refetchOnMount: true,
    refetchOnReconnect: true,
  })

  return (
    <div className="mt-4 h-fit gap-4 overflow-y-scroll pr-4">
      <div className="flex flex-col gap-4">
        {!isLoading ? (
          notifications?.data?.length ? (
            notifications?.data!.map((notifs, index) => {
              const timestamp = new Date(notifs.createdAt)
              const currentTimestamp = Date.now()

              const diffMilliseconds = currentTimestamp - timestamp.getTime()
              const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60))
              return (
                <NotificationCard.Root
                  key={'notification-' + index}
                  newCard={notifs.new}
                >
                  <div className="flex items-center gap-4">
                    <NotificationCard.Image
                      image={notifs.skin?.skin_image || ''}
                    />
                    <NotificationCard.Content>
                      {notifs.description}
                    </NotificationCard.Content>
                  </div>
                  <NotificationCard.Time timestamp={diffMinutes} />
                </NotificationCard.Root>
              )
            })
          ) : (
            <Common.Title className="h-[40vh] self-center text-2xl text-mesh-color-neutral-100">
              Histórico de notificações vazio.
            </Common.Title>
          )
        ) : (
          <NotificationCard.Skeleton quantity={8} />
        )}
      </div>
    </div>
  )
}
