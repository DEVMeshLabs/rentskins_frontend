import React from 'react'

interface IProps {
  timestamp: number
}

export function NotificationTime({ timestamp }: IProps) {
  const handleTimestamp = () => {
    if (timestamp < 1) {
      return 'Há alguns segundos'
    } else if (timestamp < 60) {
      const minutes = Math.floor(timestamp)
      return `Há ${minutes} minuto${minutes < 2 ? '' : 's'}`
    } else if (timestamp >= 60 && timestamp < 1440) {
      const hours = Math.floor(timestamp / 60)
      return `Há ${hours} hora${hours < 2 ? '' : 's'}`
    } else if (timestamp >= 1440 && timestamp < 10080) {
      const days = Math.floor(timestamp / 1440)
      return `Há ${days} dia${days < 2 ? '' : 's'}`
    } else if (timestamp >= 10080 && timestamp < 43200) {
      const weeks = Math.floor(timestamp / 10080)
      return `Há ${weeks} semana${weeks < 2 ? '' : 's'}`
    } else if (timestamp >= 43200 && timestamp < 525600) {
      const months = Math.floor(timestamp / 10080)
      return `Há ${months} ${months < 2 ? 'mês' : 'meses'}`
    } else if (timestamp >= 525600) {
      const years = Math.floor(timestamp / 525600)
      return `Há ${years} ano${years < 2 ? '' : 's'}`
    }
  }
  return (
    <span className="whitespace-nowrap p-3 text-mesh-color-neutral-400">
      {handleTimestamp()}
    </span>
  )
}
