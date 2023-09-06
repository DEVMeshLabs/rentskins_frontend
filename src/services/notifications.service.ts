/* eslint-disable camelcase */
import { Api } from '@/providers'
import { AxiosPromise } from 'axios'
import { INotification, ITime } from './interfaces/notification.interface'

export default class NotificationServices {
  public static async getAllHistorics() {
    console.log('ok')
    return Api.get<INotification>('/notifications')
  }

  public static async getAllNotifsByUser(
    userId: string,
    token: string,
    time?: ITime,
  ) {
    const result: AxiosPromise<INotification[]> = await Api.post<
      INotification[]
    >(
      `/notification/user/${userId}`,
      {
        tempo: time || 'tudo',
      },
      { headers: { Authorization: 'Bearer ' + token } },
    )
      .then((response) => response)
      .catch((e) => e)

    return result
  }

  public static readingAllNotifications(ownerId: string, token: string) {
    console.log('ok')
    return Api.put(`/notification/${ownerId}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
  }
}
