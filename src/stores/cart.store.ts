/* eslint-disable camelcase */
import create from 'zustand'
import { ICartStore } from './interfaces/cart.interface'
import {} from '@/interfaces/ISkins'
import { ISkinToCart, ISkinsToBuy } from '@/services/interfaces/cart.interface'

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

  skinsToBuy: [],
  addSkinsToBuy: (skinToBuy: ISkinsToBuy) => {
    set(({ skinsToBuy }) => ({ skinsToBuy: [...skinsToBuy, skinToBuy] }))
  },

  deleteSkinsToBuy: (skinId) => {
    set(({ skinsToBuy }) => ({
      skinsToBuy: skinsToBuy.filter(({ skin_id }) => skin_id !== skinId),
    }))
  },

  clearSkinsToBuy: () => {
    set(() => ({ skinsToBuy: [] }))
  },
}))

export default useCartStore
