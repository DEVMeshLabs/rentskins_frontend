import { IOptionalConfig } from '@/interfaces/IConfig'

export interface IGetUserCart {
  id: string
  buyer_id: string
  price: number
  createdAt: Date | string
  updatedAt: Date | string | null
  deletedAt: Date | string | null
  skinId: string | null
}

export interface IGetUser {
  id: string
  owner_id: string
  status_member: string
  delivery_time: string
  delivery_fee: number
  total_exchanges: number
  steam_created_date: string
  reliability: string
  owner_name: string
  picture: string
  cart: IGetUserCart
  configuration: IOptionalConfig
}

export interface ICreateUser {
  owner_id: string
  owner_name: string
  picture: string
  owner_country: string
  steam_url: string
}
