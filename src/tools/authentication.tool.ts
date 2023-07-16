import { IUser } from '@/interfaces/user.interface'
import JsonWebToken from './jsonwebtoken.tool'
import LocalStorage from './localstorage.tool'

export default class Authentication {
  public static login(params: any, router: any, URLQuery: any) {
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
    location.reload()
    setLogoutStore(false)
  }

  public static validateUserSession(router: any) {
    const checkToken = () => {
      const token = LocalStorage.get('token')

      if (token) {
        const verification = JsonWebToken.verify(token) as IUser

        if (verification.steamid) {
          return true
        }

        return false
      }

      return false
    }

    if (!checkToken()) {
      router.push('/')
    }
  }
}
