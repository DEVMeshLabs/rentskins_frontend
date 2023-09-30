import Common from '@/components/Common'
import classNames from 'classnames'
import React from 'react'

interface IProps {
  label: {
    subtitle: string
    value: number
  }[]
  className?: string
  classNameSubtitle?: string
  classNameTitle?: string
  children?: React.ReactNode
}

export function ModalInfoSkin({
  label,
  className,
  classNameSubtitle,
  classNameTitle,
  children,
}: IProps) {
  return (
    <div
      className={classNames(
        'flex w-2/3 flex-col justify-between gap-6',
        className,
      )}
    >
      <div className="flex flex-col gap-4">
        {label.map(({ subtitle, value }, idx) => (
          <div key={`${label}-${idx}`}>
            <Common.Subtitle
              size="lg"
              bold={600}
              label={subtitle}
              className={classNames(
                'text-mesh-color-neutral-200',
                classNameSubtitle,
              )}
            />
            <Common.Title
              bold={700}
              className={classNames('text-3xl text-white', classNameTitle)}
            >
              {value.toLocaleString('pt-br', {
                currency: 'BRL',
                style: 'currency',
                minimumFractionDigits: 2,
              })}
            </Common.Title>
          </div>
        ))}
      </div>
      <div className={classNames('text-white')}>{children}</div>
    </div>
  )
}
