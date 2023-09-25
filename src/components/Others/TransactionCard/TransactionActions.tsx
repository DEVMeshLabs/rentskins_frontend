import React from 'react'

interface IProps {
  children: React.ReactNode
}

export function TransactionActions({ children }: IProps) {
  return <div className="flex items-center gap-4"> {children}</div>
}
