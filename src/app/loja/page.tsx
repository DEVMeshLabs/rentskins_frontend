import PageStoreSkins from '@/components/Pages/PageStore/PageStoreSkins'
import { Metadata } from 'next'

interface IMetadata {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
  searchParams,
}: IMetadata): Promise<Metadata> {
  return {
    title: `${searchParams.search} - RentSkins`,
    description: `Rentskins é a melhor plataforma para comprar, vender e alugar skins do CS:GO.
    Encontre skins raras e exclusivas para personalizar seu jogo.`,
  }
}

export default function Loja() {
  return (
    <div className="flex w-full justify-center">
      <div className="mx-auto my-6 flex w-4/5 flex-col gap-6">
        <PageStoreSkins />
      </div>
    </div>
  )
}
