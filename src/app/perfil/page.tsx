import PageProfileSelf from '@/components/Pages/PageProfile/PageProfileSelf'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Meu Perfil - RentSkins`,
  description: `RentSkins é a melhor plataforma para comprar, vender e alugar skins do Counter-Strike. Encontre skins raras e exclusivas para personalizar seu jogo.`,
}

export default function Perfil() {
  return (
    <main className="mx-auto flex w-4/5 flex-col items-center py-7">
      <PageProfileSelf />
    </main>
  )
}
