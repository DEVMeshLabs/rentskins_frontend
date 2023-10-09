'use client'
import React from 'react'
import { ColorRing } from 'react-loader-spinner'

interface IProps {
  enabled: boolean
  label: string | null | undefined
  children: React.ReactNode
  widthLoading?: number
  heightLoading?: number
  className?: string
}

export function LayoutLoading({
  enabled,
  className,
  label,
  children,
  heightLoading = 100,
  widthLoading = 100,
}: IProps) {
  const renderLoading = () => {
    if (enabled) {
      return (
        <div
          className={`mx-auto flex w-full flex-col items-center justify-center ${className}`}
        >
          <ColorRing
            width={widthLoading}
            height={heightLoading}
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
