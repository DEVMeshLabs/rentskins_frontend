import React from 'react'

interface IProps {
  timestamp: number
}

export function NotificationTime({ timestamp }: IProps) {
  const handleTimestamp = () => {
    if (timestamp < 10) {
      return 'Há alguns segundos'
    } else if (timestamp < 60) {
      return `Há ${timestamp} segundos`
    } else if (timestamp < 3600) {
      return `Há ${Math.floor(timestamp / 60)} minutos`
    } else if (timestamp < 86400) {
      return `Há ${Math.floor(timestamp / 3600)} horas`
    } else if (timestamp < 604800) {
      return `Há ${Math.floor(timestamp / 86400)} dias`
    } else if (timestamp < 2592000) {
      return `Há ${Math.floor(timestamp / 604800)} semanas`
    } else {
      return `Há ${Math.floor(timestamp / 2592000)} meses`
    }
  }
  return (
    <span className="p-3 text-mesh-color-neutral-400">{handleTimestamp()}</span>
  )
}
