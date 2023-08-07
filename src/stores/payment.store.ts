import create from 'zustand'
import {
  IPayment,
  IStates,
  IWithdrawInfo,
} from './interfaces/payment.interface'

const usePaymentStore = create<IStates>((set) => ({
  paymentAdd: { value: 5, method: 'mastercard' },
  setPaymentAdd: (paymentAdd: IPayment) => {
    set(() => ({ paymentAdd }))
  },

  paymentRetrieve: { value: 0, method: 'mastercard' },
  setPaymentRetrieve: (paymentRetrieve: IPayment) => {
    set(() => ({ paymentRetrieve }))
  },

  paymentWithdrawInfo: {},
  setPaymentWithdrawInfo: (paymentWithdrawInfo: IWithdrawInfo) => {
    set(() => ({ paymentWithdrawInfo }))
  },
}))

export default usePaymentStore
