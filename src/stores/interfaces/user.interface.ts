import { IUser } from '@/interfaces/user.interface'

export interface IWalletUser {
  value: number | undefined | null
}

export interface IStates {
  user: IUser
  setUser: (user: IUser) => void

  wallet: IWalletUser
  setWallet: (wallet: string | number) => void

  logout: boolean
  setLogout: (logout: boolean) => void
}
