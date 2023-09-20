import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  classname?: string
}

export function CardSkinModalRoot({ children, classname }: Props) {
  return <div className={classname}>{children}</div>
}
