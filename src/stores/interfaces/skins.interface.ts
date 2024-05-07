import { ISkinsCardModal, ISkinsToAdvertise } from '@/interfaces/ISkins'

export interface ISkinsStore {
  skinsToAdvertise: ISkinsToAdvertise[]
  openModalBuySkin: boolean
  whatModalOpenToBuySkin: 0 | 1 | 2 | 3 | 4
  rentTime: number
  skinToBuy: ISkinsCardModal | null
  itemAvailable: boolean
  setSkinsToAdvertise: (skins: ISkinsToAdvertise) => void
  removeSkinToAdvertise: (skinId: string) => void
  changeSkinToAdvertise: (
    skinId: string,
    price: number,
    itsRented: boolean,
  ) => void
  cleanSkinsToAdvertise: () => void
  setOpenModalBuySkin: (openModalBuySkin: boolean) => void
  setWhatModalOpenToBuySkin: (whatModalOpen: 0 | 1 | 2 | 3 | 4) => void
  setSkinToBuy: (skinToBuy: ISkinsCardModal) => void
  setRentTime: (rentTime: number) => void
  setItemAvailable: (itemAvailable: boolean) => void
}
