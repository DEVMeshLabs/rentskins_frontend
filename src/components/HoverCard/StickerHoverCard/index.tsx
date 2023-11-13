import * as HoverCard from '@radix-ui/react-hover-card'
import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
  name: string
  value: string
  isValueLoading: boolean
}

export default function HoverCardSticker({
  children,
  name,
  value,
  isValueLoading,
}: IProps) {
  const formattedName = 'Sticker%20|%20' + name.replaceAll(/\s/g, '%20')
  const url = 'https://steamcommunity.com/market/listings/730/' + formattedName

  return (
    <HoverCard.Root openDelay={0} closeDelay={0}>
      <HoverCard.Trigger asChild>
        <a href={url} target="_blank" rel="noreferrer noopener">
          {children}
        </a>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          side="top"
          className="z-50 rounded-md bg-mesh-color-neutral-100 px-4 py-2 drop-shadow-lg"
        >
          <div className="flex flex-col items-center justify-center text-center">
            <div>{name}</div>
            <div>
              {!isValueLoading ? (
                value
              ) : (
                <div className="h-6 w-16 animate-pulse rounded-lg bg-mesh-color-neutral-200" />
              )}
            </div>
          </div>
          <HoverCard.Arrow className="fill-mesh-color-neutral-100" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}
