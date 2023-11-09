/* eslint-disable camelcase */
import {
  ISkins,
  ISkinsAvailability,
  ISkinsResponse,
  ISkinsToAdvertise,
} from '@/interfaces/ISkins'
import { Api } from '@/providers'
import { AxiosPromise, AxiosResponse } from 'axios'
import { IInventory } from './interfaces/inventory.interface'

export default class SkinService {
  public static findByAll(page?: number | string) {
    return Api.get<ISkinsResponse>(`/skins?page=${page || 1}`)
  }

  public static findById(id: string) {
    return Api.get<ISkins>(`/skins/${id}`)
  }

  public static findByWeapon(weapon: string) {
    return Api.get<ISkins[]>(`/skins/weapon/${weapon}`)
  }

  public static async findBySkinsInventory(steamid: string, token: string) {
    const response = await Api.get<IInventory>(`/skins/inventory/${steamid}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then((response) => response)
      .catch((e) => e)

    return response
  }

  public static findBySkinsInventoryWithFilters(
    steamid: string,
    token: string,
    filterType?: string[],
  ) {
    return Api.post<IInventory>(
      `/skins/inventory/${steamid}`,
      {
        filterType,
      },
      { headers: { Authorization: 'Bearer ' + token } },
    )
      .then((response) => response)
      .catch((e) => e)
  }

  public static findAllSkinsByWeapon(weapon: string) {
    return Api.get<ISkins[]>(`/skins/weapon/${weapon}`)
  }

  public static findAllSkinsByIdSeller(
    steamId: string,
    page?: number | string,
  ) {
    console.log(steamId)
    if (page) {
      return Api.get<ISkinsResponse>(
        `/skins/seller/user/${steamId}?page=${page}`,
      )
    } else {
      return Api.get<ISkinsResponse>(`/skins/seller/user/${steamId}`)
    }
  }

  public static async getItemAveragePrice(items: string[]) {
    return (await Api.post(`/skins/median/price`, {
      names: items,
    })
      .then((response) => response)
      .catch((e) => e)) as AxiosPromise<string[]>
  }

  public static findBySearchParameter(
    param: string,
    type: 'name' | 'category' | 'weapon',
  ) {
    return Api.get<ISkinsResponse>(`/skins/search/${param}?type=${type}`)
  }

  public static async postAllSkinsToAdvertise(
    allSkinsAdvertise: ISkinsToAdvertise[],
    token: string,
  ) {
    const skinsWithoutId = allSkinsAdvertise.filter((skin) => {
      return skin
    })

    const result: AxiosResponse<{ status: number }> = await Api.post<{
      status: number
    }>('/skins', skinsWithoutId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response)
      .catch((err) => err)

    return result
  }

  public static async postCheckItemAvailability(
    assetId: string,
    ownerId: string,
  ) {
    const result: AxiosResponse<ISkinsAvailability, any> = await Api.post(
      `/skins/availability/${ownerId}`,
      {
        assetid: assetId,
      },
    )
      .then((response) => response)
      .catch((e) => e)

    return result
  }

  public static async deleteById(id: string) {
    const result: AxiosResponse<any> = await Api.delete(`/skins/${id}`)
      .then((response) => response)
      .catch((e) => e)

    return result
  }

  public static async updateSkin(
    userName: string,
    userId: string,
    skinId: string,
    token: string,
  ) {
    const result: AxiosResponse<any> = await Api.put(
      `/skins/${skinId}`,
      {
        buyer_id: userId,
        buyer_name: userName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((response) => response)
      .catch((e) => e)

    return result
  }

  public static async updateEditSkin(
    skinId: string,
    skin_price: number,
    sale_type: string,
    token: string,
  ) {
    const result: AxiosResponse<any> = await Api.put(
      `/skins/${skinId}`,
      {
        skin_price,
        sale_type,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((response) => response)
      .catch((e) => e)

    return result
  }
}
