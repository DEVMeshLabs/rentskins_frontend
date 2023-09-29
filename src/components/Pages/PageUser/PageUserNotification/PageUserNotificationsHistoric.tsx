import Common from '@/components/Common'
import NotificationCard from '@/components/Others/NotificationCard'
import { INotification } from '@/services/interfaces/notification.interface'
// import useFilterStore from '@/stores/filters.store'

export interface INotificationHistoricProps {
  data: INotification[] | undefined
  loading: boolean
}

export default function PageNotificationHistoric({
  data,
  loading,
}: INotificationHistoricProps) {
  return (
    <div className="mt-4 h-fit gap-4 overflow-y-scroll pr-4">
      <div className="flex flex-col gap-4" data-aos="fade-up">
        {!loading ? (
          data?.length ? (
            data!.map((notifs, index) => {
              const timestamp = new Date(notifs.createdAt)
              const currentTimestamp = Date.now()

              const diffMilliseconds = currentTimestamp - timestamp.getTime()
              const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60))
              console.log(diffMilliseconds)
              console.log(diffMinutes)
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
