import { ISkinsToAdvertise } from '@/interfaces/ISkins'

export interface ISkinsStore {
  skinsToAdvertise: ISkinsToAdvertise[]
  setSkinsToAdvertise: (skins: ISkinsToAdvertise) => void
  removeSkinToAdvertise: (skinId: string) => void
  changeSkinToAdvertise: (skinId: string, price: string) => void
}
