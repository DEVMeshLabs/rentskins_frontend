import ISteamUser from '@/interfaces/steam.interface'
import UserService from '@/services/user.service'
import JsonWebToken from '@/tools/jsonwebtoken.tool'
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
      jwt({ token, account, profile }) {
        if (account?.provider === PROVIDER_ID) {
          token.steam = profile
        }

        return token
      },
      async session({ session, token }) {
        if ('steam' in token) {
          const newToken = JsonWebToken.create(session)
          // @ts-ignore
          session.user!.token = newToken
          // @ts-expect-error
          session.user!.steam = token.steam

          const verifyVAC = await UserService.verifyAccountStatus(
            // @ts-expect-error
            session?.user?.steam?.steamid!,
          )

          // @ts-expect-error
          session.user!.steam.banned = verifyVAC.data
        }

        return session as ISteamUser
      },
    },
  })
}

export { handler as GET, handler as POST }
//
