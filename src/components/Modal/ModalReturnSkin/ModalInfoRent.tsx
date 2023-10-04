import Common from '@/components/Common'
import classNames from 'classnames'
import React from 'react'

interface IProps {
  label: {
    title: string
    subtitle: string
  }[]
  className?: string
  classNameSubtitle?: string
  classNameTitle?: string
  classNameDivTitles?: string
}

export function ModalInfoRent({
  label,
  className,
  classNameSubtitle,
  classNameTitle,
  classNameDivTitles,
}: IProps) {
  return (
    <div className={classNames('w-2/3 justify-between gap-6', className)}>
      <div className="flex gap-16">
        {label.map(({ title, subtitle }, idx) => (
          <div
            key={`${label}-${idx}`}
            className={classNames(classNameDivTitles)}
          >
            <Common.Subtitle
              size="xs"
              bold={600}
              label={title}
              className={classNames(
                'text-mesh-color-neutral-200',
                classNameTitle,
              )}
            />
            <Common.Title
              bold={700}
              className={classNames(
                'text-xs text-mesh-color-neutral-200',
                classNameSubtitle,
              )}
            >
              {subtitle}
            </Common.Title>
          </div>
        ))}
      </div>
    </div>
  )
}
