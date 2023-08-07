import create from 'zustand'
import { IStates } from './interfaces/user.interface'

const useUserStore = create<IStates>((set) => ({
  user: { username: '', steamid: '', picture: '', country: '', profile: '' },
  setUser: (user) => {
    set(() => ({ user }))
  },

  wallet: { data: {} },
  setWallet: (wallet) => {
    const newWallet = {
      data: {
        ...wallet.data,
        value: Number(wallet.data?.value).toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
        }),
      },
    }
    set(() => ({ wallet: newWallet }))
  },
  logout: false,
  setLogout: (logout) => {
    set(() => ({ logout }))
  },
}))

export default useUserStore
