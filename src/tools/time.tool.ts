export default class Time {
  public static roundTime(time: string) {
    console.log(time)
    const [horas, minutos, segundos] = time.split(':').map(Number)
    console.log(horas)
    console.log(minutos)
    console.log(segundos)
    const segundosArredondados = Math.round(segundos)
    const horasFormatadas = horas?.toString().padStart(2, '0')
    const minutosFormatados = minutos?.toString().padStart(2, '0')
    const segundosFormatados = segundosArredondados?.toString().padStart(2, '0')

    if (!horas || !minutos || !segundos) {
      return 'Sem informações'
    }

    return `${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`
  }
}