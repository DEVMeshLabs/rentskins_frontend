import { ITime } from '@/services/interfaces/notification.interface'
import { create } from 'zustand'
import {
  IInputCheck,
  ISelectedFilters,
  IStates,
  TTypeSort,
} from './interfaces/filters.interface'

const useFilterStore = create<IStates>((set) => ({
  selectedFilters: {
    wears: [],
    categories: [],
    prices: { min: undefined, max: undefined },
  },

  typeFilter: 'default',
  setTypeFilter: (typeFilter: TTypeSort) => set(() => ({ typeFilter })),

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
}))

export default useFilterStore
