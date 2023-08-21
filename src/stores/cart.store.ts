import create from 'zustand'
import { ICartStore } from './interfaces/cart.interface'
import { ISkins } from '@/interfaces/ISkins'

const useCartStore = create<ICartStore>((set) => ({
  skinsOnCart: [],
  setSkinsOnCart: (skinsOnCart: ISkins[]) => {
    set(() => ({ skinsOnCart }))
  },
}))

export default useCartStore
