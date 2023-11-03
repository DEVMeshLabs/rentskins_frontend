'use client'

import Common from '@/components/Common'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

interface IProps {
  type: 'processo' | 'cancelado'
}
export default function PagePaymentRecharge({ type }: IProps) {
  const [timer, setTimer] = useState(5)
  const router = useRouter()

  const intervalRef = useRef<any>(null)

  useEffect(() => {
    intervalRef.current = setInterval(
      () => setTimer((state) => state - 1),
      1000,
    )
  }, [])

  useEffect(() => {
    if (timer <= 0) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      router.replace('/')
    }
  }, [timer, router])

  const processMessage = (
    <div className="flex flex-col items-center justify-center gap-10">
      <Common.Title className="w-5/6 text-center" size="2xl" bold={600}>
        O seu pagamento está sendo processado!
      </Common.Title>

      <Common.Title className="w-fit text-center" size="xl" bold={600}>
        Em breve, o seu saldo será recarregado.
      </Common.Title>

      <Link
        className="flex w-64 items-center justify-center rounded-md border-transparent bg-mesh-color-primary-1200 py-3 text-xl font-bold text-black opacity-70 transition-all hover:opacity-100"
        href={'/'}
      >
        Continuar
      </Link>
    </div>
  )

  const cancelMessage = (
    <div className="flex flex-col items-center justify-center gap-10">
      <Common.Title className="w-2/3 text-center" size="2xl" bold={600}>
        Pagamento cancelado. Seu saldo não foi recarregado.
      </Common.Title>

      <Link
        className="flex w-64 items-center justify-center rounded-md border-transparent bg-mesh-color-primary-1200 py-3 text-xl font-bold text-black opacity-70 transition-all hover:opacity-100"
        href={'/'}
      >
        Continuar
      </Link>
    </div>
  )

  return (
    <div className="flex flex-col justify-center gap-4">
      {type === 'processo' ? processMessage : cancelMessage}
      <p className="w-full text-center text-sm text-mesh-color-neutral-400">
        {' '}
        Retornando para a página inicial em {timer} segundos.
      </p>
    </div>
  )
}
