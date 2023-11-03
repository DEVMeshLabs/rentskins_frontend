/* eslint-disable camelcase */
import { Api } from '@/providers'
import { AxiosPromise, AxiosResponse } from 'axios'
import { ICreateUser, IGetUser } from './interfaces/user.interface'

export default class UserService {
  public static async getUser(userSteamId: string) {
    return (await Api.get<IGetUser>(`/perfil/user/${userSteamId}`)
      .then((response) => response)
      .catch((e) => e)) as AxiosResponse<IGetUser>
  }

  public static async getUserStatus(userSteamId: string) {
    return Api.get<IGetUser>(`/perfil/status/${userSteamId}`)
      .then((response) => response)
      .catch((e) => e)
  }

  public static async createUser(userCreate: ICreateUser, token: string) {
    return (await Api.post(`/perfil`, userCreate, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response)
      .catch((e) => e)) as AxiosPromise<any>
  }

  public static async updateUserById(
    id: string,
    token: string,
    {
      owner_name,
      steam_url,
      picture,
    }: { owner_name: string; steam_url: string; picture: string },
  ) {
    return await Api.put(
      `/perfil/${id}`,
      {
        owner_name,
        steam_url,
        picture,
      },
      { headers: { Authorization: `Bearer ${token}` } },
    )
      .then((response) => response)
      .catch((e) => e)
  }

  public static async suspendUser(steamId: string, token: string) {
    return (await Api.put(
      `/perfil/user/${steamId}`,
      { account_status: 'Suspenso' },
      {
        headers: { Authorization: 'Bearer ' + token },
      },
    )
      .then((response) => response)
      .catch((e) => e)) as unknown as AxiosPromise<void>
  }

  public static verifyAccountStatus(steamId: string) {
    return Api.get(`/verify/vac/${steamId}`)
      .then((response) => response)
      .then((e) => e) as AxiosPromise<boolean>
  }

  public static async getLatestSales(ownerID: string) {
    return await Api.get(`/transaction/last/sales/${ownerID}`)
      .then((response) => response)
      .catch((e) => e)
  }
}
