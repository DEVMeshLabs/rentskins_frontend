/* eslint-disable camelcase */
import { Api } from '@/providers'
import { INotification, ITime } from './interfaces/notification.interface'

export default class NotificationServices {
  public static async getAllHistorics() {
    return Api.get<INotification>('/notifications')
  }

  public static getAllNotifsByUser(userId: string, time?: ITime) {
    return Api.post<INotification[]>(`/notification/userAll/547777`, {
      tempo: 'tudo',
    })
  }

  public static readingAllNotifications(ownerId: string) {
    return Api.put(`/notification/547777`)
  }
}
