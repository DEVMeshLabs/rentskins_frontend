import Common from '@/components/Common'
import classNames from 'classnames'

interface Props {
  title: string
  value: string
  cash?: boolean
  className?: string
  size?: 'base' | 'lg'
}

export default function LineInfosSummaryh({
  title,
  value,
  className,
  cash = false,
  size = 'base',
}: Props) {
  const formattedNumber = cash
    ? parseFloat(String(+value - 0.05 * 100)).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : value
  return (
    <div className={classNames('flex w-full justify-between', className)}>
      <Common.Title color="white" size={size} bold={400}>
        {title}
      </Common.Title>
      <Common.Title color="white" size={size} bold={600}>
        {formattedNumber}
      </Common.Title>
    </div>
  )
}
