import * as HoverCard from '@radix-ui/react-hover-card'
import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
  customTrigger?: ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export default function HoverCardInfo({
  children,
  customTrigger,
  side = 'top',
}: IProps) {
  return (
    <HoverCard.Root openDelay={0} closeDelay={0}>
      <HoverCard.Trigger asChild>
        {customTrigger || (
          <div
            className="flex h-8 w-8 select-none items-center
          justify-center rounded-full border-2 border-mesh-color-primary-1200 bg-mesh-color-others-eerie-black
          font-bold text-white opacity-60 transition-all hover:opacity-100"
          >
            ?
          </div>
        )}
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          side={side}
          className="z-50 max-w-[300px] rounded-md bg-mesh-color-neutral-100 px-4 py-2 drop-shadow-lg"
        >
          {children}
          <HoverCard.Arrow className="fill-mesh-color-neutral-100" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}
