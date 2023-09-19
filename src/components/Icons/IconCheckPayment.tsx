interface IProps {
  width?: string
  fill?: string
}

export function IconCheckPayment({ fill, width = '104' }: IProps) {
  return (
    <svg
      width="104"
      height="104"
      viewBox="0 0 104 104"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.5 52L41.5 70L80.5 34"
        stroke="#CCEF65"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="2"
        y="2"
        width="100"
        height="100"
        rx="50"
        stroke="#CCEF65"
        strokeWidth="4"
      />
    </svg>
  )
}
