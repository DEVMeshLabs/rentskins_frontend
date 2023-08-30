import PageDetailsMain from '@/components/Pages/PageDetails/PageDetailsMain'
import SkinService from '@/services/skin.service'
import UserService from '@/services/user.service'
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
  try {
    return (await SkinService.findById(id)).data
  } catch (err) {
    console.log(err)
  }
})

const fetchSeller = cache(async (sellerid?: string) => {
  try {
    console.log(sellerid)
    if (sellerid) {
      const response = await UserService.getUser(sellerid)
      console.log(response)
      return (await UserService.getUser(sellerid)).data
    }

    return null
  } catch (err) {
    console.log(err)
  }
})

const deleteItem = cache(async (id: string) => {
  try {
    return await SkinService.deleteById(id)
  } catch (err) {
    return undefined
  }
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
  const seller = await fetchSeller(item && item.seller_id)

  if (!seller) {
    if (item) {
      await deleteItem(item.id)
    }
    notFound()
  }

  return (
    <div>
      <PageDetailsMain item={item!} seller={seller} />
    </div>
  )
}
