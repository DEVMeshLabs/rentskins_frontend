export interface IWalletUser {
  value: number | undefined | null
}

export interface IStates {
  wallet: IWalletUser
  itemsSoldOrRented: 'sold' | 'rented'
  setWallet: (wallet: string | number) => void
  setItemsSoldOrRented: (itemsSoldOrRented: 'sold' | 'rented') => void
}
