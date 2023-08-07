// eslint-disable-next-line prettier/prettier
import { ISkins } from '@/interfaces/ISkins';
import { ITime } from '@/services/interfaces/notification.interface'

export interface ISelectedFilters {
  prices: { min: number | null; max: number | null }
  categories: string[] | null
  wears: string[] | null
}

export type TTypeSort =
  | 'biggestPrice'
  | 'lowestPrice'
  | 'biggestFloat'
  | undefined

export interface IInputCheck {
  value: string
  checked: boolean
}

export interface IStates {
  selectedFilters: ISelectedFilters
  setSelectedFilters: (selectedFilters: ISelectedFilters) => void
  allSkinsFiltred: ISkins[]
  setAllSkinsFiltred: (skins: ISkins[], typeSort: TTypeSort) => void
  typeFilter: TTypeSort
  setTypeFilter: (typeFilter: TTypeSort) => void
  checkedInputCheckbox: IInputCheck[]
  setCheckedInputCheckbox: (inputCheckbox: IInputCheck | null) => void
  notificationFilter: ITime
  setNotificationFilter: (value: ITime) => void
  inventoryTypeFilter: string[]
  setInventoryTypeFilter: (value: string[]) => void
  cleanSelectedFilters: (filterCleaning: ISelectedFilters) => void
}
