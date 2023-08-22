import create from 'zustand'
import { ICartStore } from './interfaces/cart.interface'
import {} from '@/interfaces/ISkins'
import { ISkinToCart } from '@/services/interfaces/cart.interface'

const useCartStore = create<ICartStore>((set) => ({
  skinsFromCart: [],
  setSkinsFromCart: (skinsFromCart: ISkinToCart[]) => {
    set(() => ({ skinsFromCart }))
  },

  deleteSkinFromCart: (id: string) => {
    set(({ skinsFromCart }) => ({
      skinsFromCart: skinsFromCart.filter((skin) => skin.skin.id !== id),
    }))
  },
}))

export default useCartStore
