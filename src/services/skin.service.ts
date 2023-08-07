import { ISkins, ISkinsToAdvertise } from '@/interfaces/ISkins'
import { Api } from '@/providers'
import { IInventory } from './interfaces/inventoryy.interface'

export default class SkinService {
  public static findByAll() {
    return Api.get<ISkins[]>('/skins')
  }

  public static findById(id: string) {
    return Api.get(`/skins/${id}`)
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
    console.log(filterType)
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

  public static findBySearchParameter(param: string) {
    return Api.get<ISkins[]>(`/skins/search/${param}`)
  }

  public static postAllSkinsToAdvertise(
    allSkinsAdvertise: ISkinsToAdvertise[],
  ) {
    const skinsWithoudId = allSkinsAdvertise.filter((skin) => {
      delete skin.id
      return skin
    })
    return Api.post<{ status: number }>('/skins', skinsWithoudId)
  }
}
