import { IUser } from '@/interfaces/user.interface'

export interface IWalletUser {
  data?: {
    id?: string
    owner_name?: string
    owner_id?: string
    value?: string
    createdAt?: string
    updatedAt?: string | null
    deletedAt?: string | null
  }
}

export interface IStates {
  user: IUser
  setUser: (user: IUser) => void

  wallet: IWalletUser
  setWallet: (wallet: IWalletUser) => void

  logout: boolean
  setLogout: (logout: boolean) => void
}
