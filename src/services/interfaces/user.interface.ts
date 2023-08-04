export interface IGetUser {
  id: string
  owner_id: string
  status_member: string
  delivery_time: string
  delivery_fee: string
  total_exchanges: string
  account_date: string
  steam_level: string
  owner_name: string
  picture: string
}

export interface ICreateUser {
  owner_id: string
  owner_name: string
  picture: string
}
