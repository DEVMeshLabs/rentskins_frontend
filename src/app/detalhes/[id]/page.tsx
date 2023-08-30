import PageDetailsMain from '@/components/Pages/PageDetails/PageDetailsMain'
import SkinService from '@/services/skin.service'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'

interface IProps {
  params: { id: string }
}

interface IMetadata {
  searchParams: { [key: string]: string | string[] | undefined }
  params: {
    id: string
  }
}

const fetchItem = cache(async (id: string) => {
  return (await SkinService.findById(id)).data
})

export async function generateMetadata({
  params: { id },
}: IMetadata): Promise<Metadata> {
  const response = await fetchItem(id)

  return {
    title: `${response?.skin_name || 'Detalhes'} - RentSkins`,
    description: `Rentskins é a melhor plataforma para comprar, vender e alugar skins do CS:GO.
    Encontre skins raras e exclusivas para personalizar seu jogo.`,
  }
}

export default async function Details({ params }: IProps) {
  const item = await fetchItem(params.id)

  if (!item) {
    notFound()
  }

  return (
    <div>
      <PageDetailsMain item={item} />
    </div>
  )
}
