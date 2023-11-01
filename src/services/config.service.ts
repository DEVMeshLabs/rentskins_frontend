/* eslint-disable camelcase */
import { IConfig, IOptionalConfig } from '@/interfaces/IConfig'
import { Api } from '@/providers'
import { AxiosPromise } from 'axios'

export default class ConfigService {
  public static async findByConfigUserId(id: string, token: string) {
    return Api.get<IConfig>(`/configuration/user/${id}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then((response) => response)
      .catch((e) => e) as AxiosPromise<IConfig>
  }

  public static async updateConfig({
    token,
    agreed_with_emails,
    agreed_with_terms,
    owner_email,
    owner_id,
    owner_name,
    owner_phone,
    owner_cpf,
    steam_guard,
    url_sell,
    url_trade,
  }: IOptionalConfig) {
    return Api.put<IConfig>(
      `/configuration`,
      {
        agreed_with_emails,
        agreed_with_terms,
        owner_email,
        owner_id,
        owner_cpf,
        owner_name,
        owner_phone,
        steam_guard,
        url_sell,
        url_trade,
      },
      {
        headers: { Authorization: 'Bearer ' + token },
      },
    )
      .then((response) => response)
      .catch((e) => e)
  }
}
