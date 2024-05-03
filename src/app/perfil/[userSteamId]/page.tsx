import PageProfileUser from '@/components/Pages/PageProfile/PageProfileUser'
import UserService from '@/services/user.service'
import { Metadata } from 'next'

interface IMetadata {
  searchParams: { [key: string]: string | string[] | undefined }
  params: {
    userSteamId: { [key: string]: string | string[] | undefined }
  }
}

export async function generateMetadata({
  params: { userSteamId },
}: IMetadata): Promise<Metadata> {

  const response = await UserService.getUser(String(userSteamId))

  return {
    title: `Perfil de ${response?.data?.owner_name || 'Perfil'} - RentSkins`,
    description: `RentSkins é a melhor plataforma para comprar, vender e alugar skins do Counter-Strike. Encontre skins raras e exclusivas para personalizar seu jogo.`,
  }
}

export default function PerfilUsuario() {
  return (
    <main className="mx-auto flex w-4/5 flex-col items-center py-7">
      <PageProfileUser />
    </main>
  )
}
