import { Api } from '@/providers'

export default class AuthenticationService {
  public static verifyToken(token: string) {
    Api.get(`/token`, { headers: { Authorization: `Bearer ${token}` } })
  }
}
