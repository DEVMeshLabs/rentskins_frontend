import ISteamUser from '@/interfaces/steam.interface'
import UserService from '@/services/user.service'
import { signOut } from 'next-auth/react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import Toast from './toast.tool'

export default class VerificationTool {
  public static async verifyStatus(steamId: string, router: AppRouterInstance) {
    const response = await UserService.getUserStatus(steamId)

    if (response?.data?.status === 'Suspenso') {
      return router.push('/atividade-suspensa')
    }
  }

  public static suspendAccount(trueSession: ISteamUser, hasAccount: boolean) {
    if (hasAccount) {
      UserService.suspendUser(
        trueSession?.user?.steam?.steamid!,
        trueSession?.user?.token!,
      )

      Toast.Error(
        'Desculpe, sua conta foi bloqueada devido a um banimento VAC vinculado à sua conta.',
      )
    } else {
      Toast.Error(
        'Desculpe, seu registro foi cancelado devido a um banimento VAC vinculado à sua conta.',
      )
    }
    signOut({ callbackUrl: '/' })
  }
}
