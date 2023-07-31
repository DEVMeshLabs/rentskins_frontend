import React from 'react'
import Image from 'next/image'

interface IProps {
  image: string
}

export function NotificationImage({ image }: IProps) {
  return (
    <div className="flex items-center gap-4">
      <Image
        className="w-20 rounded-lg bg-mesh-color-neutral-1000 p-2"
        src={`https://steamcommunity-a.akamaihd.net/economy/image/${image}`}
        alt={String(image)}
        width={20}
        height={20}
      />
    </div>
  )
}
