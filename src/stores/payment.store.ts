import create from 'zustand'
import {
  IPayment,
  IStates,
  IWithdrawInfo,
} from './interfaces/payment.interface'

const usePaymentStore = create<IStates>((set) => ({
  paymentRetrieve: { value: 0, method: 'mastercard' },
  setPaymentRetrieve: (paymentRetrieve: IPayment) => {
    set(() => ({ paymentRetrieve }))
  },

  paymentWithdrawInfo: { selectedValue: 0 },
  setPaymentWithdrawInfo: (paymentWithdrawInfo: IWithdrawInfo) => {
    set(() => ({ paymentWithdrawInfo }))
  },
}))

export default usePaymentStore
