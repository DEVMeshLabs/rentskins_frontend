'use client'
import React from 'react'
import { ColorRing } from 'react-loader-spinner'

interface IProps {
  enabled: boolean
  label: string
  children: React.ReactNode
  className?: string
}

export function LayoutLoading({ enabled, className, label, children }: IProps) {
  const renderLoading = () => {
    if (enabled) {
      return (
        <div
          className={`mx-auto flex w-full flex-col items-center justify-center ${className}`}
        >
          <ColorRing
            width={100}
            height={100}
            colors={['#A6CF2B', '#A6CF2B', '#A6CF2B', '#A6CF2B', '#A6CF2B']}
          />
          <span className="text-2xl font-semibold text-white">{label}</span>
        </div>
      )
    } else {
      return children
    }
  }

  return <>{renderLoading()}</>
}
