import { ISkinToCart, ISkinsToBuy } from '@/services/interfaces/cart.interface'

export interface ICartStore {
  skinsFromCart: ISkinToCart[]
  skinsToBuy: ISkinsToBuy[]
  setSkinsFromCart: (skinToCart: ISkinToCart[]) => void
  addSkinsToBuy: (skinToBuy: ISkinsToBuy) => void
  deleteSkinsToBuy: (skin_id: string) => void
  deleteSkinFromCart: (id: string) => void
  clearSkinsToBuy: () => void
}
