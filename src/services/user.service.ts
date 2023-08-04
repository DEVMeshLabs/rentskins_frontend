import { Api } from '@/providers'
import { ICreateUser, IGetUser } from './interfaces/user.interface'

export default class UserService {
  public static getUser(userSteamId: string, token: string) {
    return Api.get<IGetUser>(`/perfil/user/${userSteamId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  public static createUser(userCreate: ICreateUser, token: string) {
    return Api.post(`/perfil`, userCreate, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
}
