import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { ReactNode } from 'react'

export class TestTools {
  public static customRender(children: ReactNode) {
    return render(
      <QueryClientProvider client={new QueryClient()}>
        {children}
      </QueryClientProvider>,
    )
  }

  public static async nextAuthSession() {
    return {
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
      user: {
        name: 'Z3ik3n',
        email: '76561198195920183@steamcommunity.com',
        image:
          'https://avatars.steamstatic.com/05a9cf68ec687ff30c71cf9ba7d35098f0f49969_full.jpg',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiLjgrzjgqQgWjPOucaZM8mzICDjgrHjg7MiLCJlbWFpbCI6Ijc2NTYxMTk4MTk1OTIwMTgzQHN0ZWFtY29tbXVuaXR5LmNvbSIsImltYWdlIjoiaHR0cHM6Ly9hdmF0YXJzLnN0ZWFtc3RhdGljLmNvbS8wNWE5Y2Y2OGVjNjg3ZmYzMGM3MWNmOWJhN2QzNTA5OGYwZjQ5OTY5X2Z1bGwuanBnIn0sImV4cGlyZXMiOiIyMDIzLTEyLTA4VDE2OjA3OjU3LjM4MFoiLCJpYXQiOjE2OTk0NTk2NzcsIm93bmVySWQiOiI3NjU2MTE5ODE5NTkyMDE4MyJ9.x1VTnpZpcUIksGDXLWR7AoRNqvzZ71bdZWKsMzvyZDw',
        steam: {
          steamid: '76561198195920183',
          communityvisibilitystate: 3,
          profilestate: 1,
          personaname: 'Z3ik3n',
          profileurl: 'https://steamcommunity.com/id/z3ik3n/',
          avatar:
            'https://avatars.steamstatic.com/05a9cf68ec687ff30c71cf9ba7d35098f0f49969.jpg',
          avatarmedium:
            'https://avatars.steamstatic.com/05a9cf68ec687ff30c71cf9ba7d35098f0f49969_medium.jpg',
          avatarfull:
            'https://avatars.steamstatic.com/05a9cf68ec687ff30c71cf9ba7d35098f0f49969_full.jpg',
          avatarhash: '05a9cf68ec687ff30c71cf9ba7d35098f0f49969',
          personastate: 0,
          realname: 'Tiago Braga Costa',
          primaryclanid: '103582791429521408',
          timecreated: 1431216065,
          personastateflags: 0,
          loccountrycode: 'BR',
          locstatecode: '21',
          banned: false,
        },
      },
    }
  }
}
