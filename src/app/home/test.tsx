import { render } from '@testing-library/react'

import Home from './page'

describe('<Home />', () => {
  it('Deve renderizar o título principal.', () => {
    const container = render(<Home searchParams={{ sellerid: '0' }} />)

    container.findAllByText('Descubra o mundo das skins de Counter-Strike')

    expect(container).toBeDefined()
  })
})
