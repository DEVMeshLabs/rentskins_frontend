import React from 'react'

interface IProps {
  children: React.ReactNode
}

export default function TransactionsPendingRoot({ children }: IProps) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-mesh-color-neutral-800 px-4 py-3 text-white">
      {children}
    </div>
  )
}
