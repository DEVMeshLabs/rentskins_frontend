import { ISkins } from '@/interfaces/ISkins'

export interface INotification {
  id: string
  owner_name: string
  owner_id: string
  description: string
  new: boolean
  skin_id: string | null
  createdAt: string
  updatedAt: string | null
  deletedAt: string | null
  skin: ISkins | null
}

export type ITime =
  | 'tudo'
  | 'hoje'
  | 'tresDias'
  | 'umaSemana'
  | 'umMes'
  | 'tresMes'
  | 'umAno'
