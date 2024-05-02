/* eslint-disable camelcase */
// @ts-nocheck
import ISteamUser from '@/interfaces/steam.interface'
import UserService from '@/services/user.service'
import JsonWebToken from '@/tools/jsonwebtoken.tool'
import moment from 'moment'
import NextAuth from 'next-auth'
import SteamProvider, { PROVIDER_ID } from 'next-auth-steam'
import { NextRequest } from 'next/server'

async function handler(
  req: NextRequest,
  ctx: {
    params: {
      nextauth: string[]
    }
  },
) {
  // @ts-ignore
  return NextAuth(req, ctx, {
    providers: [
      SteamProvider(req, {
        clientSecret: process.env.STEAM_SECRET!,
        callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback`,
      }),
    ],
    pages: {
      signIn: '/',
      signOut: '/',
      error: '/oops',
    },
    callbacks: {
      async signIn({ user, account, credentials, email, profile }) {
        const date = moment.unix(profile?.timecreated)
        const now = moment()
        const monthsDifference = now.diff(date, 'months')


        const verifyVAC = await UserService.verifyAccountStatus(user?.id!)

        if (monthsDifference <= 3) {
          return '/?error=InvalidAccountDate'
        }

        if (verifyVAC?.data) {
          return '/?error=SignInAccountVACBanned'
        }

        return user
      },
      jwt({ token, account, profile }) {
        if (account?.provider === PROVIDER_ID) {
          token.steam = profile
        }

        return token
      },
      async session({ session, token }) {
        if ('steam' in token) {
          const newToken = JsonWebToken.create(session)
          const decodeToken = JsonWebToken.decode(newToken)

          session.user!.token = JsonWebToken.create({
            ...decodeToken,
            ownerId: token.steam?.steamid!,
          })

          session.user!.steam = token.steam

          const verifyVAC = await UserService.verifyAccountStatus(
            session?.user?.steam?.steamid!,
          )

          const userAlreadyExists = await UserService.getUser(
            session?.user?.steam?.steamid!,
          )

          if (userAlreadyExists?.response?.status === 404) {
            await UserService.createUser(
              {
                owner_id: session?.user?.steam?.steamid!,
                owner_name: session?.user?.name!,
                picture: session?.user?.image!,
                owner_country: session?.user?.steam?.loccountrycode!,
                steam_url: session?.user?.steam?.profileurl!,
              },
              session?.user?.token!,
            )
          } else if (userAlreadyExists?.status === 200) {
            const { owner_name, picture, steam_url, id } =
              userAlreadyExists?.data

            if (
              owner_name !== session?.user?.name ||
              picture !== session?.user?.image ||
              steam_url !== session?.user?.steam?.profileurl
            ) {
              await UserService.updateUserById(id, session?.user?.token, {
                owner_name: session?.user?.name,
                steam_url: session?.user?.steam?.profileurl,
                picture: session?.user?.image,
              })
            }
          }

          session.user!.steam.banned = verifyVAC.data
        }

        return session as ISteamUser
      },
    },
  })
}

export { handler as GET, handler as POST }
//
