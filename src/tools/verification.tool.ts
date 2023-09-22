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

  public static async suspendAccount(
    trueSession: ISteamUser,
    hasAccount: boolean,
    router: any,
  ) {
    if (hasAccount) {
      Toast.Error(
        'Sua conta foi bloqueada devido a um banimento VAC vinculado à sua conta.',
      )

      await UserService.suspendUser(
        trueSession?.user?.steam?.steamid!,
        trueSession?.user?.token!,
      )

      router.push('/atividade-suspensa')
    } else {
      Toast.Error(
        'Seu registro foi cancelado devido a um banimento VAC vinculado à sua conta.',
      )

      signOut({ callbackUrl: '/' })
    }
  }
}
