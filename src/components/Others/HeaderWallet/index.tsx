'use client'

import ISteamUser from '@/interfaces/steam.interface'
import WalletService from '@/services/wallet.service'
import useUserStore from '@/stores/user.store'
import Toast from '@/tools/toast.tool'
import { useQuery } from '@tanstack/react-query'

interface IProps {
  session: ISteamUser
  status: 'authenticated' | 'loading' | 'unauthenticated'
}

export default function HeaderWallet({ session, status }: IProps) {
  const { setWallet, wallet } = useUserStore()

  useQuery({
    queryKey: ['WalletService.getWalletById'],
    queryFn: async () => {
      const response = await WalletService.getWalletBySteamID(
        session?.user?.steam?.steamid!,
        session?.user?.token!,
      )

      if (response?.status === 200) {
        setWallet(response?.data?.value)
      } else {
        setWallet(NaN)
        Toast.Error(
          'Não foi possível obter o valor da carteira no momento. Tente novamente mais tarde!',
        )
      }
    },
    enabled: status === 'authenticated',
  })

  return wallet.value !== undefined && wallet.value !== null ? (
    <span>
      {Number(wallet.value).toLocaleString('pt-br', {
        currency: 'BRL',
        style: 'currency',
        minimumFractionDigits: 2,
      })}
    </span>
  ) : (
    <div className="flex h-4 items-end gap-1">
      <div className="h-1 w-1 animate-[bounce_1s_infinite_0ms] rounded-full bg-mesh-color-neutral-200" />
      <div className="h-1 w-1 animate-[bounce_1s_infinite_100ms] rounded-full bg-mesh-color-neutral-200" />
      <div className="h-1 w-1 animate-[bounce_1s_infinite_200ms] rounded-full bg-mesh-color-neutral-200" />
    </div>
  )
}
