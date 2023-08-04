/* eslint-disable camelcase */
import { ISkins } from '@/interfaces/ISkins'
import create from 'zustand'
import {
  IPaymentRefound,
  PaymentMethodRefound,
} from './interfaces/components.interface'

interface IStates {
  paymentGeneralIndex: 0 | 1 | 2
  setPaymentGeneralIndex: (index: 0 | 1 | 2) => void
  paymentRetrieveIndex: 0 | 1
  setPaymentRetrieveIndex: (index: 0 | 1) => void
  paymentWithdrawIndex: 0 | 1 | 2 | 3
  setPaymentWithdrawIndex: (index: 0 | 1 | 2 | 3) => void
  profileTabValue: 'sales' | 'rented'
  setProfileTabValue: (value: 'sales' | 'rented') => void
  refoundGeneralIndex: 0 | 1 | 2 | 3
  setRefoundGeneralIndex: (index: 0 | 1 | 2 | 3) => void
  paymentRefound: { value: number; method: PaymentMethodRefound }
  setPaymentRefound: (paymentRefound: IPaymentRefound) => void
  pageSelectorIndex: number
  setPageSelectorIndex: (index: number) => void
  filterType: 0 | 1 | 2
  setFilterType: (type: 0 | 1 | 2) => void
  allSkinsCategory: ISkins[] | undefined
  setAllSkinsCategory: (skins: ISkins[]) => void

  isInventoryFetching: boolean
  setIsInventoryFetching: (isInventoryFetching: boolean) => void
}

const useComponentStore = create<IStates>((set) => ({
  paymentGeneralIndex: 0,
  setPaymentGeneralIndex: (index) => {
    set(() => ({ paymentGeneralIndex: index }))
  },

  paymentRetrieveIndex: 0,
  setPaymentRetrieveIndex: (index) => {
    set(() => ({ paymentRetrieveIndex: index }))
  },

  paymentWithdrawIndex: 0,
  setPaymentWithdrawIndex: (index) => {
    set(() => ({ paymentWithdrawIndex: index }))
  },

  refoundGeneralIndex: 0,
  setRefoundGeneralIndex: (index) => {
    set(() => ({ refoundGeneralIndex: index }))
  },

  profileTabValue: 'sales',
  setProfileTabValue: (value) => {
    set(() => ({ profileTabValue: value }))
  },

  paymentRefound: { value: 5, method: 'mastercard' },
  setPaymentRefound: (paymentRefound) => {
    set(() => ({ paymentRefound }))
  },

  pageSelectorIndex: 1,
  setPageSelectorIndex: (index) => {
    set(() => ({ pageSelectorIndex: index }))
  },

  filterType: 0,
  setFilterType: (type: 0 | 1 | 2) => {
    set(() => ({ filterType: type }))
  },

  allSkinsCategory: [],
  setAllSkinsCategory: (skins: ISkins[]) => {
    set(() => ({ allSkinsCategory: skins }))
  },

  isInventoryFetching: false,
  setIsInventoryFetching: (isInventoryFetching: boolean) => {
    set(() => ({ isInventoryFetching }))
  },
}))

export default useComponentStore
