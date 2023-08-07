import { Api } from '@/providers'
import { IWalletUser } from './interfaces/wallet.interface'

export default class WalletService {
  public static getAllWallets() {
    return Api.get<IWalletUser[]>('/wallet')
  }

  public static async getWalletBySteamID(steamid: string) {
    return Api.get<IWalletUser | boolean>(`/wallet/user/${steamid}`)
      .then((response) => response)
      .catch((e) => e)
  }

  public static async createEmptyWallet(username: string, steamid: string) {
    const user = await this.getWalletBySteamID(steamid)

    if (!user.data) {
      return Api.post('/wallet', {
        owner_name: username,
        owner_id: steamid,
      })
        .then(() => this.getWalletBySteamID(steamid))
        .catch((e) => e)
    } else {
      return { message: 'User wallet already exists' }
    }
  }

  public static async updateWallet(
    username: string,
    steamid: string,
    value: string | number,
  ) {
    const user = await this.getWalletBySteamID(steamid)

    if (user) {
      return Api.patch(`/wallet/${user.data.id}`, {
        owner_name: username,
        owner_id: steamid,
        value,
      })
    }
  }

  public static async deleteWallet(steamid: string) {
    const user = await this.getWalletBySteamID(steamid)

    if (user) {
      return Api.delete(`/wallet/${user.data.id}`)
    }
  }
}
