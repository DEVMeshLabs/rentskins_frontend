import Common from '@/components/Common'
import NotificationCard from '@/components/Others/NotificationCard'
import { INotification } from '@/services/interfaces/notification.interface'
import URLQuery from '@/tools/urlquery.tool'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()

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
                  <div className="flex h-14 w-full items-center gap-4">
                    {notifs.skin?.skin_image && (
                      <NotificationCard.Image image={notifs.skin?.skin_image} />
                    )}
                    <NotificationCard.Content>
                      {notifs.description}
                      {notifs.type === 'Input' && (
                        <Common.Button
                          color="green"
                          className="h-8 w-min text-sm"
                          onClick={() =>
                            router.push(
                              URLQuery.addQuery([
                                { key: 'type', value: 'transactions' },
                              ]),
                            )
                          }
                        >
                          Enviar
                        </Common.Button>
                      )}
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
          <NotificationCard.Skeleton quantity={5} />
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
