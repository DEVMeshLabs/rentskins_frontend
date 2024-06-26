import { Api } from '@/providers'
import { AxiosPromise, AxiosResponse } from 'axios'
import { ICreateUser, IGetUser } from './interfaces/user.interface'

export default class UserService {
  public static async getUser(userSteamId: string) {
    const result: AxiosResponse<IGetUser> = await Api.get<IGetUser>(
      `/perfil/user/${userSteamId}`,
    )
      .then((response) => response)
      .catch((e) => e)

    return result
  }

  public static async getUserStatus(userSteamId: string) {
    return Api.get<IGetUser>(`/perfil/status/${userSteamId}`)
      .then((response) => response)
      .catch((e) => e)
  }

  public static async createUser(userCreate: ICreateUser, token: string) {
    return Api.post(`/perfil`, userCreate, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response)
      .catch((e) => e) as AxiosPromise<any>
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
    console.log('chegou aqui')
    const test = await Api.get(`/transaction/last/sales/${ownerID}`)
      .then((response) => response)
      .catch((e) => e)
    console.log(test)
    return test
  }
}
