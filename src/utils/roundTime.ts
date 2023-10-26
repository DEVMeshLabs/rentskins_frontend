export function RoundTime(time: string) {
  const [horas, minutos, segundos] = time.split(':').map(Number)
  const segundosArredondados = Math.round(segundos)
  const horasFormatadas = horas.toString().padStart(2, '0')
  const minutosFormatados = minutos.toString().padStart(2, '0')
  const segundosFormatados = segundosArredondados.toString().padStart(2, '0')
  return `${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`
}
