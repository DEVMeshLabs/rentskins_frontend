import { Api } from '@/providers/Api'
import JsonWebToken from '@/tools/jsonwebtoken.tool'
import { NextResponse } from 'next/server'
import queryString from 'query-string'

export async function GET(req: any, res: any) {
  const key = 'B8079E42FFC7D0C84CDA7D0A167544F8'
  const queries = queryString.parse(req.url!)

  const id = queries['openid.claimed_id']?.slice(
    queries['openid.claimed_id']?.lastIndexOf('/') + 1,
  )

  const {
    data: {
      response: { players },
    },
  } = await Api.get(
    `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${key}&steamids=${id}`,
  )

  if (players[0]) {
    const tokenData = {
      username: players[0].personaname,
      picture: players[0].avatarfull,
      steamid: players[0].steamid,
      profile: players[0].profileurl,
      country: players[0].loccountrycode,
    }

    const token = JsonWebToken.create(tokenData)

    return NextResponse.redirect(
      process.env.NEXT_PUBLIC_URL + '/?token=' + token,
    )
  } else {
    return NextResponse.redirect(
      process.env.NEXT_PUBLIC_URL + '/?token=auth_failed',
    )
  }
}
