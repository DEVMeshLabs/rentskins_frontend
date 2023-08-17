import UserService from '@/services/user.service'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'

export default class VerificationTool {
  public static async verifyStatus(steamId: string, router: AppRouterInstance) {
    const {
      data: { status },
    } = await UserService.getUserStatus(steamId)

    if (status === 'Suspenso') {
      router.push('/atividade-suspensa')
    }
  }
}
