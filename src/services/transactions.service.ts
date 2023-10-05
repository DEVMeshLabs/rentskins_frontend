/* eslint-disable camelcase */
import { Api } from '@/providers'
import { AxiosPromise } from 'axios'
import { ITransaction } from './interfaces/transaction.interface'

interface IParamsCreateTransaction {
  skinsToBuy: {
    skin_id: string
    seller_id: string
    buyer_id: string
  }[]
  token: string
}

export default class TransactionsService {
  public static async getUserTransactions(steamid: string) {
    return (await Api.get(`/transaction/${steamid}`)
      .then((response) => response)
      .catch((e) => e)) as AxiosPromise<ITransaction[]>
  }

  public static async createTransaction({
    skinsToBuy,
    token,
  }: IParamsCreateTransaction) {
    return Api.post('/transaction', skinsToBuy, {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then((response) => response)
      .catch((e) => e) as AxiosPromise<ITransaction[]>
  }
}
