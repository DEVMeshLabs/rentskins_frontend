import { Api } from '@/providers'
import { AxiosPromise } from 'axios'
import { IStripeCreatePayment } from './interfaces/stripe.interface'

export default class StripeService {
  public static async createPayment(data: IStripeCreatePayment, token: string) {
    return (await Api.post(`/transaction`, data, {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then((response) => response)
      .catch((e) => e)) as AxiosPromise<any>

    console.log(result)

    return result
  }
}
