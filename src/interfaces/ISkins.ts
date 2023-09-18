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

export interface ISkinsCardModal {
  skinId: string
  skinPrice: string
  skinColor: string
  skinName: string
  skinImage: string
  statusFloat: string
  skinFloat: string
  skinWeapon: string
}

export interface ISteamItens {
  appid: number
  contextid: string
  assetid: string
  classid: string
  instanceid: string
  amount: number
  pos: number
  id: string
  currency: number
  background_color: string
  icon_url: string
  icon_url_large: string
  descriptions: Array<{
    type: string
    value: string
    color?: string
  }>
  tradable: boolean
  actions: Array<{
    link: string
    name: string
  }>
  name: string
  name_color: string
  type: string
  market_name: string
  market_hash_name: string
  market_actions: Array<{
    link: string
    name: string
  }>
  commodity: boolean
  market_tradable_restriction: number
  marketable: boolean
  tags: Array<{
    internal_name: string
    name: string
    category: string
    color: string
    category_name: string
  }>
  is_currency: boolean
  market_marketable_restriction: number
  fraudwarnings: string[]
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
  skin_price: number
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
