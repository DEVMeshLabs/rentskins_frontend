import { ISkinsCardModal } from '@/interfaces/ISkins'

export interface IModalStore {
  skinToReturn: ISkinsCardModal | null
  itemAvailableToReturn: boolean
  whatModalOpenToReturnSkin: 0 | 1 | 2 | 3 | 4
  openModalReturnSkin: boolean
  setItemAvailableToReturn: (itemAvailableToReturn: boolean) => void
  setSkinToReturn: (skinToReturn: ISkinsCardModal) => void
  setWhatModalOpenToReturnSkin: (
    whatModalOpenToReturnSkin: 0 | 1 | 2 | 3 | 4,
  ) => void
  setOpenModalReturnSkin: (openModalReturnSkin: boolean) => void
}
