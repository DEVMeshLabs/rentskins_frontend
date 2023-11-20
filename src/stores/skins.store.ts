/* eslint-disable camelcase */
import { ISkinsToAdvertise } from '@/interfaces/ISkins'
import { create } from 'zustand'
import { ISkinsStore } from './interfaces/skins.interface'

const useSkinsStore = create<ISkinsStore>((set) => ({
  skinsToAdvertise: [],
  setSkinsToAdvertise: (skinToAdvertise: ISkinsToAdvertise) => {
    set(({ skinsToAdvertise: oldSkinsToAdvertise }) => {
      if (
        !oldSkinsToAdvertise.some(
          ({ asset_id }) => asset_id === skinToAdvertise.asset_id,
        )
      ) {
        return { skinsToAdvertise: [...oldSkinsToAdvertise, skinToAdvertise] }
      }
      return {}
    })
  },

  removeSkinToAdvertise: (paramAssetId: string) => {
    set(({ skinsToAdvertise }) => {
      const newSkinsToAdvertise = skinsToAdvertise.filter(({ asset_id }) => {
        console.log(asset_id)
        return asset_id !== paramAssetId
      })
      return { skinsToAdvertise: newSkinsToAdvertise }
    })
  },

  changeSkinToAdvertise: (
    paramAssetId: string,
    price: number,
    itsRented: boolean,
  ) => {
    set(({ skinsToAdvertise: oldSkinsToAdvertise }) => {
      const newChangedSkinsToAdvertise = oldSkinsToAdvertise.map((skin) => {
        if (skin.asset_id === paramAssetId) {
          return {
            ...skin,
            skin_price: price,
            sale_type: itsRented ? 'rent' : 'sale',
          }
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
