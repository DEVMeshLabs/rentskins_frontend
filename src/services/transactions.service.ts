import { Api } from '@/providers'
import { AxiosPromise } from 'axios'
import { ITransaction } from './interfaces/transactions.interface'

export default class TransactionsService {
  public static async getUserTransactions(steamid: string) {
    return (await Api.get(`/transaction/${steamid}`)
      .then((response) => response)
      .catch((e) => e)) as AxiosPromise<ITransaction[]>
  }

  public static async updateUserTransaction(
    id: string,
    type: 'buyer' | 'seller',
    response: 'Aceito' | 'Recusado',
  ) {
    return (await Api.patch(`/transaction/${id}?query=${type}`, {
      status: response,
    })
      .then((response) => response)
      .catch((e) => e)) as AxiosPromise<ITransaction[]>
  }
}
