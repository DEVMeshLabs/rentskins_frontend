/* eslint-disable camelcase */
import { IConfig } from '@/interfaces/IConfig'
import { Api } from '@/providers'
import axios from 'axios'

export default class ConfigService {
  public static findByConfigUserId(id: string) {
    try {
      return Api.get<IConfig>(`/configuration/user/${id}`)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          error: 'Falha ao obter configuração do usuário: ' + error.message,
          message:
            'Não foi possível obter a configuração do usuário solicitada. Verifique se o ID do usuário está correto e se o servidor está funcionando corretamente.',
          status_code: 500,
        }
      } else {
        return {
          error: 'Erro desconhecido.',
          message:
            'Não foi possível obter a configuração do usuário solicitada.',
          status_code: 500,
        }
      }
    }
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
    try {
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          error:
            'Falha na criação da configuração do usuário: ' + error.message,
          message:
            'Não foi possível criar a configuração do usuário. Verifique se os dados fornecidos estão corretos e tente novamente.',
          status_code: 500,
        }
      } else {
        return {
          error: 'Erro desconhecido.',
          message:
            'Não foi possível criar a configuração do usuário solicitada.',
          status_code: 500,
        }
      }
    }
  }
}
