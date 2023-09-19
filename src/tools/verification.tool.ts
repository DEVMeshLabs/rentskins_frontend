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
  ) {
    if (hasAccount) {
      Toast.Error(
        'Desculpe, sua conta foi bloqueada devido a um banimento VAC vinculado à sua conta.',
      )

      console.log('ok')

      const data = await UserService.suspendUser(
        trueSession?.user?.steam?.steamid!,
        trueSession?.user?.token!,
      )

      console.log(data)

      if (data !== undefined && data !== null) {
        signOut({ callbackUrl: '/' })
      }
    } else {
      Toast.Error(
        'Desculpe, seu registro foi cancelado devido a um banimento VAC vinculado à sua conta.',
      )

      signOut({ callbackUrl: '/' })
    }
  }
}
