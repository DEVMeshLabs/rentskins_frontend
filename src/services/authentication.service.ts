import { Api } from '@/providers'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'

export default class AuthenticationService {
  public static verifyToken(token: string, router: AppRouterInstance) {
    Api.get(`/token`, {
      headers: { Authorization: `Bearer ${token}` },
    }).catch((e) => router.push('/'))
  }
}
