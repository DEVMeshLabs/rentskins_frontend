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
}: Props) {
  const formattedNumber = cash
    ? parseFloat(value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : value
  return (
    <div
      className={classNames(
        'flex w-full justify-between text-sm laptop:text-base',
        className,
      )}
    >
      <Common.Title color="white" bold={400}>
        {title}
      </Common.Title>
      <Common.Title color="white" bold={600}>
        {formattedNumber}
      </Common.Title>
    </div>
  )
}
