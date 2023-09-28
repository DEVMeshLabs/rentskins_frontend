interface IProps {
  width?: number
  height?: number
  fill?: string
  stroke?: string
}

export function IconShield({
  width = 20,
  height = 23,
  fill = 'none',
  stroke = 'white',
}: IProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="20"
        height="20"
        rx="2.85714"
        fill="#63800D"
        fillOpacity="0.2"
      />
      <path
        d="M15.3037 9.47488C15.3037 12.3856 13.1906 15.1118 10.3037 15.9094C10.1073 15.963 9.89296 15.963 9.69653 15.9094C6.80962 15.1118 4.69653 12.3856 4.69653 9.47488V6.86177C4.69653 6.37368 5.06559 5.82011 5.52392 5.63558L8.83939 4.27846C9.58343 3.97489 10.4227 3.97489 11.1668 4.27846L14.4822 5.63558C14.9346 5.82011 15.3096 6.37368 15.3096 6.86177L15.3037 9.47488Z"
        fill="#C5EA57"
      />
    </svg>
  )
}
