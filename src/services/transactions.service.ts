/* eslint-disable camelcase */
import { Api } from '@/providers'
import { AxiosPromise } from 'axios'
import { ITransaction } from './interfaces/transaction.interface'

export default class TransactionsService {
  public static async getUserTransactions(steamid: string) {
    return (await Api.get(`/transaction/${steamid}`)
      .then((response) => response)
      .catch((e) => e)) as AxiosPromise<ITransaction[]>
  }

  public static async createTransaction(
    skin_id: string,
    seller_id: string,
    buyer_id: string,
    token: string,
  ) {
    return Api.post(
      '/transaction',
      {
        skin_id,
        seller_id,
        buyer_id,
      },
      {
        headers: { Authorization: 'Bearer ' + token },
      },
    )
      .then((response) => response)
      .catch((e) => e) as AxiosPromise<ITransaction[]>
  }
}
