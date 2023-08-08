import { Api } from '@/providers'
import { ICreateUser, IGetUser } from './interfaces/user.interface'

export default class UserService {
  public static async getUser(userSteamId: string) {
    return Api.get<IGetUser>(`/perfil/user/${userSteamId}`)
      .then((response) => response)
      .catch((e) => e)
  }

  public static async createUser(userCreate: ICreateUser, token: string) {
    return Api.post(`/perfil`, userCreate, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
}
