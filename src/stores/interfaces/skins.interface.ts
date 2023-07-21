import { ISkinsToAdvertise } from '@/interfaces/ISkins'

export interface ISkinsStore {
  skinsToAdvertise: ISkinsToAdvertise[]
  setSkinsToAdvertise: (skins: ISkinsToAdvertise) => void
}
