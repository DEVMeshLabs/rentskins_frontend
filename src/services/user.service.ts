import { IUser } from '@/interfaces/user.interface'
import { Api } from '@/providers'
import { ICreateUser } from './interfaces/user.interface'

export default class SkinService {
  public static getUser(userSteamId: string) {
    return Api.get<IUser>(`/perfil/${userSteamId}`)
  }

  public static createUser(userSteamId: ICreateUser) {
    return Api.post(`/perfil/${userSteamId}`)
  }
}
