/* eslint-disable camelcase */
import { ISkins, ISteamItens } from '@/interfaces/ISkins'

export function filterSkinsToInventory(
  steamSkins: ISteamItens[],
  dataSkins: ISkins[],
): ISteamItens[] {
  return steamSkins.filter(
    ({ assetid }) => !dataSkins.some(({ asset_id }) => asset_id === assetid),
  )
}
