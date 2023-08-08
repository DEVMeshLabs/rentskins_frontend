'use client'

import { queryClient } from '@/services/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

interface IProps {
  children: React.ReactNode
}

export default function LayoutQueryProvider({ children }: IProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
