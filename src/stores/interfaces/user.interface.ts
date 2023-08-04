export interface IWalletUser {
  value: number | undefined | null
}

export interface IStates {
  wallet: IWalletUser
  setWallet: (wallet: string | number) => void
}
