'use client'
import { LayoutRoot } from '@/components/Layout/LayoutRoot'
import { queryClient } from '@/services/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import 'aos/dist/aos.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next/types'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rentskins',
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
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={`${inter.className} bg-[#151714]`}>
          <LayoutRoot session={session}>{children}</LayoutRoot>
        </body>
      </html>
    </QueryClientProvider>
  )
}
