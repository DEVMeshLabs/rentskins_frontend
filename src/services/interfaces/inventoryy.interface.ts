export interface Description {
  type: string
  value: string
  color?: string
}

export interface Action {
  link: string
  name: string
}

export interface Tag {
  internal_name: string
  name: string
  category: string
  color: string
  category_name: string
}

export interface ISkinInventory {
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
  descriptions: Description[]
  tradable: boolean
  actions: Action[]
  name: string
  name_color: string
  type: string
  market_name: string
  market_hash_name: string
  market_actions: Action[]
  commodity: boolean
  market_tradable_restriction: number
  marketable: boolean
  tags: Tag[]
  is_currency: boolean
  market_marketable_restriction: number
  fraudwarnings: any[]
}

export interface IInventory {
  inventory: {
    inventory: ISkinInventory[]
    maxItems: number
    maxPages: number
  }
  float: []
}
