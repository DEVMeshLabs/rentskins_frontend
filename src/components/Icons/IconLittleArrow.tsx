interface Props {
  percentFloat?: string
}

export default function IconLittleArrow({ percentFloat }: Props) {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute bottom-[-6px] ml-[${percentFloat}%]`}
    >
      <path
        d="M4.09616 8.67187L2.42602 8.67187C0.355532 8.67187 -0.495181
      7.10423 0.543189 5.1897L1.38139 3.64874L2.21959 2.10777C3.25796
      0.193243 4.95313 0.193243 5.9915 2.10777L6.8297 3.64874L7.66791
      5.1897C8.68751 7.10423 7.84305 8.67187 5.76631 8.67187L4.09616
      8.67187Z"
        fill="white"
      />
    </svg>
  )
}
