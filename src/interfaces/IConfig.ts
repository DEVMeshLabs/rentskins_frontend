export interface IConfig {
  owner_name: string
  owner_id: string
  owner_email: string
  owner_phone: string
  url_trade: string
  url_sell: string
  steam_guard: boolean
  agreed_with_emails: boolean
  agreed_with_terms: boolean
  token: string
}

export interface IOptionalConfig {
  token: string
  owner_name?: string
  owner_id?: string
  owner_email?: string
  owner_phone?: string
  url_trade?: string
  url_sell?: string
  steam_guard?: boolean
  agreed_with_emails?: boolean
  agreed_with_terms?: boolean
}
