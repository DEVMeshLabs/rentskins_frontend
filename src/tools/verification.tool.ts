import UserService from '@/services/user.service'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'

export default class VerificationTool {
  public static async verifyStatus(steamId: string, router: AppRouterInstance) {
    const response = await UserService.getUserStatus(steamId)

    if (response?.data?.status === 'Suspenso') {
      router.push('/atividade-suspensa')
    }
  }
}
