import Common from '@/components/Common'
import NotificationCard from '@/components/Others/NotificationCard'
import { INotification } from '@/services/interfaces/notification.interface'
// import useFilterStore from '@/stores/filters.store'

export interface IProps {
  data: INotification[] | undefined
  loading: boolean
  onClick: () => void
}

export default function PageNotificationHistoric({
  data,
  loading,
  onClick,
}: IProps) {
  return (
    <div className="mb-4 mt-4 h-fit gap-4 overflow-y-scroll pr-4">
      <div className="flex flex-col gap-4" data-aos="fade-up">
        {!loading ? (
          data?.length ? (
            data!.map((notifs, index) => {
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
                    {notifs.skin?.skin_image && (
                      <NotificationCard.Image image={notifs.skin?.skin_image} />
                    )}
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
        {!loading && data?.length ? (
          <Common.Button
            onClick={onClick}
            className="border-none text-mesh-color-neutral-200"
          >
            Exibir mais notificações...
          </Common.Button>
        ) : null}
      </div>
    </div>
  )
}
