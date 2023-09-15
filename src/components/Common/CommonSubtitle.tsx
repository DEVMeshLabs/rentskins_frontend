import classNames from 'classnames'

interface IProps {
  label: string
  className?: string
  size?: 'sm' | 'md' | 'xs' | 'lg' | 'xl' | '2xl' | '3xl' | 'base'
  color?: 'white' | 'green' | 'cinza' | 'red' | 'black' | 'dark/6'
  bold?: 100 | 400 | 500 | 600 | 700 | 800 | 900
}

export function CommonSubtitle({
  label,
  size = 'md',
  color = 'black',
  className,
  bold = 400,
}: IProps) {
  return (
    <div
      className={classNames(
        {
          'text-white': color === 'white',
        },
        {
          'text-mesh-color-primary-1200': color === 'green',
        },
        {
          'text-mesh-color-neutral-300': color === 'cinza',
        },
        {
          'text-xs': size === 'xs',
        },
        {
          'text-base': size === 'base',
        },
        {
          'text-sm': size === 'sm',
        },
        {
          'text-md': size === 'md',
        },
        {
          'text-lg': size === 'lg',
        },
        {
          'text-xl': size === 'xl',
        },
        {
          'text-2xl': size === '2xl',
        },
        {
          'text-3xl': size === '3xl',
        },
        {
          'font-thin': bold === 100,
        },
        {
          'font-normal': bold === 400,
        },

        {
          'font-medium': bold === 500,
        },

        {
          'font-semibold': bold === 600,
        },
        {
          'font-bold': bold === 700,
        },
        {
          'font-extrabold': bold === 800,
        },
        {
          'font-black': bold === 900,
        },
        className,
      )}
    >
      {label}
    </div>
  )
}
