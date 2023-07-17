'use client'
import { LayoutRoot } from '@/components/Layout/LayoutRoot'
import { queryClient } from '@/services/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import 'aos/dist/aos.css'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  // eslint-disable-next-line no-undef
  children: React.ReactNode
}) {
  console.log('Made with 💙 by Mesh LABS team: https://www.meshlabs.site.')
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={`${inter.className} bg-[#151714]`}>
          <LayoutRoot>{children}</LayoutRoot>
        </body>
      </html>
    </QueryClientProvider>
  )
}
