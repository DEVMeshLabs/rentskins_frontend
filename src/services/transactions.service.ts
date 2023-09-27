import { Api } from '@/providers'
import { AxiosPromise } from 'axios'

export default class TransactionsService {
  public static async getUserTransactions(steamid: string) {
    return (await Api.get(`/transaction/${steamid}`)
      .then((response) => response)
      .catch((e) => e)) as AxiosPromise<any>
  }
}
