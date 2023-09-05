import { Api } from '@/providers'
import { AxiosPromise } from 'axios'
import { IStripeCreatePayment } from './interfaces/stripe.interface'

export default class StripeService {
  public static async createPayment(data: IStripeCreatePayment, token: string) {
    const result: AxiosPromise<any> = await Api.post(`/transaction`, data, {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then((response) => response)
      .catch((e) => e)

    return result
  }

  public static async verifyPayment(paymentIntent: string) {}
}
