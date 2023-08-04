import LayoutQueryProvider from '@/components/Layout/LayoutQueryProvider'
import { LayoutRoot } from '@/components/Layout/LayoutRoot'
import 'aos/dist/aos.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next/types'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rentskins',
  description: `Rentskins é a melhor plataforma para comprar, vender e alugar skins do CS:GO.
  Encontre skins raras e exclusivas para personalizar seu jogo.`,
}

export default function RootLayout({
  children,
  session,
}: {
  // eslint-disable-next-line no-undef
  children: React.ReactNode
  session: any
}) {
  return (
    <LayoutQueryProvider>
      <html lang="en">
        <body className={`${inter.className} bg-[#151714]`}>
          <LayoutRoot session={session}>{children}</LayoutRoot>
        </body>
      </html>
    </LayoutQueryProvider>
  )
}
