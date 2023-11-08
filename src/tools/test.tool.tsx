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
}
