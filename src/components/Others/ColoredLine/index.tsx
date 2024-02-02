import IconLittleArrow from '@/components/Icons/IconLittleArrow'

interface IProps {
  position: string | number
  showFloat?: boolean
}

export default function ColoredLine({ position, showFloat }: IProps) {
  const percentage = Math.abs(
    Number(String(position).replace(',', '.')) * 100 - 100,
  )
  return (
    <div className="relative flex w-full flex-col">
      <div
        style={{ width: percentage + '%' }}
        className="relative top-1 z-10 flex justify-end"
      >
        <div className="absolute bottom-0 z-20 flex h-9 justify-center">
          {showFloat && (
            <div className="text-mesh-color-primary-0">
              {Number(position).toFixed(3)}
            </div>
          )}
          <IconLittleArrow />
        </div>
      </div>
      <div className="relative flex w-full items-center rounded-sm">
        <div className="h-[6px] w-[10%] rounded-l-md bg-[#1E9A04]" />
        <div className="h-[6px] w-[13%] bg-[#59C675]" />
        <div className="h-[6px] w-[17%] bg-[#FADE5E]" />
        <div className="h-[6px] w-[30%] bg-[#E84E6A]" />
        <div className="h-[6px] w-[30%] rounded-r-md bg-[#CA1733]" />
      </div>
    </div>
  )
}
