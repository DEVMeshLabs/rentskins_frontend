export default class SteamService {
  public static redirect() {
    window.location.replace(
      `${process.env.NEXT_PUBLIC_URL}/api/auth/steam/authenticate/`,
      // 'http://localhost:3001/auth/steam/authenticate',
    )
  }
}
