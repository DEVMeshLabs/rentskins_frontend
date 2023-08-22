import { ISkinToCart } from '@/services/interfaces/cart.interface'

export interface ICartStore {
  skinsFromCart: ISkinToCart[]
  setSkinsFromCart: (skinToCart: ISkinToCart[]) => void
  deleteSkinFromCart: (id: string) => void
}
