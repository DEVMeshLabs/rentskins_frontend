import React from 'react'
import Image, { StaticImageData } from 'next/image'

interface IProps {
  image: string | StaticImageData
}

export function NotificationImage({ image }: IProps) {
  return (
    <div className="flex items-center gap-4">
      <Image
        className="w-20 rounded-lg bg-mesh-color-neutral-1000 p-2"
        src={image}
        alt={String(image)}
      />
    </div>
  )
}
