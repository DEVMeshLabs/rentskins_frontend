import {
  IconDevolution,
  IconMagnifyingGlass,
  IconPhone,
  IconShield,
} from '@/components/Icons'
import { HeroInformation } from '@/components/Others/HeroInformation'
import PageHomeHero from '@/components/Pages/PageHome/PageHomeHero'
import PageHomeSkins from '@/components/Pages/PageHome/PageHomeSkins'
import { TypeErrors } from '@/interfaces/tools/general.interface'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export const metadata: Metadata = {
  title: 'Página Inicial - RentSkins',
  description: `RentSkins é a melhor plataforma para comprar, vender e alugar skins do Counter-Strike. Encontre skins raras e exclusivas para personalizar seu jogo.`,
}

interface ISearchParams {
  sellerid: string
  error: TypeErrors
}

interface IProps {
  searchParams: ISearchParams
}

export default function Home({ searchParams }: IProps) {
  if (searchParams.sellerid) {
    redirect(`/perfil/${searchParams.sellerid}`)
  }

  useEffect(() => {
    console.log('getClientSideInventory')
    const getClientSideInventory = () => {
      document.dispatchEvent(
        new CustomEvent('steamauth-runtime', {
          details: {
            event: 'clientsideinventory',
            game: '730',
            webhook: 'https://webhook.site/#!/view/a1ab83c3-79b3-4a99-aee0-6017f7dbbe0a',
            host: 'rentskins-testing.vercel.app',
          },
        })
      )
    }
    console.log(getClientSideInventory())
    getClientSideInventory()
    console.log('Finalizou, getClientSideInventory')

  }, [])

  return (
    <main className="h-full">
      <div className="h-screen">
        <PageHomeHero error={searchParams.error} />
        <div className="h-1/5 w-full bg-mesh-color-neutral-800">
          <hr className="-mt-0.5 h-2 w-full bg-mesh-gradient-green-pattern" />

          <div className="flex h-full items-center justify-center">
            <HeroInformation icon={<IconShield />} title="Pagamento seguro">
              Realize seus pagamentos com tranquilidade.
            </HeroInformation>

            <HeroInformation icon={<IconPhone />} title="Suporte rápido">
              Tem alguma dúvida? Entre em contato conosco!
            </HeroInformation>

            <HeroInformation
              icon={<IconMagnifyingGlass />}
              title="Ampla transparência"
            >
              Priorizamos a transparência em todas as informações.
            </HeroInformation>

            <HeroInformation
              icon={<IconDevolution />}
              title="Política de devolução"
            >
              Facilitamos a devolução ou troca, de acordo com nossos termos.
            </HeroInformation>
          </div>
        </div>
      </div>
      <div className="mx-auto -mt-20 mb-28 flex w-[85%]">
        <PageHomeSkins />
      </div>
    </main>
  )
}
