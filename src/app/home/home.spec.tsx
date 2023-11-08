import { TestTools } from '@/tools/tests/testTools.tool'
import { useQuery } from '@tanstack/react-query'
import { screen } from '@testing-library/react'
import Home from './page'

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react')
  const mockSession = TestTools.nextAuthSession()
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
