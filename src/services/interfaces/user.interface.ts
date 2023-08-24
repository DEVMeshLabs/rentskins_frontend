export interface IGetUser {
  id: string
  owner_id: string
  status_member: string
  delivery_time: string
  delivery_fee: number
  total_exchanges: string
  steam_created_date: string
  steam_level: string
  owner_name: string
  picture: string
}

export interface ICreateUser {
  owner_id: string
  owner_name: string
  picture: string
  owner_country: string
  steam_url: string
}
