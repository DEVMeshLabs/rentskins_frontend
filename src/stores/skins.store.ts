/* eslint-disable camelcase */
import { create } from 'zustand'
import { ISkinsStore } from './interfaces/skins.interface'
import { ISkinsToAdvertise } from '@/interfaces/ISkins'

const useSkinsStore = create<ISkinsStore>((set) => ({
  skinsToAdvertise: [],
  setSkinsToAdvertise: (skinToAdvertise: ISkinsToAdvertise) => {
    set(({ skinsToAdvertise: oldSkinsToAdvertise }) => {
      if (!oldSkinsToAdvertise.some(({ id }) => id === skinToAdvertise.id)) {
        return { skinsToAdvertise: [...oldSkinsToAdvertise, skinToAdvertise] }
      }
      return {}
    })
  },

  removeSkinToAdvertise: (skinId: string) => {
    set(({ skinsToAdvertise }) => {
      const newSkinsToAdvertise = skinsToAdvertise.filter(
        ({ id }) => id !== skinId,
      )
      return { skinsToAdvertise: newSkinsToAdvertise }
    })
  },

  changeSkinToAdvertise: (skinId: string, price: string) => {
    set(({ skinsToAdvertise: oldSkinsToAdvertise }) => {
      const newChangedSkinsToAdvertise = oldSkinsToAdvertise.map((skin) => {
        if (skin.id === skinId) {
          return { ...skin, skin_price: price }
        }
        return skin
      })

      return { skinsToAdvertise: newChangedSkinsToAdvertise }
    })
  },

  cleanSkinsToAdvertise: () => {
    set(() => ({ skinsToAdvertise: [] }))
  },

  openModalBuySkin: false,
  setOpenModalBuySkin: (openModalBuySkin) => {
    set(() => ({ openModalBuySkin }))
  },

  skinToBuy: null,
  setSkinToBuy: (skinToBuy) => {
    set(() => ({ skinToBuy }))
  },

  whatModalOpenToBuySkin: 0,
  setWhatModalOpenToBuySkin: (whatModalOpen) => {
    set(() => ({ whatModalOpenToBuySkin: whatModalOpen }))
  },

  rentTime: 0,
  setRentTime: (rentTime) => {
    set(() => ({ rentTime }))
  },

  itemAvailable: false,
  setItemAvailable: (itemAvailable: boolean) => {
    set(() => ({ itemAvailable }))
  },
}))

export default useSkinsStore
