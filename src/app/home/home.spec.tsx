import { TestTools } from '@/tools/tests/testTools.tool'
import Home from './page'

TestTools.startNextAuth()

describe('<Home />', () => {
  it('Deve renderizar o título principal.', async () => {
    const container = TestTools.customRender(<Home />)

    const topTitle = container.getByText(/Descubra o mundo das skins de/i)
    const bottomTitle = container.getByText(/Counter-Strike/i)

    expect(topTitle && bottomTitle).toBeTruthy()
  })
})
