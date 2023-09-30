/* eslint-disable camelcase */
import { create } from 'zustand'
import { IModalStore } from './interfaces/modal.interface'

const useModalStore = create<IModalStore>((set) => ({
  itemAvailableToReturn: true,
  setItemAvailableToReturn: (itemAvailableToReturn: boolean) => {
    set(() => ({ itemAvailableToReturn }))
  },

  skinToReturn: null,
  setSkinToReturn: (skinToReturn) => {
    set(() => ({ skinToReturn }))
  },

  whatModalOpenToReturnSkin: 0,
  setWhatModalOpenToReturnSkin: (whatModalOpenToReturnSkin) => {
    set(() => ({ whatModalOpenToReturnSkin }))
  },

  openModalReturnSkin: false,
  setOpenModalReturnSkin: (openModalReturnSkin) => {
    set(() => ({ openModalReturnSkin }))
  },
}))

export default useModalStore
