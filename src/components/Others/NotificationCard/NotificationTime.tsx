import React from 'react'

interface IProps {
  timestamp: number
}

export function NotificationTime({ timestamp }: IProps) {
  const handleTimestamp = () => {
    if (timestamp < 0.5) {
      return 'Há alguns segundos'
    } else if (timestamp < 1) {
      return `Há ${timestamp} segundos`
    } else if (timestamp < 60) {
      return `Há ${Math.floor(60 / timestamp)} minutos`
    } else if (timestamp < 120) {
      return `Há ${Math.floor(120 / timestamp)} horas`
    } else if (timestamp < 1440) {
      return `Há ${Math.floor(1440 / timestamp)} dias`
    } else if (timestamp < 10080) {
      return `Há ${Math.floor(10080 / timestamp)} semanas`
    } else if (timestamp < 525600) {
      return `Há ${Math.floor(525600 / timestamp)} meses`
    } else if (timestamp < 1051200) {
      return `Há ${Math.floor(1051200 / timestamp)} anos`
    }
  }
  return (
    <span className="p-3 text-mesh-color-neutral-400">{handleTimestamp()}</span>
  )
}
