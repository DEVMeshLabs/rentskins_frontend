import Common from '@/components/Common'
import NotificationCard from '@/components/Others/NotificationCard'
import { INotification } from '@/services/interfaces/notification.interface'
// import useFilterStore from '@/stores/filters.store'

interface IProps {
  data: INotification[] | undefined
  loading: boolean
}

export function PageNotificationHistoric({ data, loading }: IProps) {
  // const timeFilter = () => {
  //   switch (notificationFilter) {
  //     case 'Tudo':
  //       return [0, 0]
  //     case 'Hoje':
  //       return [0, 1440] // 1440 minutos em um dia (24 horas)
  //     case '1-3 Dias':
  //       return [1440, 4320] // 1440 minutos em um dia (24 horas), 4320 minutos em 3 dias
  //     case '1 Semana':
  //       return [4320, 10080] // 10080 minutos em uma semana (7 dias)
  //     default:
  //       return [0, 0]
  //   }
  // }

  return (
    <div className="mb-12 mt-4 h-screen gap-4 overflow-y-scroll pr-4">
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
            <Common.Title className="mt-16 self-center text-2xl text-mesh-color-neutral-100">
              Não encontramos nenhuma notificação referente ao período que você
              escolheu.
            </Common.Title>
          )
        ) : (
          <NotificationCard.Skeleton quantity={8} />
        )}
      </div>
    </div>
  )
}
