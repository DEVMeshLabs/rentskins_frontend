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

  deleteSkinToAdvertise: (skinName: string) => {
    set(({ skinsToAdvertise }) => {
      const newSkinsToAdvertise = skinsToAdvertise.filter(
        ({ skin_name }) => skinName !== skin_name,
      )
      return { skinsToAdvertise: newSkinsToAdvertise }
    })
  },
}))

export default useSkinsStore
