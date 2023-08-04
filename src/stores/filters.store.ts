import { ISkins } from '@/interfaces/ISkins'
import { create } from 'zustand'
import {
  IInputCheck,
  ISelectedFilters,
  IStates,
  TTypeSort,
} from './interfaces/filters.interface'
import { ITime } from '@/services/interfaces/notification.interface'

const useFilterStore = create<IStates>((set) => ({
  selectedFilters: {
    wears: [],
    categories: [],
    prices: { min: null, max: null },
  },

  allSkinsFiltred: [],
  setAllSkinsFiltred: (skins: ISkins[], typeSort: TTypeSort) => {
    const organized = {
      biggestPrice: (a: ISkins, b: ISkins) =>
        parseFloat(b.skin_price.replace(',', '.')) -
        parseFloat(a.skin_price.replace(',', '.')),
      lowestPrice: (a: ISkins, b: ISkins) =>
        parseFloat(a.skin_price.replace(',', '.')) -
        parseFloat(b.skin_price.replace(',', '.')),
      biggestFloat: (a: ISkins, b: ISkins) =>
        parseFloat(b.skin_float.replace(',', '.')) -
        parseFloat(a.skin_float.replace(',', '.')),
    }

    set(() => ({
      allSkinsFiltred:
        typeSort === undefined ? [] : skins.sort(organized[typeSort]),
    }))
  },

  typeFilter: undefined,
  setTypeFilter: (typeFilter) => set(() => ({ typeFilter })),

  setSelectedFilters: (selectedFilters: ISelectedFilters) => {
    set(() => ({ selectedFilters }))
  },

  cleanSelectedFilters: (filterCleaning: ISelectedFilters) => {
    set(() => ({ selectedFilters: filterCleaning }))
  },

  checkedInputCheckbox: [],
  setCheckedInputCheckbox: (inputCheckbox: IInputCheck | null) => {
    set(({ checkedInputCheckbox }) => ({
      checkedInputCheckbox: inputCheckbox
        ? [
            ...checkedInputCheckbox.filter(
              ({ value }) => value !== inputCheckbox.value,
            ),
            inputCheckbox,
          ]
        : [],
    }))
  },

  notificationFilter: 'tudo',
  setNotificationFilter: (notificationFilter: ITime) => {
    set(() => ({ notificationFilter }))
  },

  inventoryTypeFilter: [],
  setInventoryTypeFilter: (inventoryTypeFilter: string[]) => {
    set(() => ({ inventoryTypeFilter }))
  },

  sales: true,
  setSales: (checked: boolean) => {
    set(() => ({ sales: checked, rented: !checked }))
  },

  rented: false,
  setRented: (checked: boolean) => {
    set(() => ({ rented: checked, sales: !checked }))
  },
}))

export default useFilterStore
