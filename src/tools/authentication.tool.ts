import { IUser } from '@/interfaces/user.interface'
import AuthenticationService from '@/services/authentication.service'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { ReadonlyURLSearchParams } from 'next/navigation'
import JsonWebToken from './jsonwebtoken.tool'
import LocalStorage from './localstorage.tool'

export default class Authentication {
  public static authenticate(router: AppRouterInstance) {
    const token = LocalStorage.get('token')
    AuthenticationService.verifyToken(token, router)
  }

  public static login(
    params: ReadonlyURLSearchParams,
    router: AppRouterInstance,
    URLQuery: any,
  ) {
    const tokenOnURL = params.get('token')

    if (tokenOnURL) {
      const verification = JsonWebToken.verify(tokenOnURL) as IUser

      if (
        verification !== null &&
        verification !== undefined &&
        verification.steamid
      ) {
        LocalStorage.create('token', tokenOnURL)
        console.log('User first login')
      }
    } else {
      const storage = LocalStorage.get('token')

      if (storage !== null && storage !== undefined) {
        const verification = JsonWebToken.verify(storage) as IUser

        if (
          verification !== null &&
          verification !== undefined &&
          verification.steamid
        ) {
          console.log('User returning login')
        } else {
          console.log('User not logged in.')
        }
      } else {
        console.log('User not logged in')
      }
    }
    if (tokenOnURL) {
      router.push(URLQuery.removeQuery(['token']))
    }
  }

  public static logout(setLogoutStore: (boolean: boolean) => void) {
    LocalStorage.remove('token')
    window.location.href = '/'
    setLogoutStore(false)
  }
}
