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
  delivery_time: string
  total_exchanges: number
  total_exchanges_completed: number
  steam_created_date: Date
  steam_url: string
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
