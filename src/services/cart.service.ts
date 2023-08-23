import { Api } from '@/providers'
import { ICart } from './interfaces/cart.interface'

interface IPromise<T> {
  data: T
}

interface Test {
  status: number
}

export default class CartService {
  public static async getCart(userSteamId: string): Promise<IPromise<ICart>> {
    return Api.get(`/cart/buyer/${userSteamId}`)
      .then((response) => response)
      .catch((e) => e)
  }

  public static async deleteSkinFromCart(userSteamId: string) {
    return Api.delete(`/skincart/${userSteamId}`)
      .then((response) => response)
      .catch((e) => e)
  }

  public static async createSkinFromCart(
    skinId: string,
    cartId: string,
  ): Promise<IPromise<Test>> {
    return Api.post('/skincart', {
      cartId,
      skinId,
    })
      .then((response) => response)
      .catch((e) => e)
  }
}
