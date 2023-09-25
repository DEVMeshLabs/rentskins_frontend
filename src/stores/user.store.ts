import create from 'zustand'
import { IStates } from './interfaces/user.interface'

const useUserStore = create<IStates>((set) => ({
  wallet: { value: undefined },
  setWallet: (wallet: any) => {
    set(() => ({ wallet: { value: wallet } }))
  },
}))

export default useUserStore
