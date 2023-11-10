import * as HoverCard from '@radix-ui/react-hover-card'
import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
  name: string
}

export default function HoverCardSticker({ children, name }: IProps) {
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
          <span className="">{name}</span>
          <HoverCard.Arrow className="fill-mesh-color-neutral-100" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}