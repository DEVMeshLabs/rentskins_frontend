import { ISkins } from '@/interfaces/ISkins'

export interface ICartStore {
  skinsOnCart: ISkins[]
  setSkinsOnCart: (skinToCart: ISkins[]) => void
}
