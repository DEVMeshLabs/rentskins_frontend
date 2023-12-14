export default class Time {
  public static roundTime(time: string) {
    if (time === 'Sem informações') return 'Sem informações'

    const [horas, minutos, segundos] = time.split(':').map(Number)

    const segundosArredondados = Math.round(segundos)
    const horasFormatadas = horas?.toString().padStart(2, '0')
    const minutosFormatados = minutos?.toString().padStart(2, '0')
    const segundosFormatados = segundosArredondados?.toString().padStart(2, '0')

    return `${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`
  }
}
