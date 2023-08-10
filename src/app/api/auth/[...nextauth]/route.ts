import ISteamUser from '@/interfaces/steam.interface'
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
      session({ session, token }) {
        if ('steam' in token) {
          // @ts-expect-error
          session.user.steam = token.steam
          const newToken = JsonWebToken.create(session)
          // @ts-ignore
          session.user!.token = newToken
        }

        return session as ISteamUser
      },
    },
  })
}

export { handler as GET, handler as POST }
//
