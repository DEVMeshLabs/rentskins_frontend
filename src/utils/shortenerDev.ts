import { Shortener } from '@/providers'

export async function shortenUrl(longUrl: string) {
  try {
    const response = await Shortener.post(
      '/encurtamentos',
      {
        url: longUrl,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return response.data.urlEncurtada
  } catch (error) {
    console.error('Erro ao encurtar URL:', error)
    return null
  }
}
