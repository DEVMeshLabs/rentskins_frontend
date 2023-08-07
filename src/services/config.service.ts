/* eslint-disable camelcase */
import { IConfig } from '@/interfaces/IConfig'
import { Api } from '@/providers'

export default class ConfigService {
  public static async findByConfigUserId(id: string, token: string) {
    return Api.get<IConfig>(`/configuration/user/${id}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then((response) => response)
      .catch((e) => e)
  }

  public static async createConfig({
    owner_id,
    owner_name,
    owner_email,
    owner_phone,
    steam_guard,
    url_sell,
    url_trade,
    agreed_with_emails,
    agreed_with_terms,
    token,
  }: IConfig) {
    return Api.post(
      `/configuration`,
      {
        owner_id,
        owner_name,
        owner_email,
        owner_phone,
        steam_guard,
        url_sell,
        url_trade,
        agreed_with_emails,
        agreed_with_terms,
      },
      {
        headers: { Authorization: 'Bearer ' + token },
      },
    )
  }
}
