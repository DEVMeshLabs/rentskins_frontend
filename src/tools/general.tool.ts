import { TypeErrors } from '@/interfaces/tools/general.interface'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import Toast from './toast.tool'

export default class GeneralTool {
  public static generateToastError(
    error: TypeErrors,
    router: AppRouterInstance,
    pathname: string,
  ) {
    switch (error) {
      case 'InvalidAccountDate': {
        Toast.Error(
          'Sua conta deve ter pelo menos 3 meses de uso para efetuar o login.',
          4000,
        )
        break
      }
      case 'SignInAccountVACBanned': {
        Toast.Error(
          'Seu login/cadastro foi bloqueado devido a um banimento VAC vinculado à sua conta Steam.',
          4000,
        )
      }
    }

    router.replace(pathname)
  }
}
