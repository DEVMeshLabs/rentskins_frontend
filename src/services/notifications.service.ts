/* eslint-disable camelcase */
import { Api } from '@/providers'
import { AxiosPromise } from 'axios'
import { INotification, ITime } from './interfaces/notification.interface'

export default class NotificationServices {
  public static async getAllHistorics() {
    return Api.get<INotification>('/notifications')
  }

  public static async getAllNotifsByUser(
    userId: string,
    time?: ITime,
    token?: string,
    pageSize?: number,
  ) {
    const result: AxiosPromise<INotification[]> = await Api.post<
      INotification[]
    >(
      `/notification/userAll/${userId}`,
      {
        tempo: time || 'tudo',
        pageSize,
      },
      { headers: { Authorization: 'Bearer ' + token } },
    )
      .then((response) => response)
      .catch((e) => e)

    return result
  }

  public static async createNewNotification(
    owner_id: string,
    token: string,
    description: string,
    skin_id?: string,
  ) {
    return await Api.post(
      `/notification`,
      {
        owner_id,
        description,
        skin_id,
      },
      { headers: { Authorization: 'Bearer ' + token } },
    )
  }

  public static async readingAllNotifications(ownerId: string, token: string) {
    return await Api.put(
      `/notification/${ownerId}`,
      {},
      { headers: { Authorization: 'Bearer ' + token } },
    )
      .then((response) => response)
      .catch((e) => e)
  }
}
