import ISteamUser from '@/interfaces/steam.interface'
import JsonWebToken from '@/tools/jsonwebtoken.tool'
import NextAuth from 'next-auth'
import SteamProvider, { PROVIDER_ID } from 'next-auth-steam'
import { NextRequest } from 'next/server'

// export const authOptions: NextAuthOptions = {
//   // your configs
//   providers: [SteamProvider(req, {})],
//   secret: process.env.NEXTAUTH_SECRET,
//   // pages: {
//   //   signIn: '/',
//   //   signOut: '/',
//   //   error: '/', // Error code passed in query string as ?error=
//   //   verifyRequest: '/', // (used for check email message)
//   //   newUser: '/', // New users will be directed here on first sign in (leave the property out if not of interest)
//   // },
// }
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
        callbackUrl: 'http://localhost:3000/api/auth/callback',
      }),
    ],
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
