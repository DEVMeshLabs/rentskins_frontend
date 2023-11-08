import Home from '@/app/page'
import { TestTools } from '@/tools/test.tool'
import { useQuery } from '@tanstack/react-query'
import { screen } from '@testing-library/react'

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react')
  const mockSession = {
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
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: 'authenticated' }
    }),
  }
})

export function useCustomHook() {
  return useQuery({
    queryKey: ['allSkins'],
    queryFn: () => 'Hello',
    retry: false,
  })
}

describe('<Home />', () => {
  beforeEach(() => {
    TestTools.customRender(<Home />)
  })

  it('Deverá renderizar o título principal.', async () => {
    // const container = TestTools.customRender(<Home />)

    const topTitle = screen.getByText(/Descubra o mundo das skins de/i)
    const bottomTitle = screen.getByText(/Counter-Strike/i)

    expect(topTitle && bottomTitle).toBeTruthy()
  })

  it('Deverá renderizar a imagem de fundo correta.', () => {
    const image = screen.getByTestId('home-hero')

    expect(image).toBeDefined()
    expect(image.className).toContain(
      'bg-mesh-image-hero' && 'bg-cover' && 'bg-center' && 'bg-no-repeat',
    )
  })

  // it('Deverá renderizar a lista de itens.', async () => {
  //   // const container = TestTools.customRender(<Home />)
  //   const container = TestTools.customRender(<Home />)

  //   const { result } = renderHook(() => useCustomHook())

  //   await (await waitFor(() => expect(result.current.isSuccess))).toBe(true)
  // })
})
