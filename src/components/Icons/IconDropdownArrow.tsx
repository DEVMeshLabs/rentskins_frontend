interface IProps {
  width?: number
  fill?: string
}

export function IconDropdownArrow({ fill = '#AEAEAE', width = 10 }: IProps) {
  return (
    <svg
      width={width}
      height={width / 2}
      viewBox="0 0 10 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Vector"
        d="M10 0L5 5L4.37114e-07 -8.74228e-07L10 0Z"
        fill={fill}
      />
    </svg>
  )
}
