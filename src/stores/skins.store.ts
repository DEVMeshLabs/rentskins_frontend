/* eslint-disable camelcase */
import { create } from 'zustand'
import { ISkinsStore } from './interfaces/skins.interface'
import { ISkinsToAdvertise } from '@/interfaces/ISkins'

const useSkinsStore = create<ISkinsStore>((set) => ({
  skinsToAdvertise: [],
  setSkinsToAdvertise: (skinToAdvertise: ISkinsToAdvertise) => {
    set(({ skinsToAdvertise: oldSkinsToAdvertise }) => ({
      skinsToAdvertise: [...oldSkinsToAdvertise, skinToAdvertise],
    }))
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
