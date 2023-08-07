import { Api } from '@/providers'
import { INotification, ITime } from './interfaces/notification.interface'

export default class NotificationServices {
  public static async getAllHistorics() {
    return Api.get<INotification>('/notifications')
  }

  public static async getAllNotifsByUser(userId: string, time?: ITime) {
    return Api.post<INotification[]>(`/notification/userAll/${userId}`, {
      tempo: time || 'tudo',
    })
  }
}
