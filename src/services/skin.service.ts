import { ISkins } from '@/interfaces/ISkins'
import { Api } from '@/providers'

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
  ) {
    return Api.post(`/skins/inventory/${steamid}`, {
      filterType,
      page,
      itemsPerPage,
    })
  }

  public static findAllSkinsByWeapon(weapon: string) {
    return Api.get<ISkins[]>(`/skins/weapon/${weapon}`)
  }

  public static findBySearchParameter(param: string) {
    return Api.get<ISkins[]>(`/skins/search/${param}`)
  }
}
