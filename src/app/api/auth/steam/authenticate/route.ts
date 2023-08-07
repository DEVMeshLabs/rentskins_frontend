import { NextResponse } from 'next/server'
import SteamAuth from 'node-steam-openid'

const steam = new SteamAuth({
  // Crie uma nova chave utilizando o domínio que está sendo utilizado (localhost
  // para produção / domínio para produto).
  // Link para o registro do site: https://steamcommunity.com/dev/registerkey.

  realm: `${process.env.NEXT_PUBLIC_URL}`, // Site name displayed to users on logon
  returnUrl: `${process.env.NEXT_PUBLIC_URL}/api/auth/steam/authenticate/callback`, // Your return route
  apiKey: 'CBED4D515E26D768D330CDDC83AB1AB2', // Steam API key
})

export async function GET() {
  const redirectUrl = await steam.getRedirectUrl()
  return NextResponse.redirect(redirectUrl)
}
