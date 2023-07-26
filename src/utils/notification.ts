import { INotification } from '@/services/interfaces/notification.interface'

export function thereIsNotification(arr: INotification[] | undefined): boolean {
  return arr?.length ? arr.some((notif) => notif.new) : false
}
