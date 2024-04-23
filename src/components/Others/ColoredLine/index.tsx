import IconLittleArrow from '@/components/Icons/IconLittleArrow'
import classNames from 'classnames'

interface IProps {
  position: string | number
  showFloat?: boolean
}

export default function ColoredLine({ position, showFloat }: IProps) {
  const percentage = Math.floor(
    Math.abs(Number(String(position).replace(',', '.')) * 100),
  )

  return (
    <div className="relative flex w-full flex-col">
      {percentage !== 0.0 && (
        <div
          style={{ width: percentage + '%' }}
          className={classNames(
            `relative top-1 z-10 flex justify-end opacity-0 transition-all duration-300`,
            {
              'opacity-100': percentage > 0,
            },
          )}
        >
          <IconLittleArrow />
          <div className="relative left-6 z-20 flex h-7 items-center justify-center">
            {showFloat && (
              <div className="text-mesh-color-primary-0">
                {Number(position).toFixed(6)}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="relative flex w-full items-center rounded-sm">
        <div className="h-[6px] w-[7%] rounded-l-md bg-[#1E9A04]" />
        <div className="h-[6px] w-[8%] bg-[#59C675]" />
        <div className="h-[6px] w-[22%] bg-[#FADE5E]" />
        <div className="h-[6px] w-[7%] bg-[#E84E6A]" />
        <div className="h-[6px] w-[56%] rounded-r-md bg-[#CA1733]" />
      </div>
    </div>
  )
}
