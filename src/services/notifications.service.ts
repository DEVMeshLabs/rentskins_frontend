/* eslint-disable camelcase */
import { Api } from '@/providers'
import { INotification, ITime } from './interfaces/notification.interface'

export default class NotificationServices {
  public static async getAllHistorics() {
    console.log('ok')
    return Api.get<INotification>('/notifications')
  }

  public static getAllNotifsByUser(
    userId: string,
    token: string,
    time?: ITime,
  ) {
    return Api.post<INotification[]>(
      `/notification/userAll/${userId}`,
      {
        tempo: time || 'tudo',
      },
      { headers: { Authorization: 'Bearer ' + token } },
    )
  }

  public static readingAllNotifications(ownerId: string, token: string) {
    console.log('ok')
    return Api.put(`/notification/${ownerId}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
  }
}
