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
  owner_name: string
  owner_type: string
  owner_country: string
  stripe_id: string
  account_status: string
  steam_url: string
  picture: string
  delivery_time: string
  total_exchanges: number
  total_exchanges_completed: number
  total_exchanges_failed: number
  reliability: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  steam_created_date: Date
  configurationId: string
  cart_id: string
  configuration: IOptionalConfig
  cart: IGetUserCart
}

export interface ICreateUser {
  owner_id: string
  owner_name: string
  picture: string
  owner_country: string
  steam_url: string
}
