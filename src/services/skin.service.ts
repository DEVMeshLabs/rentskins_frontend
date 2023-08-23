import { ISkins, ISkinsResponse, ISkinsToAdvertise } from '@/interfaces/ISkins'
import { Api } from '@/providers'
import { IInventory } from './interfaces/inventoryy.interface'

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

  public static findBySkinsInventory(
    steamid: string,
    filterType: string[],
    page: number,
    itemsPerPage: number,
    token: string,
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

  public static findAllSkinsByIdSeller(sellerId: string) {
    return Api.get<ISkins[]>(`/skins/seller/user/${sellerId}`)
  }

  public static findBySearchParameter(param: string, page?: number | string) {
    return Api.get<ISkinsResponse>(`/skins/search/${param}?page=${page || 1}`)
  }

  public static postAllSkinsToAdvertise(
    allSkinsAdvertise: ISkinsToAdvertise[],
    token: string,
  ) {
    const skinsWithoudId = allSkinsAdvertise.filter((skin) => {
      delete skin.id
      return skin
    })
    return Api.post<{ status: number }>('/skins', skinsWithoudId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
}
