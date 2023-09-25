interface IProps {
  stroke?: string
  fill?: string
  width?: number
  height?: number
}

export function IconLockedShield({
  stroke = '#151714',
  fill = '#A7B0A0',
  width = 20,
  height = 22,
}: IProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.8289 10.285C18.8289 15.1775 15.2772 19.7598 10.4247 21.1004C10.0946 21.1905 9.73437 21.1905 9.4042 21.1004C4.55177 19.7598 1 15.1775 1 10.285V5.8928C1 5.07239 1.62033 4.14193 2.39071 3.83177L7.96348 1.55066C9.21411 1.0404 10.6248 1.0404 11.8754 1.55066L17.4482 3.83177C18.2086 4.14193 18.839 5.07239 18.839 5.8928L18.8289 10.285Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="0.959395"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-500"
      />
      <path
        d="M9.91483 11.6661C11.02 11.6661 11.9158 10.7702 11.9158 9.66507C11.9158 8.55994 11.02 7.66406 9.91483 7.66406C8.80971 7.66406 7.91383 8.55994 7.91383 9.66507C7.91383 10.7702 8.80971 11.6661 9.91483 11.6661Z"
        fill={fill}
        stroke={stroke}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-500"
      />
      <path
        d="M9.91499 11.668V14.6695"
        stroke={stroke}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-500"
      />
    </svg>
  )
}
