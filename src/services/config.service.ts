/* eslint-disable camelcase */
import { IConfig } from '@/interfaces/IConfig'
import { Api } from '@/providers'

export default class ConfigService {
  public static findByConfigUserId(id: string) {
    return Api.get<IConfig>(`/configuration/user/${id}`)
  }

  public static createConfig({
    owner_id,
    owner_name,
    owner_email,
    steam_guard,
    url_sell,
    url_trade,
    agreed_with_emails,
    agreed_with_terms,
  }: IConfig) {
    return Api.post(`/configuration`, {
      owner_id,
      owner_name,
      owner_email,
      steam_guard,
      url_sell,
      url_trade,
      agreed_with_emails,
      agreed_with_terms,
    })
  }
}
