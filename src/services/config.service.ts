/* eslint-disable camelcase */
import { IConfig } from '@/interfaces/IConfig'
import { Api } from '@/providers'

export default class ConfigService {
  public static findByConfigUserId(id: string, token: string) {
    return Api.get<IConfig>(`/configuration/user/${id}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
  }

  public static async createConfig({
    owner_id,
    owner_name,
    owner_email,
    steam_guard,
    url_sell,
    url_trade,
    agreed_with_emails,
    agreed_with_terms,
  }: IConfig) {
    console.log('aqui foi')
    const test = Api.post(`/configuration`, {
      owner_id,
      owner_name,
      owner_email,
      steam_guard,
      url_sell,
      url_trade,
      agreed_with_emails,
      agreed_with_terms,
    })
    console.log('aqui foi 2')
    console.log(await test)
    return test
  }
}
