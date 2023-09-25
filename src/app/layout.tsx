import LayoutQueryProvider from '@/components/Layout/LayoutQueryProvider'
import { LayoutRoot } from '@/components/Layout/LayoutRoot'
import 'aos/dist/aos.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next/types'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

interface ILayoutRootProps {
  // eslint-disable-next-line no-undef
  children: React.ReactNode
  session: any
}

export const metadata: Metadata = {
  title: 'Rentskins',
  description: `Rentskins é a melhor plataforma para comprar, vender e alugar skins do CS:GO. Encontre skins raras e exclusivas para personalizar seu jogo.`,
}

export default function RootLayout({ children, session }: ILayoutRootProps) {
  return (
    <LayoutQueryProvider>
      <html lang="en">
        <body className={`${inter.className} bg-[#151714]`}>
          <Toaster />
          <LayoutRoot session={session}>{children}</LayoutRoot>
        </body>
      </html>
    </LayoutQueryProvider>
  )
}
