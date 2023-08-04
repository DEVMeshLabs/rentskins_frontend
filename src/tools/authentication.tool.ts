import AuthenticationService from '@/services/authentication.service'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import LocalStorage from './localstorage.tool'

export default class Authentication {
  public static authenticate(router: AppRouterInstance) {
    const token = LocalStorage.get('token')
    AuthenticationService.verifyToken(token, router)
  }
}
