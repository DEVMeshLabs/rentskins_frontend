import { INotification } from '@/services/interfaces/notification.interface'

export default class Notifications {
  public static hasNotification(arr: INotification[] | undefined): boolean {
    return arr?.length ? arr.some((notif) => notif.new) : false
  }
}
