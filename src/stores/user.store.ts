import create from 'zustand'
import { IStates } from './interfaces/user.interface'

const useUserStore = create<IStates>((set) => ({
  user: { username: '', steamid: '', picture: '', country: '', profile: '' },
  setUser: (user) => {
    set(() => ({ user }))
  },

  wallet: { value: undefined },
  setWallet: (wallet: any) => {
    set(() => ({ wallet: { value: wallet } }))
  },
  logout: false,
  setLogout: (logout) => {
    set(() => ({ logout }))
  },
}))

export default useUserStore
