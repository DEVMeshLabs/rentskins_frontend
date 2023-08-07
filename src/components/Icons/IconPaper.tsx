interface IProps {
  stroke?: string
  fill?: string
  width?: number
  height?: number
}

export function IconPaper({
  stroke = '#151714',
  fill = '#A7B0A0',
  width = 19,
  height = 19,
}: IProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.6667 7.83464V12.0013C17.6667 16.168 16 17.8346 11.8333 17.8346H6.83333C2.66667 17.8346 1 16.168 1 12.0013V7.0013C1 2.83464 2.66667 1.16797 6.83333 1.16797H11"
        fill={fill}
        className="transition-all duration-500"
      />
      <path
        d="M17.6667 7.83464V12.0013C17.6667 16.168 16 17.8346 11.8333 17.8346H6.83333C2.66667 17.8346 1 16.168 1 12.0013V7.0013C1 2.83464 2.66667 1.16797 6.83333 1.16797H11"
        stroke={stroke}
        className="transition-all duration-500"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.6667 7.83463H14.3333C11.8333 7.83463 11 7.0013 11 4.5013V1.16797L17.6667 7.83463Z"
        stroke={stroke}
        className="transition-all duration-500"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.16675 10.3359H10.1667"
        stroke={stroke}
        className="transition-all duration-500"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.16675 13.668H8.50008"
        stroke={stroke}
        className="transition-all duration-500"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
