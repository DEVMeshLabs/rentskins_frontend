/* eslint-disable camelcase */
import create from 'zustand'
import {
  PaymentMethodRefound,
  IPaymentRefound,
} from './interfaces/components.interface'
import { ISkins } from '@/interfaces/ISkins'

interface IStates {
  paymentGeneralIndex: 0 | 1 | 2
  setPaymentGeneralIndex: (index: 0 | 1 | 2) => void
  paymentRetrieveIndex: 0 | 1
  setPaymentRetrieveIndex: (index: 0 | 1) => void
  paymentWithdrawIndex: 0 | 1 | 2 | 3
  setPaymentWithdrawIndex: (index: 0 | 1 | 2 | 3) => void
  settingsIndex: 0 | 1 | 2
  setSettingsIndex: (index: 0 | 1 | 2) => void
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
  skinsFiltredByPrice: ISkins[]
  setSkinsFiltredByPrice: (minPrice: number, maxPrice: number) => void
  skinsFiltredByWear: ISkins[]
  setSkinsFiltredByWear: (...wears: string[]) => void
  skinsFiltredByCategory: ISkins[]
  setSkinsFiltredByCategory: (...categories: string[]) => void
  allSkinsFiltred: ISkins[]
  setAllSkinsFiltred: () => void
  allSkinsCategory: ISkins[] | undefined
  setAllSkinsCategory: (skins: ISkins[]) => void
  setCleanFilter: (selectedArray: string) => void
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

  settingsIndex: 0,
  setSettingsIndex: (index) => {
    set(() => ({ settingsIndex: index }))
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

  skinsFiltredByPrice: [],
  setSkinsFiltredByPrice: (minPrice: number, maxPrice: number) => {
    set(({ allSkinsCategory }) => ({
      skinsFiltredByPrice: allSkinsCategory?.filter(
        ({ skin_price }) =>
          +skin_price.replace(',', '.') >= minPrice &&
          +skin_price.replace(',', '.') <= maxPrice,
      ),
    }))
  },

  skinsFiltredByWear: [],
  setSkinsFiltredByWear: (...wears: string[]) => {
    set(({ allSkinsCategory }) => ({
      skinsFiltredByWear: allSkinsCategory?.filter(({ status_float }) =>
        wears.includes(status_float),
      ),
    }))
  },

  skinsFiltredByCategory: [],
  setSkinsFiltredByCategory: (...categories: string[]) => {
    set(({ allSkinsCategory }) => ({
      skinsFiltredByCategory: allSkinsCategory?.filter(({ skin_name }) => {
        let isCategory = false
        categories.forEach(
          (category) => (isCategory = skin_name.includes(category)),
        )
        return isCategory
      }),
    }))
  },

  allSkinsFiltred: [],
  setAllSkinsFiltred: () => {
    set(
      ({ skinsFiltredByCategory, skinsFiltredByPrice, skinsFiltredByWear }) => {
        const destructuredArray = [
          ...new Set([
            ...skinsFiltredByCategory,
            ...skinsFiltredByPrice,
            ...skinsFiltredByWear,
          ]),
        ]
        const finalArray1: ISkins[] = []
        const finalArray2: ISkins[] = []
        const finalArray3: ISkins[] = []

        if (skinsFiltredByCategory.length) {
          finalArray1.push(
            ...destructuredArray.filter((item) =>
              skinsFiltredByCategory.includes(item),
            ),
          )
        }

        if (skinsFiltredByPrice.length) {
          if (finalArray1.length) {
            finalArray2.push(
              ...finalArray1.filter((item) =>
                skinsFiltredByPrice.includes(item),
              ),
            )
          } else {
            finalArray2.push(
              ...destructuredArray.filter((item) =>
                skinsFiltredByPrice.includes(item),
              ),
            )
          }
        }

        if (skinsFiltredByWear.length) {
          if (finalArray2.length) {
            finalArray3.push(
              ...finalArray2.filter((item) =>
                skinsFiltredByWear.includes(item),
              ),
            )
          } else if (finalArray1.length) {
            finalArray3.push(
              ...finalArray1.filter((item) =>
                skinsFiltredByWear.includes(item),
              ),
            )
          } else {
            finalArray3.push(
              ...destructuredArray.filter((item) =>
                skinsFiltredByWear.includes(item),
              ),
            )
          }
        }

        return {
          allSkinsFiltred: [
            ...new Set([...finalArray1, ...finalArray2, ...finalArray3]),
          ],
        }
      },
    )
  },

  setCleanFilter: (selectedArray: string) => {
    set(() => ({ [selectedArray]: [] }))
  },

  allSkinsCategory: [],
  setAllSkinsCategory: (skins: ISkins[]) => {
    set(() => ({ allSkinsCategory: skins }))
  },
}))

export default useComponentStore
