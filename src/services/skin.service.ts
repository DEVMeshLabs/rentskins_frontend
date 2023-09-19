import {
  ISkins,
  ISkinsAvailability,
  ISkinsResponse,
  ISkinsToAdvertise,
} from '@/interfaces/ISkins'
import { Api } from '@/providers'
import axios, { AxiosPromise, AxiosResponse } from 'axios'
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

  public static findBySkinsInventory(steamid: string, token: string) {
    return Api.get<IInventory>(`/skins/inventory/${steamid}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
  }

  public static findBySkinsInventoryWithFilters(
    steamid: string,
    token: string,
    filterType?: string[],
    page?: number,
    itemsPerPage?: number,
  ) {
    return Api.post<IInventory>(
      `/skins/inventory/${steamid}`,
      {
        filterType,
        page,
        itemsPerPage,
      },
      { headers: { Authorization: 'Bearer ' + token } },
    )
  }

  public static findAllSkinsByWeapon(weapon: string) {
    return Api.get<ISkins[]>(`/skins/weapon/${weapon}`)
  }

  public static findAllSkinsByIdSeller(
    sellerId: string,
    page?: number | string,
  ) {
    if (page) {
      return Api.get<ISkinsResponse>(
        `/skins/seller/user/${sellerId}?page=${page}`,
      )
    } else {
      return Api.get<ISkinsResponse>(`/skins/seller/user/${sellerId}`)
    }
  }

  public static findBySearchParameter(param: string, page?: number | string) {
    return Api.get<ISkinsResponse>(`/skins/search/${param}?page=${page || 1}`)
  }

  public static async getPriceHistory(itemName: string) {
    return (await axios
      .get(
        `https://steamcommunity.com/market/pricehistory/?country=BR&currency=3&appid=730&market_hash_name=${itemName}`,
      )
      .then((response) => response)
      .catch((e) => e)) as AxiosPromise<any>
  }

  public static async postAllSkinsToAdvertise(
    allSkinsAdvertise: ISkinsToAdvertise[],
    token: string,
  ) {
    const skinsWithoutId = allSkinsAdvertise.filter((skin) => {
      delete skin.id
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
}
