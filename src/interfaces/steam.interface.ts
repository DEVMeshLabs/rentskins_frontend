export default interface ISteamUser {
  user?: {
    name?: string
    email?: string
    image?: string
    steam?: {
      steamid?: string
      communityvisibilitystate?: number
      profilestate?: number
      personaname?: string
      profileurl?: string
      avatar?: string
      avatarmedium?: string
      avatarfull?: string
      avatarhash?: string
      personastate?: number
      realname?: string
      primaryclanid?: string
      timecreated?: number
      personastateflags?: number
      loccountrycode?: string
      locstatecode?: string
    }
    token?: string
  }
  expires: string
}
