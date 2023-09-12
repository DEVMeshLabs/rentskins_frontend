import { Api } from '@/providers'
import { AxiosPromise } from 'axios'
import {
  IStripeCreatePayment,
  IStripeCreatePaymentResponse,
} from './interfaces/stripe.interface'

export default class StripeService {
  public static async createPayment(data: IStripeCreatePayment, token: string) {
    const result = (await Api.post(`/transaction`, data, {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then((response) => response)
      .catch((e) => e)) as AxiosPromise<IStripeCreatePaymentResponse>

    return await result
  }

  public static async verifyPayment(id: string) {
    return (await Api.get(`/transaction/${id}`)
      .then((response) => response)
      .catch((e) => e)) as AxiosPromise<any>
  }
}
