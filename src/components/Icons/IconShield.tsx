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
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.9101 11.1203C20.9101 16.0103 17.3601 20.5903 12.5101 21.9303C12.1801 22.0203 11.8201 22.0203 11.4901 21.9303C6.64008 20.5903 3.09009 16.0103 3.09009 11.1203V6.73028C3.09009 5.91028 3.7101 4.98028 4.4801 4.67028L10.0501 2.39031C11.3001 1.88031 12.7101 1.88031 13.9601 2.39031L19.5301 4.67028C20.2901 4.98028 20.9201 5.91028 20.9201 6.73028L20.9101 11.1203Z"
        fill="white"
      />
    </svg>
  )
}
