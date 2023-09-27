import { Api } from '@/providers'
import { AxiosPromise } from 'axios'
import { ITransaction } from './interfaces/transactions.interface'

export default class TransactionsService {
  public static async getUserTransactions(steamid: string) {
    return (await Api.get(`/transaction/${steamid}`)
      .then((response) => response)
      .catch((e) => e)) as AxiosPromise<ITransaction[]>
  }
}
