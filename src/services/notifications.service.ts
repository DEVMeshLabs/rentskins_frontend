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
    time?: ITime,
    token?: string,
  ) {
    const result: AxiosPromise<INotification[]> = await Api.post<
      INotification[]
    >(
      `/notification/userAll/${userId}`,
      {
        tempo: time || 'tudo',
      },
      { headers: { Authorization: 'Bearer ' + token } },
    )
      .then((response) => response)
      .catch((e) => e)

    return result
  }

  public static async readingAllNotifications(ownerId: string, token: string) {
    const test = await Api.put(
      `/notification/${ownerId}`,
      {},
      { headers: { Authorization: 'Bearer ' + token } },
    )
      .then((response) => response)
      .catch((e) => e)
    console.log(test)
    return test
  }
}
