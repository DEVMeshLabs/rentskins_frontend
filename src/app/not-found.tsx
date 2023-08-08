'use client'
import Common from '@/components/Common'
import { useEffect } from 'react'

export default function NotFound() {
  // @ts-ignore
  useEffect(() => {
    document.title = 'Página Não Encontrada - RentSkins'
  })

  return (
    <main className="flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center">
        <Common.Title
          bold={900}
          size="3xl"
          className="bg-mesh-gradient-green-pattern bg-clip-text text-transparent"
        >
          OOPS...
        </Common.Title>
        <Common.Title bold={600} size="xl" className="text-white">
          Parece que algo deu errado!
        </Common.Title>
      </div>
      <a
        href="/"
        className="rounded-md bg-mesh-color-primary-1200 px-12 py-2 font-semibold opacity-70 hover:opacity-100"
      >
        Voltar
      </a>
    </main>
  )
}
