import PageUserConfigurations from '@/components/Pages/PageUser/PageUserConfigurations'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Configurações - RentSkins',
  description: `Rentskins é a melhor plataforma para comprar, vender e alugar skins do CS:GO.
  Encontre skins raras e exclusivas para personalizar seu jogo.`,
}

export default async function Configurations() {
  return (
    <main className="flex min-h-screen justify-center gap-10 bg-mesh-color-others-black px-[7.5rem] pb-16 pt-8">
      <PageUserConfigurations />
    </main>
  )
}
