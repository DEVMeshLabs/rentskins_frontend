import { Api } from '@/providers'
import { ICart } from './interfaces/cart.interface'

interface IPromise<T> {
  data: T
}

export default class CartService {
  public static async getCart(userSteamId: string): Promise<IPromise<ICart>> {
    return Api.get(`/cart/buyer/${userSteamId}`)
      .then((response) => response)
      .catch((e) => e)
  }
}
