import Common from '@/components/Common'
import classNames from 'classnames'

interface Props {
  title: string
  value: string
  className?: string
  size?: 'base' | 'lg'
}

export default function LineInfosSummaryh({
  title,
  value,
  className,
  size = 'base',
}: Props) {
  return (
    <div className={classNames('flex w-full justify-between', className)}>
      <Common.Title color="white" size={size} bold={400}>
        {title}
      </Common.Title>
      <Common.Title color="white" size={size} bold={600}>
        {!value.includes('%') && 'R$'}
        {value}
      </Common.Title>
    </div>
  )
}
