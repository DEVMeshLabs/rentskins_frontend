import Common from '@/components/Common'
import PageDetailsMain from '@/components/Pages/PageDetails/PageDetailsMain'
import SkinService from '@/services/skin.service'
import UserService from '@/services/user.service'
import { Metadata } from 'next'
import Link from 'next/link'
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
    if (sellerid) {
      return (await UserService.getUser(sellerid)).data
    }

    return null
  } catch (err) {
    console.log(err)
  }
})

const deleteItem = async (id: string) => {
  try {
    return await SkinService.deleteById(id)
  } catch (err) {
    return undefined
  }
}

export async function generateMetadata({
  params: { id },
}: IMetadata): Promise<Metadata> {
  const response = await fetchItem(id)

  return {
    title: `${response?.skin_name || 'Detalhes'} - RentSkins`,
    description: `RentSkins é a melhor plataforma para comprar, vender e alugar skins do Counter-Strike. Encontre skins raras e exclusivas para personalizar seu jogo.`,
  }
}

export default async function Details({ params }: IProps) {
  const item = await fetchItem(params.id)
  const seller = await fetchSeller(item?.seller_id)

  if (item) {
    if (!seller || seller.deletedAt) {
      await deleteItem(item.id)
    }
  } else {
    notFound()
  }

  return (
    <div>
      {seller ? (
        <PageDetailsMain item={item!} seller={seller} />
      ) : (
        <RenderUnavailableScreen />
      )}
    </div>
  )
}

function RenderUnavailableScreen() {
  return (
    <main className={`flex flex-col items-center justify-center gap-6`}>
      <div className="flex flex-col items-center">
        <Common.Title
          bold={900}
          size="3xl"
          className="bg-mesh-gradient-green-pattern bg-clip-text text-transparent"
        >
          OOPS...
        </Common.Title>
        <Common.Title bold={600} size="xl" className="text-white">
          O item se encontra indisponível no momento.
        </Common.Title>
      </div>
      <Link
        href="/loja?search=&page=1"
        className="rounded-md bg-mesh-color-primary-1200 px-12 py-2 font-semibold opacity-70 hover:opacity-100"
      >
        Voltar à Loja
      </Link>
    </main>
  )
}
