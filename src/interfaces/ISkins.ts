export interface ISkins {
  id: string
  asset_id: string
  name_color: string
  skin_image: string
  skin_name: string
  skin_color: string
  skin_category: string
  skin_weapon: string
  skin_price: string
  skin_float: string
  status: string
  sale_type: string
  seller_id: string
  skin_link_game: string
  skin_link_steam: string
  status_float: string
  buyer_name: string
  buyer_id: string
  deletedAt: string | null
}

export interface ISkinsResponse {
  totalPages: number
  totalItens: number
  skins: ISkins[]
}

export interface ISkinsToAdvertise {
  id?: string
  asset_id: string
  skin_image: string
  skin_name: string
  skin_category: string
  skin_weapon: string
  skin_price: string
  skin_float: string
  seller_name: string
  seller_id: string
  skin_color: string
  status: string
  sale_type: string
  status_float: string
  skin_link_game: string
  skin_link_steam: string
}

export interface ISkinsAvailability {
  error?: string
}
