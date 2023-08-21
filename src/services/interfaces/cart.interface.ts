import { ISkins } from '@/interfaces/ISkins'

export interface ICart {
  id: string
  buyer_name: string
  buyer_id: string
  price: string
  createdAt: string
  updatedAt: string | null
  deletedAt: string | null
  buyer_skins: ISkins[]
}
