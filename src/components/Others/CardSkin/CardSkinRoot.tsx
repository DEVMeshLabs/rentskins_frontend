import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  classname?: string
}

export function CardSkinRoot({ children, classname }: Props) {
  return <div className={classname}>{children}</div>
}
